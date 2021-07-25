package validation

import (
	"context"
	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type User struct {
	Model model.User
}

func (u *User) Create(ctx context.Context, in *proto.User) error {
	if len(in.Email) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid email")
	}
	if len(in.Name) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid name")
	}
	if in.UserType < 1 || in.UserType > 2 {
		return status.Error(codes.InvalidArgument, "Please supply valid user type")
	}

	return nil
}

func (u *User) Login(ctx context.Context, in *proto.LoginInput) error {
	if len(in.Email) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid email")
	}

	if len(in.Password) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid password")
	}

	return nil
}
