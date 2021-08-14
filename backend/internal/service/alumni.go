package service

import (
	"context"
	"database/sql"
	"time"

	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) AlumniRegistration(ctx context.Context, in *proto.AlumniRegistrationInput) (*proto.AlumniRegistrationInput, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	tx, err := u.Db.BeginTx(ctx, nil)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "begin tx alumni registration", err)
		return nil, status.Error(codes.Internal, "Failed to create and begin transaction : "+err.Error())
	}

	user, password, err := u.userCreateHelper(ctx, in.User, tx)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	in.User = user

	alumni, err := u.alumniCreateHelper(ctx, in.Alumni, user, tx)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	in.Alumni = alumni

	in.Certificate.AlumniId = alumni.Id
	certificate, err := u.certificateCreateHelper(ctx, in.Certificate, tx)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	in.Certificate = certificate

	err = u.sendEmailHelper(ctx, user, *password)
	if err != nil {
		util.LogError(u.Log, "send email create user", err)
		tx.Rollback()
	}

	err = tx.Commit()
	if err != nil {
		util.LogError(u.Log, "commit alumni registration", err)
		return nil, err
	}

	return in, nil
}

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

	tx, err := u.Db.BeginTx(ctx, nil)
	if err != nil {
		tx.Rollback()
		util.LogError(u.Log, "begin tx create alumni", err)
		return nil, status.Error(codes.Internal, "Failed to create and begin transaction : "+err.Error())
	}

	alumni, err := u.alumniCreateHelper(ctx, in, &userModel.Pb, tx)
	if err != nil {
		tx.Rollback()
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		util.LogError(u.Log, "commit create alumni", err)
		return nil, err
	}

	return alumni, nil
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
			&pbAlumni.Id, &pbAlumni.UserId, &pbAlumni.Name, &pbAlumni.Nik, &pbAlumni.PlaceOfBirth, &pbAlumni.DateOfBirth,
			&pbAlumni.Phone, &createdAt, &updatedAt,
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

	var certificateModel model.Certificate
	certificateModel.Pb.AlumniId = alumniModel.Pb.Id
	certificates, err := certificateModel.GetByAlumni(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "get Certicate By Alumni", err)
		return nil, err
	}

	alumniModel.Pb.Certificates = certificates

	return &alumniModel.Pb, nil
}

func (u *AlumniTracertServer) alumniCreateHelper(ctx context.Context, in *proto.Alumni, user *proto.User, tx *sql.Tx) (*proto.Alumni, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	if err := new(validation.Alumni).Create(ctx, in); err != nil {
		util.LogError(u.Log, "validation on create alumni", err)
		return nil, err
	}

	var alumniModel model.Alumni
	alumniModel.Pb.UserId = user.Id
	alumniModel.Pb.Name = user.Name
	alumniModel.Pb.Nik = in.Nik
	alumniModel.Pb.PlaceOfBirth = in.PlaceOfBirth
	alumniModel.Pb.DateOfBirth = in.DateOfBirth
	alumniModel.Pb.Phone = in.Phone

	err := alumniModel.Create(ctx, tx)
	if err != nil {
		util.LogError(u.Log, "create alumni", err)
		return nil, err
	}

	return &alumniModel.Pb, nil
}

func (u *AlumniTracertServer) certificateCreateHelper(ctx context.Context, in *proto.Certificate, tx *sql.Tx) (*proto.Certificate, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	if err := new(validation.Certificate).Create(ctx, in); err != nil {
		util.LogError(u.Log, "validation on create certificate", err)
		return nil, err
	}

	var certificateModel model.Certificate
	certificateModel.Pb.AlumniId = in.AlumniId
	certificateModel.Pb.Nim = in.Nim
	certificateModel.Pb.NoIjazah = in.NoIjazah
	certificateModel.Pb.MajorStudy = in.MajorStudy
	certificateModel.Pb.GraduationYear = in.GraduationYear

	err := certificateModel.Create(ctx, tx)
	if err != nil {
		util.LogError(u.Log, "create certificate", err)
		return nil, err
	}

	return &certificateModel.Pb, nil
}
