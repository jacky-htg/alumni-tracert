package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/util"
	"tracert/proto"
)

func (u *AlumniTracertServer) QuestionList(ctx context.Context, in *proto.QuestionGroupListInput) (*proto.QuestionGroupList, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	var questionGroupModel model.QuestionGroup
	questionGroupModel.PbQuestionGroupListInput = in
	err := questionGroupModel.List(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	return &questionGroupModel.PbQuestionGroupList, nil
}
