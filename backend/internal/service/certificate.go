package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) CertificateCreate(ctx context.Context, in *proto.Certificate) (*proto.Certificate, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on create certificate", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Token = ctx.Value(app.Ctx("token")).(string)
	err = userModel.GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login", err)
		return nil, err
	}

	tx, err := u.Db.BeginTx(ctx, nil)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "begin tx create certificate", err)
		return nil, status.Error(codes.Internal, "Failed to create and begin transaction : "+err.Error())
	}

	certificate, err := u.certificateCreateHelper(ctx, in, tx)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		util.LogError(u.Log, "commit create certificate", err)
		return nil, err
	}

	return certificate, nil
}
