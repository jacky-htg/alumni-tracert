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

func (u *AlumniTracertServer) AlumniList(in *proto.ListInput, stream proto.TracertService_AlumniListServer) error {
	ctx := stream.Context()

	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on list alumni", err)
		return err
	}

	var alumniModel model.Alumni
	query, paramQueries, listResponse, err := alumniModel.ListQuery(ctx, u.Db, in)

	rows, err := u.Db.QueryContext(ctx, query, paramQueries...)
	if err != nil {
		util.LogError(u.Log, "Query Context on list alumni", err)
		return status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()
	listResponse = in

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			util.LogError(u.Log, "Context Error on looping list alumni", err)
			return err
		}

		var pbAlumni proto.Alumni
		var createdAt, updatedAt time.Time
		err = rows.Scan(
			&pbAlumni.Id, &pbAlumni.UserId, &pbAlumni.Name, &pbAlumni.Nim, &pbAlumni.Nik, &pbAlumni.PlaceOfBirth, &pbAlumni.DateOfBirth,
			&pbAlumni.MajorStudy, &pbAlumni.GraduationYear, &pbAlumni.NoIjazah, &pbAlumni.Phone, &createdAt, &updatedAt,
		)
		if err != nil {
			util.LogError(u.Log, "scan on looping list alumni", err)
			return status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbAlumni.Created = createdAt.String()
		pbAlumni.Updated = updatedAt.String()

		res := &proto.AlumniListResponse{
			ListInput: listResponse,
			Alumni:    &pbAlumni,
		}

		err = stream.Send(res)
		if err != nil {
			util.LogError(u.Log, "send stream on looping list alumni", err)
			return status.Errorf(codes.Unknown, "cannot send stream response: %v", err)
		}
	}

	return nil
}

func (u *AlumniTracertServer) AlumniGet(ctx context.Context, in *proto.Alumni) (*proto.Alumni, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on get alumni", err)
		return nil, err
	}

	var alumniModel model.Alumni
	alumniModel.Pb.Id = in.Id

	if err := alumniModel.Get(ctx, u.Db); err != nil {
		util.LogError(u.Log, "get alumni", err)
		return nil, err
	}

	return &alumniModel.Pb, nil
}
