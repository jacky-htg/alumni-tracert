package model

import (
	"context"
	"database/sql"
	"time"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Certificate struct {
	Pb proto.Certificate
}

func (u *Certificate) Create(ctx context.Context, db *sql.Tx) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO certificates (alumni_id, nim, no_ijazah, major_study, entry_year, graduation_year) VALUES (?, ?, ?, ?, ?, ?)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.AlumniId,
		u.Pb.Nim,
		u.Pb.NoIjazah,
		u.Pb.MajorStudy,
		u.Pb.EntryYear,
		u.Pb.GraduationYear,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}

func (u *Certificate) GetByIdAndAlumni(ctx context.Context, db *sql.DB) error {
	query := `SELECT id FROM certificates WHERE id = ? AND alumni_id = ?`

	row := db.QueryRowContext(ctx, query, u.Pb.Id, u.Pb.AlumniId)
	if err := row.Scan(&u.Pb.Id); err != nil {
		return status.Error(codes.Internal, err.Error())
	}
	return nil
}

func (u *Certificate) GetByAlumni(ctx context.Context, db *sql.DB) ([]*proto.Certificate, error) {
	var list []*proto.Certificate
	query := `
		SELECT id, nim, no_ijazah, major_study, entry_year, graduation_year, created, updated 
		FROM certificates 
		WHERE alumni_id = ?
	`

	rows, err := db.QueryContext(ctx, query, u.Pb.AlumniId)
	if err != nil {
		return list, status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()

	for rows.Next() {
		err = util.ContextError(ctx)
		if err != nil {
			return list, err
		}

		var pbCertificate proto.Certificate
		var createdAt, updatedAt time.Time
		err = rows.Scan(
			&pbCertificate.Id, &pbCertificate.Nim, &pbCertificate.NoIjazah, &pbCertificate.MajorStudy,
			&pbCertificate.EntryYear, &pbCertificate.GraduationYear, &createdAt, &updatedAt,
		)
		if err != nil {
			return list, status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbCertificate.Created = createdAt.String()
		pbCertificate.Updated = updatedAt.String()

		list = append(list, &pbCertificate)
	}

	return list, err
}
