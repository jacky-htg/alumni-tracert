package model

import (
	"context"
	"database/sql"
	"os"
	"strings"
	"time"
	"tracert/internal/constant"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Legalize struct {
	Pb proto.Legalize
}

func (u *Legalize) Upsert(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	err := u.GetByCerificateId(ctx, db)
	if err != nil && err != sql.ErrNoRows {
		return status.Errorf(codes.Internal, err.Error())
	}

	var paramQueries []interface{}
	var query string
	if err == sql.ErrNoRows {
		query = `
			INSERT INTO legalizes (id, certificate_id, ijazah, transcript, is_offline, status) 
			VALUES (?, ?, ?, ?, ?, 1)
		`
		paramQueries = append(
			paramQueries,
			uuid.New().String(),
			u.Pb.CertificateId,
			u.Pb.Ijazah,
			u.Pb.Transcript,
			u.Pb.IsOffline,
		)
	} else {
		query = `
			UPDATE legalizes
			SET ijazah = ?, 
				transcript = ?, 
				is_offline = ?, 
				status = 1, 
				is_verified = false, 
				is_approved = false, 
				created = NOW(), 
				modified = NOW()
			WHERE id = ?
		`
		paramQueries = append(
			paramQueries,
			u.Pb.Ijazah,
			u.Pb.Transcript,
			u.Pb.IsOffline,
			u.Pb.Id,
		)
	}

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, paramQueries...)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}

func (u *Legalize) ListQuery(ctx context.Context, db *sql.DB, in *proto.ListInput) (string, []interface{}, *proto.ListInput, error) {
	query := `
		SELECT l.id, a.id, a.name, c.nim, a.nik, 
			c.id, c.no_ijazah, c.major_study, c.graduation_year, 
			l.ijazah, l.transcript, l.is_offline, l.is_verified, l.is_approved, 
			l.verified_by, l.verified_at, l.approved_by, l.approved_at, 
			l.status, l.created, l.modified 
		FROM legalizes l
		JOIN certificates c ON l.certificate_id = c.id
		JOIN alumni a ON c.alumni_id = a.id
	`
	where := []string{}
	paramQueries := []interface{}{}

	if ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_ADMIN {
		where = append(where, "((l.status = 1 AND l.is_verified = FALSE AND l.is_approved = FALSE) OR (l.is_offline = TRUE AND l.status <> 3))")
	} else if ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_PEJABAT {
		where = append(where, "l.status = 2 AND l.is_verified = TRUE AND l.is_approved = FALSE")
	} else if ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_ALUMNI {
		where = append(where, "a.id = ?")
		paramQueries = append(paramQueries, ctx.Value(app.Ctx("alumni_id")).(uint64))
	}

	if len(in.Search) > 0 {
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		where = append(where, `(a.name LIKE ? OR c.nim LIKE ? OR a.nik LIKE ? OR c.no_ijazah LIKE ?)`)
	}

	{
		qCount := `
			SELECT COUNT(*) FROM legalizes l 
			JOIN certificates c ON l.certificate_id = c.id
			JOIN alumni a ON c.alumni_id = a.id
		`
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
		SELECT l.id, a.id, a.name, c.nim, a.nik, 
			c.no_ijazah, c.major_study, c.graduation_year,
			l.ijazah, l.transcript, l.is_offline, l.is_verified, l.is_approved, 
			l.verified_by, l.verified_at, l.approved_by, l.approved_at, 
			l.status, l.ijazah_signed, l.transcript_signed, l.created, l.modified 
		FROM legalizes l
		JOIN certificates c ON l.certificate_id = c.id
		JOIN alumni a ON c.alumni_id = a.id
		WHERE l.id = ?
	`

	row := db.QueryRowContext(ctx, query, u.Pb.Id)
	var createdAt, updatedAt time.Time
	var pbAlumni proto.Alumni
	var pbCertificate proto.Certificate
	var verifiedBy, approvedBy sql.NullInt64
	var verifiedAt, approvedAt, ijazahSigned, transcriptSigned sql.NullString
	err := row.Scan(
		&u.Pb.Id, &pbAlumni.Id, &pbAlumni.Name, &pbCertificate.Nim, &pbAlumni.Nik,
		&pbCertificate.NoIjazah, &pbCertificate.MajorStudy, &pbCertificate.GraduationYear,
		&u.Pb.Ijazah, &u.Pb.Transcript, &u.Pb.IsOffline, &u.Pb.IsVerified, &u.Pb.IsApproved,
		&verifiedBy, &verifiedAt, &approvedBy, &approvedAt,
		&u.Pb.Status, &ijazahSigned, &transcriptSigned, &createdAt, &updatedAt,
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
	u.Pb.AlumniId = pbAlumni.Id
	u.Pb.CertificateId = pbCertificate.Id
	u.Pb.Ijazah = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + u.Pb.Ijazah
	u.Pb.Transcript = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + u.Pb.Transcript

	if len(ijazahSigned.String) > 0 {
		u.Pb.IjazahSigned = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + ijazahSigned.String
	}

	if len(transcriptSigned.String) > 0 {
		u.Pb.TranscriptSigned = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + transcriptSigned.String
	}
	return nil
}

func (u *Legalize) GetByCerificateId(ctx context.Context, db *sql.DB) error {
	row := db.QueryRowContext(ctx, `SELECT id FROM legalizes WHERE certificate_id = ?`, u.Pb.CertificateId)
	return row.Scan(&u.Pb.Id)
}

func (u *Legalize) GetByAlumniId(ctx context.Context, db *sql.DB) (*proto.Certificates, error) {
	var list proto.Certificates
	query := `
		SELECT l.id, a.id, a.name, c.id, c.nim, a.nik, 
			c.no_ijazah, c.major_study, c.graduation_year, 
			l.ijazah, l.transcript, l.is_offline, l.is_verified, l.is_approved, 
			l.verified_by, l.verified_at, l.approved_by, l.approved_at, 
			l.status, l.ijazah_signed, l.transcript_signed, l.rating, l.created, l.modified 
		FROM certificates c
		JOIN alumni a ON c.alumni_id = a.id
		LEFT JOIN legalizes l ON l.certificate_id = c.id
		WHERE a.id = ?
	`

	rows, err := db.QueryContext(ctx, query, u.Pb.AlumniId)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			return nil, err
		}

		var pbLegalize proto.Legalize
		var createdAt, updatedAt sql.NullTime
		var pbAlumni proto.Alumni
		var pbCertificate proto.Certificate
		var verifiedBy, approvedBy sql.NullInt64
		var rating, statusLegalize sql.NullInt32
		var verifiedAt, approvedAt, ijazah, transcript, ijazahSigned, transcriptSigned sql.NullString
		var id sql.NullString
		var isOffline, isVerified, isApproved sql.NullBool
		err = rows.Scan(
			&id, &pbAlumni.Id, &pbAlumni.Name, &pbCertificate.Id, &pbCertificate.Nim, &pbAlumni.Nik,
			&pbCertificate.NoIjazah, &pbCertificate.MajorStudy, &pbCertificate.GraduationYear,
			&ijazah, &transcript, &isOffline, &isVerified, &isApproved,
			&verifiedBy, &verifiedAt, &approvedBy, &approvedAt,
			&statusLegalize, &ijazahSigned, &transcriptSigned, &rating, &createdAt, &updatedAt,
		)

		if err != nil {
			return nil, status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbLegalize.Id = id.String
		pbLegalize.Ijazah = ijazah.String
		pbLegalize.Transcript = transcript.String
		pbLegalize.IsOffline = isOffline.Bool
		pbLegalize.IsVerified = isVerified.Bool
		pbLegalize.IsApproved = isApproved.Bool
		pbLegalize.Status = uint32(statusLegalize.Int32)
		pbLegalize.Created = createdAt.Time.String()
		pbLegalize.Updated = updatedAt.Time.String()
		pbLegalize.VerifiedAt = verifiedAt.String
		pbLegalize.VerifiedBy = uint64(verifiedBy.Int64)
		pbLegalize.ApprovedAt = approvedAt.String
		pbLegalize.ApprovedBy = uint64(approvedBy.Int64)
		if len(ijazahSigned.String) > 0 {
			pbLegalize.IjazahSigned = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + ijazahSigned.String
		}
		if len(transcriptSigned.String) > 0 {
			pbLegalize.TranscriptSigned = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + transcriptSigned.String
		}
		pbLegalize.Rating = uint32(rating.Int32)

		pbCertificate.Legalize = &pbLegalize

		list.Certificate = append(list.Certificate, &pbCertificate)
	}

	if rows.Err() != nil {
		return nil, status.Error(codes.Internal, rows.Err().Error())
	}

	return &list, nil
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

func (u *Legalize) Rating(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `
		UPDATE legalizes 
		SET 
			rating = ? 
		WHERE id = ? 
	`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare rating: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.Rating,
		u.Pb.Id,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec update: %v", err)
	}

	return nil
}

func (u *Legalize) Done(ctx context.Context, db *sql.DB) error {
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
			status = 3 
		WHERE id = ? 
	`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare done: %v", err)
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
