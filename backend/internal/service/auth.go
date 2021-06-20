package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/token"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) Login(ctx context.Context, in *proto.LoginInput) (*proto.StringMessage, error) {
	if len(in.Email) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid email")
	}

	if len(in.Password) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid password")
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

	return &proto.StringMessage{Data: token}, nil
}
