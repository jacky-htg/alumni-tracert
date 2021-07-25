package validation

import (
	"context"
	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserAnswer struct {
	Model model.UserAnswer
}

func (u *UserAnswer) Create(ctx context.Context, in *proto.UserAnswer) error {
	if in.QuestionId <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid QuestionID")
	}
	if len(in.Answer) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid Answer")
	}

	return nil
}
