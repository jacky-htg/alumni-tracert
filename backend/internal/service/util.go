package service

import (
	"context"
	"database/sql"
	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
)

func GetUserLogin(ctx context.Context, db *sql.DB) (context.Context, error) {
	select {
	case <-ctx.Done():
		return ctx, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		return ctx, err
	}

	var userModel model.User
	userModel.Pb.Token = ctx.Value(app.Ctx("token")).(string)
	if err := userModel.GetUserLogin(ctx, db); err != nil {
		return ctx, err
	}

	ctx = context.WithValue(ctx, app.Ctx("user_id"), userModel.Pb.Id)
	ctx = context.WithValue(ctx, app.Ctx("user_type"), userModel.Pb.UserType)
	ctx = context.WithValue(ctx, app.Ctx("alumni_id"), userModel.Pb.Alumni.Id)

	return ctx, nil

}
