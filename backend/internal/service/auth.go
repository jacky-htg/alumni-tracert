package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/token"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) Login(ctx context.Context, in *proto.LoginInput) (*proto.User, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	if err := new(validation.User).Login(ctx, in); err != nil {
		util.LogError(u.Log, "validation on login", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Email = in.Email
	userModel.Password = in.Password
	err := userModel.Login(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	token, err := token.ClaimToken(userModel.Pb.Email)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "claim token: %v", err)
	}

	userModel.Pb.Token = token

	return &userModel.Pb, nil
}
