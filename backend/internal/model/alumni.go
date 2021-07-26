package model

import (
	"context"
	"database/sql"
	"strings"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Alumni struct {
	Pb proto.Alumni
}

func (u *Alumni) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO alumni (user_id, name, nim, nik, place_of_birth, date_of_birth, major_study, graduation_year, no_ijazah, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.UserId,
		u.Pb.Name,
		u.Pb.Nim,
		u.Pb.Nik,
		u.Pb.PlaceOfBirth,
		u.Pb.DateOfBirth,
		u.Pb.MajorStudy,
		u.Pb.GraduationYear,
		u.Pb.NoIjazah,
		u.Pb.Phone,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}

func (u *Alumni) ListQuery(ctx context.Context, db *sql.DB, in *proto.ListInput) (string, []interface{}, *proto.ListInput, error) {
	query := `SELECT id, user_id, name, nim, nik, place_of_birth, date_of_birth, major_study, graduation_year, no_ijazah, phone, created, updated FROM alumni`
	where := []string{}
	paramQueries := []interface{}{}

	if len(in.Search) > 0 {
		paramQueries = append(paramQueries, in.Search)
		paramQueries = append(paramQueries, in.Search)
		paramQueries = append(paramQueries, in.Search)
		paramQueries = append(paramQueries, in.Search)
		paramQueries = append(paramQueries, in.Search)
		paramQueries = append(paramQueries, in.Search)
		where = append(where, `(name LIKE ? OR nim LIKE ? OR nik LIKE ? OR place_of_birth LIKE ? OR no_ijazah LIKE ? OR phone LIKE ?)`)
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

	if len(in.OrderBy) == 0 || !(in.OrderBy == "name" || in.OrderBy == "nim" || in.OrderBy == "nik" || in.OrderBy == "no_iajazah" || in.OrderBy == "phone") {
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
