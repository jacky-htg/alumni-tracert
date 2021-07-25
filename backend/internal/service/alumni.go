package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"
)

func (u *AlumniTracertServer) AlumniCreate(ctx context.Context, in *proto.Alumni) (*proto.Alumni, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on create alumni", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Token = ctx.Value(app.Ctx("token")).(string)
	err = userModel.GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login", err)
		return nil, err
	}

	if err := new(validation.Alumni).Create(ctx, in); err != nil {
		util.LogError(u.Log, "validation on create alumni", err)
		return nil, err
	}

	var alumniModel model.Alumni
	alumniModel.Pb.UserId = userModel.Pb.Id
	alumniModel.Pb.Nim = in.Nim
	alumniModel.Pb.Nik = in.Nik
	alumniModel.Pb.PlaceOfBirth = in.PlaceOfBirth
	alumniModel.Pb.DateOfBirth = in.DateOfBirth
	alumniModel.Pb.MajorStudy = in.MajorStudy
	alumniModel.Pb.GraduationYear = in.GraduationYear
	alumniModel.Pb.NoIjazah = in.NoIjazah
	alumniModel.Pb.Phone = in.Phone

	err = alumniModel.Create(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "create alumni", err)
		return nil, err
	}

	return &alumniModel.Pb, nil
}
