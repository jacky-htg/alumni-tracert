package model

import (
	"context"
	"database/sql"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Tracer struct {
	Pb proto.Tracer
}

func (u *Tracer) GetLastByUserId(ctx context.Context, db *sql.DB) error {
	query := `SELECT id, created FROM tracers WHERE user_id = ? ORDER BY id desc LIMIT 1`

	row := db.QueryRowContext(ctx, query, ctx.Value(app.Ctx("user_id")).(uint64))
	err := row.Scan(&u.Pb.Id, &u.Pb.Created)
	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "not found: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "scan data: %v", err)
	}

	return nil
}

func (u *Tracer) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	stmt, err := db.PrepareContext(ctx, `INSERT INTO tracers (user_id) VALUES (?)`)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	res, err := stmt.ExecContext(ctx,
		u.Pb.UserId,
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
