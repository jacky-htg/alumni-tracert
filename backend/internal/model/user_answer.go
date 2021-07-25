package model

import (
	"context"
	"database/sql"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserAnswer struct {
	Pb proto.UserAnswer
}

func (u *UserAnswer) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO user_answers (user_id, question_id, answer) VALUES (?, ?, ?)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.UserId,
		u.Pb.QuestionId,
		u.Pb.Answer,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}
