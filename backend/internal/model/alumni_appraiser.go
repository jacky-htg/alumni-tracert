package model

import (
	"context"
	"database/sql"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AlumniAppraiser struct {
	Pb proto.AlumniAppraiser
}

func (u *AlumniAppraiser) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO alumni_appraisers (user_id, alumni_id, name, instansi, position, alumni_position) VALUES (?, ?, ?, ?, ?, ?)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.UserId,
		u.Pb.Alumni.Id,
		u.Pb.Name,
		u.Pb.Instansi,
		u.Pb.Position,
		u.Pb.AlumniPosition,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}
