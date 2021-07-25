package model

import (
	"context"
	"database/sql"
	"strings"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type QuestionGroup struct {
	Pb                       proto.QuestionGroup
	PbQuestionGroupList      proto.QuestionGroupList
	PbQuestionGroupListInput *proto.QuestionGroupListInput
}

func (u *QuestionGroup) List(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := ` 
	SELECT qg.id, qg.title, qg.addressed_to, 
		q.id, q.title, q.question_type, q.minimum_value, q.maximum_value, q.is_required,
			qo.id, qo.title, qo.is_need_essay
	FROM question_groups qg 
	JOIN questions q ON qg.id = q.question_group_id
	LEFT JOIN question_options qo ON q.id = qo.question_id`
	where := []string{}
	paramQuery := []interface{}{}

	if len(u.PbQuestionGroupListInput.QuestionGroupId) > 0 {
		orwhere := []string{}
		for _, id := range u.PbQuestionGroupListInput.QuestionGroupId {
			orwhere = append(orwhere, "qg.id = ?")
			paramQuery = append(paramQuery, id)
		}
		if len(orwhere) > 0 {
			where = append(where, strings.Join(orwhere, " OR "))
		}
	}

	if len(where) > 0 {
		query += ` WHERE ` + strings.Join(where, " AND ")
	}

	rows, err := db.QueryContext(ctx, query, paramQuery...)
	if err != nil {
		return status.Errorf(codes.Internal, "Query: %v", err)
	}
	defer rows.Close()

	questionGroup := proto.QuestionGroup{}
	question := proto.Question{}
	questionList := []*proto.Question{}
	optionList := []*proto.QuestionOption{}
	for rows.Next() {
		pbGroup := proto.QuestionGroup{}
		pbQuestion := proto.Question{}
		var minVal, maxVal, optionTitle sql.NullString
		var optionId sql.NullInt64
		var optionIsNeedEssay sql.NullBool
		err = rows.Scan(&pbGroup.Id, &pbGroup.Title, &pbGroup.AddressedTo,
			&pbQuestion.Id, &pbQuestion.Title, &pbQuestion.QuestionType, &minVal, &maxVal, &pbQuestion.IsRequired,
			&optionId, &optionTitle, &optionIsNeedEssay,
		)
		if err != nil {
			return status.Errorf(codes.Internal, "Scan: %v", err)
		}

		pbQuestion.MinimumValue = minVal.String
		pbQuestion.MaximumValue = maxVal.String

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

		optionList = append(optionList, &proto.QuestionOption{
			Id:          uint64(optionId.Int64),
			Title:       optionTitle.String,
			IsNeedEssay: optionIsNeedEssay.Bool,
		})

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

	questionList = append(questionList, &proto.Question{
		Id:             question.Id,
		Title:          question.Title,
		QuestionType:   question.QuestionType,
		MinimumValue:   question.MinimumValue,
		MaximumValue:   question.MaximumValue,
		IsRequired:     question.IsRequired,
		QuestionOption: optionList,
	})

	u.PbQuestionGroupList.QuestionGroup = append(u.PbQuestionGroupList.QuestionGroup, &proto.QuestionGroup{
		Id:          questionGroup.Id,
		Title:       questionGroup.Title,
		AddressedTo: questionGroup.AddressedTo,
		Question:    questionList,
	})

	if rows.Err() != nil {
		return status.Errorf(codes.Internal, "Row: %v", err)
	}

	return nil
}
