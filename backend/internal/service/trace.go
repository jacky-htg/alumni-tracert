package service

import (
	"context"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/proto"
)

func (u *AlumniTracertServer) GetLastTrace(ctx context.Context, in *proto.EmptyMessage) (*proto.Tracer, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on getlasttrace", err)
		return nil, err
	}

	mTracer := model.Tracer{}
	mTracer.Pb.UserId = ctx.Value(app.Ctx("user_id")).(uint64)
	err = mTracer.GetLastByUserId(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get last trace by user id ", err)
		return nil, err
	}

	return &mTracer.Pb, nil
}
