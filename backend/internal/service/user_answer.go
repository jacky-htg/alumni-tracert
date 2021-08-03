package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"
)

func (u *AlumniTracertServer) UserAnswerCreate(ctx context.Context, in *proto.UserAnswer) (*proto.UserAnswer, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on user answer", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Token = ctx.Value(app.Ctx("token")).(string)
	err = userModel.GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login", err)
		return nil, err
	}

	if err := new(validation.UserAnswer).Create(ctx, in); err != nil {
		util.LogError(u.Log, "validation on create user answer", err)
		return nil, err
	}

	var answerModel model.UserAnswer
	answerModel.Pb.UserId = userModel.Pb.Id
	answerModel.Pb.QuestionId = in.QuestionId
	answerModel.Pb.Answer = in.Answer

	err = answerModel.Create(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "create user answer", err)
		return nil, err
	}

	return &answerModel.Pb, nil
}