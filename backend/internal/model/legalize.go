package model

import (
	"context"
	"database/sql"
	"strings"
	"time"
	"tracert/internal/constant"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Legalize struct {
	Pb proto.Legalize
}

func (u *Legalize) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO legalizes (alumni_id, ijazah, transcript, status) VALUES (?, ?, ?, 1)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.Alumni.Id,
		u.Pb.Ijazah,
		u.Pb.Transcript,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}

func (u *Legalize) ListQuery(ctx context.Context, db *sql.DB, in *proto.ListInput) (string, []interface{}, *proto.ListInput, error) {
	query := `
		SELECT l.id, a.id, a.name, a.nim, a.nik, a.no_ijazah, 
			l.ijazah, l.transcript, l.is_verified, l.is_approved, 
			l.verified_by, l.verified_at, l.approved_by, l.approved_at, 
			l.status, l.created, l.modified 
		FROM legalizes l
		JOIN alumni a ON l.alumni_id = a.id`
	where := []string{}
	paramQueries := []interface{}{}

	if ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_ADMIN {
		where = append(where, "l.status = 1 AND l.is_verified = FALSE AND l.is_approved = FALSE")
	} else if ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_PEJABAT {
		where = append(where, "l.status = 2 AND l.is_verified = TRUE AND l.is_approved = FALSE")
	}

	if len(in.Search) > 0 {
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		where = append(where, `(a.name LIKE ? OR a.nim LIKE ? OR a.nik LIKE ? OR a.no_ijazah LIKE ?)`)
	}

	{
		qCount := `SELECT COUNT(*) FROM FROM legalizes l JOIN alumni a ON l.alumni_id = a.id`
		if len(where) > 0 {
			qCount += " WHERE " + strings.Join(where, " AND ")
		}
		var count int
		err := db.QueryRowContext(ctx, qCount, paramQueries...).Scan(&count)
		if err != nil && err != sql.ErrNoRows {
			return query, paramQueries, in, status.Error(codes.Internal, err.Error())
		}

		in.Count = uint32(count)
	}

	if len(where) > 0 {
		query += ` WHERE ` + strings.Join(where, " AND ")
	}

	if in == nil {
		in = &proto.ListInput{OrderBy: "created"}
	} else {
		in.OrderBy = "created"
	}

	query += ` ORDER BY ` + in.OrderBy

	if len(in.Sort) > 0 {
		sort := strings.ToLower(in.Sort)
		if sort == "desc" {
			query += ` ` + sort
		} else {
			in.Sort = "asc"
		}
	}

	if in.Limit > 0 {
		query += ` LIMIT ? OFFSET ?`
		page := in.Page
		if page < 1 {
			page = 1
		}
		offset := (page - 1) * in.Limit
		paramQueries = append(paramQueries, in.Limit, offset)
	}

	return query, paramQueries, in, nil
}

func (u *Legalize) Get(ctx context.Context, db *sql.DB) error {
	query := `
		SELECT l.id, a.id, a.name, a.nim, a.nik, a.no_ijazah, 
			l.ijazah, l.transcript, l.is_verified, l.is_approved, 
			l.verified_by, l.verified_at, l.approved_by, l.approved_at, 
			l.status, l.created, l.modified 
		FROM legalizes l
		JOIN alumni a ON l.alumni_id = a.id
		WHERE l.id = ?
	`

	row := db.QueryRowContext(ctx, query, u.Pb.Id)
	var createdAt, updatedAt time.Time
	var pbAlumni proto.Alumni
	var verifiedBy, approvedBy sql.NullInt64
	var verifiedAt, approvedAt sql.NullString
	err := row.Scan(
		&u.Pb.Id, &pbAlumni.Id, &pbAlumni.Name, &pbAlumni.Nim, &pbAlumni.Nik, &pbAlumni.NoIjazah,
		&u.Pb.Ijazah, &u.Pb.Transcript, &u.Pb.IsVerified, &u.Pb.IsApproved,
		&verifiedBy, &verifiedAt, &approvedBy, &approvedAt,
		&u.Pb.Status, &createdAt, &updatedAt,
	)
	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "not found: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "scan data: %v", err)
	}

	u.Pb.Created = createdAt.String()
	u.Pb.Updated = updatedAt.String()
	u.Pb.VerifiedAt = verifiedAt.String
	u.Pb.VerifiedBy = uint64(verifiedBy.Int64)
	u.Pb.ApprovedAt = approvedAt.String
	u.Pb.ApprovedBy = uint64(approvedBy.Int64)

	return nil
}

func (u *Legalize) Rejected(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `
		UPDATE legalizes 
		SET 
			is_verified = false, 
			verified_by = ?, 
			verified_at = ?,
			status = 0
		WHERE id = ? 
	`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare rejected: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		ctx.Value(app.Ctx("user_id")).(uint64),
		time.Now().UTC(),
		u.Pb.Id,
	)

	if err != nil {
		return status.Errorf(codes.Internal, "Exec update: %v", err)
	}

	return nil
}

func (u *Legalize) Verified(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `
		UPDATE legalizes 
		SET 
			is_verified = true, 
			verified_by = ?, 
			verified_at = ?,
			status = 2
		WHERE id = ? 
	`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare approved: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		ctx.Value(app.Ctx("user_id")).(uint64),
		time.Now().UTC(),
		u.Pb.Id,
	)

	if err != nil {
		return status.Errorf(codes.Internal, "Exec update: %v", err)
	}

	return nil
}

func (u *Legalize) Approved(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `
		UPDATE legalizes 
		SET 
			is_approved = true, 
			approved_by = ?, 
			approved_at = ?,
			ijazah_signed = ?,
			transcript_signed = ?,
			status = 3 
		WHERE id = ? 
	`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare approved: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		ctx.Value(app.Ctx("user_id")).(uint64),
		time.Now().UTC(),
		u.Pb.IjazahSigned,
		u.Pb.TranscriptSigned,
		u.Pb.Id,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec update: %v", err)
	}

	return nil
}
