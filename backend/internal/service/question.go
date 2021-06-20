package service

import (
	"context"

	"tracert/internal/model"
	"tracert/proto"
)

func (u *AlumniTracertServer) QuestionList(ctx context.Context, in *proto.EmptyMessage) (*proto.QuestionGroupList, error) {
	var questionGroupModel model.QuestionGroup
	err := questionGroupModel.List(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	return &questionGroupModel.PbQuestionGroupList, nil
}
