package service

import (
	"context"

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

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on create certificate", err)
		return nil, err
	}

	tx, err := u.Db.BeginTx(ctx, nil)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "begin tx create certificate", err)
		return nil, status.Error(codes.Internal, "Failed to create and begin transaction : "+err.Error())
	}

	in.AlumniId = ctx.Value(app.Ctx("alumni_id")).(uint64)

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
