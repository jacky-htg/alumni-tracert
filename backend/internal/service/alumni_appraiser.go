package service

import (
	"context"
	"time"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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

func (u *AlumniTracertServer) AlumniAppraiserList(in *proto.ListInput, stream proto.TracertService_AlumniAppraiserListServer) error {
	ctx := stream.Context()

	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on list alumni Appraiser", err)
		return err
	}

	var appraiserModel model.AlumniAppraiser
	query, paramQueries, listResponse, err := appraiserModel.ListQuery(ctx, u.Db, in)

	rows, err := u.Db.QueryContext(ctx, query, paramQueries...)
	if err != nil {
		util.LogError(u.Log, "Query Context on list alumni appraiser", err)
		return status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()
	listResponse = in

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			util.LogError(u.Log, "Context Error on looping list alumni appraiser", err)
			return err
		}

		var pbAppraiser proto.AlumniAppraiser
		var createdAt, updatedAt time.Time
		var pbAlumni proto.Alumni
		err = rows.Scan(
			&pbAppraiser.Id, &pbAppraiser.UserId, &pbAppraiser.Name, &pbAppraiser.Instansi, &pbAppraiser.Position,
			&pbAlumni.Id, &pbAppraiser.AlumniPosition, &createdAt, &updatedAt,
		)
		if err != nil {
			util.LogError(u.Log, "scan on looping list alumni appraiser", err)
			return status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbAppraiser.Created = createdAt.String()
		pbAppraiser.Updated = updatedAt.String()
		pbAppraiser.Alumni = &pbAlumni

		res := &proto.AlumniAppraiserListResponse{
			ListInput:       listResponse,
			AlumniAppraiser: &pbAppraiser,
		}

		err = stream.Send(res)
		if err != nil {
			util.LogError(u.Log, "send stream on looping list alumni appraiser", err)
			return status.Errorf(codes.Unknown, "cannot send stream response: %v", err)
		}
	}

	return nil
}

func (u *AlumniTracertServer) AlumniAppraiserGet(ctx context.Context, in *proto.AlumniAppraiser) (*proto.AlumniAppraiser, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on get alumni appraiser", err)
		return nil, err
	}

	var appraiserModel model.AlumniAppraiser
	appraiserModel.Pb.Id = in.Id

	if err := appraiserModel.Get(ctx, u.Db); err != nil {
		util.LogError(u.Log, "get alumni appraiser", err)
		return nil, err
	}

	return &appraiserModel.Pb, nil
}
