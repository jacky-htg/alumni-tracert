package model

import (
	"context"
	"database/sql"
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
