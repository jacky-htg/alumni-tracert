package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"
)

func (u *AlumniTracertServer) AlumniAppraiserCreate(ctx context.Context, in *proto.AlumniAppraiser) (*proto.AlumniAppraiser, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on create alumni appraiser", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Token = ctx.Value(app.Ctx("token")).(string)
	err = userModel.GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login", err)
		return nil, err
	}

	if err := new(validation.AlumniAppraiser).Create(ctx, in); err != nil {
		util.LogError(u.Log, "validation on create alumni appraiser", err)
		return nil, err
	}

	var appraiserModel model.AlumniAppraiser
	appraiserModel.Pb.UserId = userModel.Pb.Id
	appraiserModel.Pb.Alumni = in.Alumni
	appraiserModel.Pb.Name = in.Name
	appraiserModel.Pb.Instansi = in.Instansi
	appraiserModel.Pb.Position = in.Position
	appraiserModel.Pb.AlumniPosition = in.AlumniPosition

	err = appraiserModel.Create(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "create alumni appraiser", err)
		return nil, err
	}

	return &appraiserModel.Pb, nil
}
