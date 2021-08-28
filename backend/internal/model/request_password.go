package model

import (
	"context"
	"database/sql"
	"time"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type RequestPassword struct {
	Pb proto.RequestPassword
}

func (u *RequestPassword) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	u.Pb.Id = uuid.New().String()
	u.Pb.ExpiredAt = time.Now().UTC().Add(time.Hour * 24 * 2).Format("2006-01-02 15:04:05")

	stmt, err := db.PrepareContext(ctx, `INSERT INTO request_passwords (id, user_id, expired_at) VALUES (?, ?, ?)`)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, u.Pb.Id, u.Pb.UserId, u.Pb.ExpiredAt)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}

func (u *RequestPassword) Get(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `SELECT id, user_id, is_used, expired_at FROM request_passwords WHERE id = ?`

	row := db.QueryRowContext(ctx, query, u.Pb.Id)
	var expiredAt time.Time
	err := row.Scan(&u.Pb.Id, &u.Pb.UserId, &u.Pb.IsUsed, &expiredAt)
	if err == sql.ErrNoRows {
		return status.Errorf(codes.NotFound, "not found: %v", err)
	}

	if err != nil {
		return status.Errorf(codes.Internal, "scan data: %v", err)
	}

	if u.Pb.GetIsUsed() {
		return status.Error(codes.PermissionDenied, "token has been used")
	}

	if expiredAt.Before(time.Now().UTC()) {
		return status.Errorf(codes.InvalidArgument, "expired token")
	}

	return nil
}

func (u *RequestPassword) UpdateIsUsed(ctx context.Context, db *sql.Tx) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	stmt, err := db.PrepareContext(ctx, `UPDATE request_passwords SET is_used = true WHERE id = ?`)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, u.Pb.Id)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec Update: %v", err)
	}

	return nil
}
