package model

import (
	"context"
	"database/sql"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserAnswer struct {
	Pb proto.UserAnswer
}

func (u *UserAnswer) Create(ctx context.Context, db *sql.DB) error {
	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	query := `INSERT INTO user_answers (tracer_id, question_id, answer) VALUES (?, ?, ?)`

	stmt, err := db.PrepareContext(ctx, query)
	if err != nil {
		return status.Errorf(codes.Internal, "Prepare insert: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx,
		u.Pb.TracerId,
		u.Pb.QuestionId,
		u.Pb.Answer,
	)
	if err != nil {
		return status.Errorf(codes.Internal, "Exec insert: %v", err)
	}

	return nil
}

func (u *UserAnswer) List(ctx context.Context, db *sql.DB) (*proto.TracerList, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	var out proto.TracerList

	query := `
	select alumni.name, alumni.nik, tracers. created, questions.title, user_answers.answer 
	FROM (
		select tracer.id, MAX(user_answers.id) answer_id
		FROM (
			select MAX(tracers.id) id
			from tracers 
			group by user_id
		) as tracer
		join user_answers on tracer.id = user_answers.tracer_id
		GROUP BY user_answers.tracer_id, user_answers.question_id
	) as answer
	join user_answers on answer.answer_id = user_answers.id
	join questions on user_answers.question_id=questions.id
	join tracers on answer.id = tracers.id
	join users on tracers.user_id = users.id
	join alumni on users.id = alumni.user_id 
	`
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()

	var alumni proto.AlumniKuisioner
	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			return nil, err
		}
		var pbAnswer proto.Answer
		var name, nik, created string
		err = rows.Scan(
			&name, &nik, &created, &pbAnswer.Question, &pbAnswer.Answer,
		)

		if alumni.Nik != nik {
			println("cool", alumni.Nik, nik)
			if len(alumni.Nik) > 0 {
				out.Answer = append(out.Answer, &alumni)
			}
			alumni = proto.AlumniKuisioner{}
			alumni.Name = name
			alumni.Nik = nik
			alumni.Created = created
		}
		alumni.Answer = append(alumni.Answer, &pbAnswer)

		if err != nil {
			return nil, status.Errorf(codes.Internal, "scan data: %v", err)
		}
	}

	out.Answer = append(out.Answer, &alumni)

	if rows.Err() != nil {
		return nil, status.Error(codes.Internal, rows.Err().Error())
	}

	return &out, nil
}
