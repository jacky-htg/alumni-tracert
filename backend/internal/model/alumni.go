package model

import (
	"context"
	"database/sql"
	"strings"
	"time"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Alumni struct {
	Pb proto.Alumni
}

func (u *Alumni) Create(ctx context.Context, db *sql.Tx) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO alumni (user_id, name, nik, place_of_birth, date_of_birth, phone) VALUES (?, ?, ?, ?, ?, ?)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	res, err := stmt.ExecContext(ctx,
		u.Pb.UserId,
		u.Pb.Name,
		u.Pb.Nik,
		u.Pb.PlaceOfBirth,
		u.Pb.DateOfBirth,
		u.Pb.Phone,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	id, err := res.LastInsertId()
	if err != nil {
		return status.Errorf(codes.Internal, "get result id: %v", err)
	}

	u.Pb.Id = uint64(id)

	return nil
}

func (u *Alumni) ListQuery(ctx context.Context, db *sql.DB, in *proto.ListInput) (string, []interface{}, *proto.ListInput, error) {
	query := `SELECT id, user_id, name, nik, place_of_birth, date_of_birth, phone, created, updated FROM alumni`
	where := []string{}
	paramQueries := []interface{}{}

	if len(in.Search) > 0 {
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		paramQueries = append(paramQueries, "%"+in.Search+"%")
		where = append(where, `(name LIKE ? OR nik LIKE ? OR place_of_birth LIKE ? OR phone LIKE ?)`)
	}

	{
		qCount := `SELECT COUNT(*) FROM alumni`
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

	if len(in.OrderBy) == 0 || !(in.OrderBy == "name" || in.OrderBy == "nik" || in.OrderBy == "phone") {
		if in == nil {
			in = &proto.ListInput{OrderBy: "created"}
		} else {
			in.OrderBy = "created"
		}
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

func (u *Alumni) Get(ctx context.Context, db *sql.DB) error {
	query := `
		SELECT id, user_id, name, nik, place_of_birth, date_of_birth, phone, created, updated 
		FROM alumni
		WHERE id = ?
	`

	row := db.QueryRowContext(ctx, query, u.Pb.Id)
	var createdAt, updatedAt time.Time
	err := row.Scan(
		&u.Pb.Id, &u.Pb.UserId, &u.Pb.Name, &u.Pb.Nik, &u.Pb.PlaceOfBirth, &u.Pb.DateOfBirth,
		&u.Pb.Phone, &createdAt, &updatedAt,
	)
	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "not found: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "scan data: %v", err)
	}

	u.Pb.Created = createdAt.String()
	u.Pb.Updated = updatedAt.String()

	var certificateModel Certificate
	certificateModel.Pb.AlumniId = u.Pb.Id
	certificates, err := certificateModel.GetByAlumni(ctx, db)
	if err != nil {
		return err
	}

	u.Pb.Certificates = certificates

	return nil
}
