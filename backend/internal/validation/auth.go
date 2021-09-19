package validation

import (
	"context"
	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Auth struct {
	Model model.RequestPassword
}

func (u *Auth) ResetPassword(ctx context.Context, in *proto.ResetPasswordRequest) error {
	if len(in.GetToken()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid token")
	}

	if len(in.GetNewPassword()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid new password")
	}

	if len(in.GetRePassword()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid re password")
	}

	if in.GetNewPassword() != in.GetRePassword() {
		return status.Error(codes.InvalidArgument, "new password not match with re password")
	}

	return nil
}

func (u *Auth) ForgotPassword(ctx context.Context, in *proto.ForgotPasswordRequest) error {
	if len(in.GetEmail()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid token")
	}

	return nil
}

func (u *Auth) ChangePassword(ctx context.Context, in *proto.ChangePasswordRequest) error {
	if len(in.GetOldPassword()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid current password")
	}

	if len(in.GetNewPassword()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid new password")
	}

	if len(in.GetRePassword()) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid re password")
	}

	if in.GetNewPassword() != in.GetRePassword() {
		return status.Error(codes.InvalidArgument, "new password not match with re password")
	}

	return nil
}
