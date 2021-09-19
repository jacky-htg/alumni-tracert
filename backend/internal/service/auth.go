package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
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
		util.LogError(u.Log, "login", err)
		return nil, err
	}

	token, err := token.ClaimToken(userModel.Pb.Email)
	if err != nil {
		util.LogError(u.Log, "claim token", err)
		return nil, status.Errorf(codes.Internal, "claim token: %v", err)
	}

	userModel.Pb.Token = token

	return &userModel.Pb, nil
}

// ForgotPassword service
func (u *AlumniTracertServer) ForgotPassword(ctx context.Context, in *proto.ForgotPasswordRequest) (*proto.StringMessage, error) {
	var output proto.StringMessage
	output.Data = "Failed"
	if err := new(validation.Auth).ForgotPassword(ctx, in); err != nil {
		util.LogError(u.Log, "validation on forgot password", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Email = in.GetEmail()
	err := userModel.GetByEmail(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "GetByEmail", err)
		return &output, err
	}

	var requestPasswordModel model.RequestPassword
	requestPasswordModel.Pb.UserId = userModel.Pb.GetId()
	err = requestPasswordModel.Create(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "create request password", err)
		return &output, err
	}

	err = ForgotPasswordEmailHelper(ctx, map[string]string{
		"Name":  userModel.Pb.GetName(),
		"Email": userModel.Pb.GetEmail(),
		"Token": requestPasswordModel.Pb.GetId(),
	})
	if err != nil {
		util.LogError(u.Log, "send email forgot password", err)
		return &output, err
	}

	output.Data = "Success"
	return &output, nil
}

// ResetPassword service
func (u *AlumniTracertServer) ResetPassword(ctx context.Context, in *proto.ResetPasswordRequest) (*proto.StringMessage, error) {
	output := proto.StringMessage{Data: "Failed"}

	if err := new(validation.Auth).ResetPassword(ctx, in); err != nil {
		util.LogError(u.Log, "validation on reset password", err)
		return nil, err
	}

	err := CheckStrongPassword(in.GetNewPassword())
	if err != nil {
		util.LogError(u.Log, "Weak password", err)
		return &output, err
	}

	var requestPasswordModel model.RequestPassword
	requestPasswordModel.Pb.Id = in.GetToken()
	err = requestPasswordModel.Get(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "get request password", err)
		return &output, err
	}

	var userModel model.User
	userModel.Pb.Id = requestPasswordModel.Pb.GetUserId()
	userModel.Password = in.GetNewPassword()
	tx, err := u.Db.BeginTx(ctx, nil)
	if err != nil {
		util.LogError(u.Log, "begin tx", err)
		return &output, status.Errorf(codes.Internal, "begin tx: %v", err)
	}

	err = userModel.ChangePassword(ctx, tx)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "change password", err)
		return &output, err
	}

	err = requestPasswordModel.UpdateIsUsed(ctx, tx)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "UpdateIsUsed", err)
		return &output, err
	}

	err = tx.Commit()
	if err != nil {
		util.LogError(u.Log, "commit tx", err)
		return &output, status.Errorf(codes.Internal, "commit tx: %v", err)
	}

	output.Data = "Success"

	return &output, nil
}

// ChangePassword service
func (u *AlumniTracertServer) ChangePassword(ctx context.Context, in *proto.ChangePasswordRequest) (*proto.StringMessage, error) {
	var output proto.StringMessage
	output.Data = "Failed"

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on extended legalize", err)
		return &output, err
	}

	if err := new(validation.Auth).ChangePassword(ctx, in); err != nil {
		util.LogError(u.Log, "validation on change password", err)
		return nil, err
	}

	err = CheckStrongPassword(in.GetNewPassword())
	if err != nil {
		util.LogError(u.Log, "weak password", err)
		return &output, err
	}

	var userModel model.User
	userModel.Pb.Id = ctx.Value(app.Ctx("user_id")).(uint64)
	userModel.Password = in.GetOldPassword()
	err = userModel.GetByPassword(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "get by password", err)
		return &output, err
	}

	userModel.Password = in.GetNewPassword()
	tx, err := u.Db.BeginTx(ctx, nil)
	if err != nil {
		util.LogError(u.Log, "begin tx", err)
		return &output, status.Errorf(codes.Internal, "begin tx: %v", err)
	}

	err = userModel.ChangePassword(ctx, tx)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "change password", err)
		return &output, err
	}

	err = tx.Commit()
	if err != nil {
		util.LogError(u.Log, "commit tx", err)
		return &output, status.Errorf(codes.Internal, "commit tx: %v", err)
	}
	output.Data = "success"

	return &output, nil
}
