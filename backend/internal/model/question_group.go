package model

import (
	"context"
	"database/sql"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type QuestionGroup struct {
	Pb                  proto.QuestionGroup
	PbQuestionGroupList proto.QuestionGroupList
}

func (u *QuestionGroup) List(ctx context.Context, db *sql.DB) error {
	query := ` 
	SELECT qg.id, qg.title, qg.addressed_to, 
		q.id, q.title, q.question_type, q.minimum_value, q.maximum_value, q.is_required,
			qo.id, qo.title, qo.is_need_essay
	FROM question_groups qg 
	JOIN questions q ON qg.id = q.question_group_id
	JOIN question_options qo ON q.id = qo.question_id`

	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Query: %v", err)
	}
	defer rows.Close()

	questionGroup := proto.QuestionGroup{}
	question := proto.Question{}
	questionList := []*proto.Question{}
	option := proto.QuestionOption{}
	optionList := []*proto.QuestionOption{}
	for rows.Next() {
		pbGroup := proto.QuestionGroup{}
		pbQuestion := proto.Question{}
		pbOption := proto.QuestionOption{}
		var minVal, maxVal sql.NullString
		err = rows.Scan(&pbGroup.Id, &pbGroup.Title, &pbGroup.AddressedTo,
			&pbQuestion.Id, &pbQuestion.Title, &pbQuestion.QuestionType, &minVal, &maxVal, &pbQuestion.IsRequired,
			&pbOption.Id, &pbOption.Title, &pbOption.IsNeedEssay,
		)
		if err != nil {
			return status.Errorf(codes.Internal, "Scan: %v", err)
		}

		pbQuestion.MinimumValue = minVal.String
		pbQuestion.MaximumValue = maxVal.String

		if option.Id != pbOption.Id {
			if option.Id > 0 {
				optionList = append(optionList, &proto.QuestionOption{
					Id:          option.Id,
					Title:       option.Title,
					IsNeedEssay: option.IsNeedEssay,
				})
			}
			option = pbOption
		}

		if question.Id != pbQuestion.Id {
			if question.Id > 0 {
				questionList = append(questionList, &proto.Question{
					Id:             question.Id,
					Title:          question.Title,
					QuestionType:   question.QuestionType,
					MinimumValue:   question.MinimumValue,
					MaximumValue:   question.MaximumValue,
					IsRequired:     question.IsRequired,
					QuestionOption: optionList,
				})
				optionList = []*proto.QuestionOption{}
			}
			question = pbQuestion
		}

		if questionGroup.Id != pbGroup.Id {
			if questionGroup.Id > 0 {
				u.PbQuestionGroupList.QuestionGroup = append(u.PbQuestionGroupList.QuestionGroup, &proto.QuestionGroup{
					Id:          questionGroup.Id,
					Title:       questionGroup.Title,
					AddressedTo: questionGroup.AddressedTo,
					Question:    questionList,
				})
				questionList = []*proto.Question{}
			}
			questionGroup = pbGroup
		}

	}

	if rows.Err() != nil {
		return status.Errorf(codes.Internal, "Row: %v", err)
	}

	return nil
}
