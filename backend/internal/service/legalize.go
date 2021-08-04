package service

import (
	"context"
	"database/sql"
	"time"

	"tracert/internal/constant"
	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) LegalizeCreate(ctx context.Context, in *proto.Legalize) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on create alumni", err)
		return nil, err
	}

	if err := new(validation.Legalize).Create(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on upload legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.Alumni = &proto.Alumni{Id: ctx.Value(app.Ctx("alumni_id")).(uint64)}
	legalizeModel.Pb.Ijazah = in.Ijazah
	legalizeModel.Pb.Transcript = in.Transcript

	err = legalizeModel.Create(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeList(in *proto.ListInput, stream proto.TracertService_LegalizeListServer) error {
	ctx := stream.Context()

	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login  on list user", err)
		return err
	}

	if !(ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_ADMIN || ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_PEJABAT) {
		util.LogError(u.Log, "Get user login  on list user", err)
		return status.Error(codes.PermissionDenied, "You dont have permission")
	}

	var legalizeModel model.Legalize
	query, paramQueries, listResponse, err := legalizeModel.ListQuery(ctx, u.Db, in)

	rows, err := u.Db.QueryContext(ctx, query, paramQueries...)
	if err != nil {
		util.LogError(u.Log, "Query Context on list legialize", err)
		return status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()
	listResponse = in

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			util.LogError(u.Log, "Context Error on looping list legalize", err)
			return err
		}

		var createdAt, updatedAt time.Time
		var pbLegalize proto.Legalize
		var pbAlumni proto.Alumni
		var verifiedAt, approvedAt sql.NullString
		var verifiedBy, approvedBy sql.NullInt64
		err = rows.Scan(
			&pbLegalize.Id, &pbAlumni.Id, &pbAlumni.Name, &pbAlumni.Nim, &pbAlumni.Nik, &pbAlumni.NoIjazah,
			&pbLegalize.Ijazah, &pbLegalize.Transcript, &pbLegalize.IsVerified, &pbLegalize.IsApproved,
			&verifiedBy, &verifiedAt, &approvedBy, &approvedAt,
			&pbLegalize.Status, &createdAt, &updatedAt,
		)
		if err != nil {
			util.LogError(u.Log, "scan on looping list ijazah", err)
			return status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbLegalize.Created = createdAt.String()
		pbLegalize.Updated = updatedAt.String()
		pbLegalize.Alumni = &pbAlumni
		pbLegalize.VerifiedAt = verifiedAt.String
		pbLegalize.VerifiedBy = uint64(verifiedBy.Int64)
		pbLegalize.ApprovedAt = approvedAt.String
		pbLegalize.ApprovedBy = uint64(approvedBy.Int64)

		res := &proto.LegalizeListResponse{
			ListInput: listResponse,
			Legalize:  &pbLegalize,
		}

		err = stream.Send(res)
		if err != nil {
			util.LogError(u.Log, "send stream on looping list user", err)
			return status.Errorf(codes.Unknown, "cannot send stream response: %v", err)
		}
	}

	return nil
}

func (u *AlumniTracertServer) LegalizeGet(ctx context.Context, in *proto.Legalize) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get use login on get user", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.Id = in.Id

	if err := legalizeModel.Get(ctx, u.Db); err != nil {
		util.LogError(u.Log, "get legalize", err)
		return nil, err
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_APPRAISER ||
		(ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_ALUMNI && ctx.Value(app.Ctx("alumni_id")).(uint64) != legalizeModel.Pb.Alumni.Id) {
		util.LogError(u.Log, "invalid access", err)
		return nil, status.Errorf(codes.PermissionDenied, "can not get legalize")
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeVerified(ctx context.Context, in *proto.UintMessage) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on approved legalize", err)
		return nil, err
	}

	if err := new(validation.Legalize).Verified(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on approved legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.VerifiedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Data
	if err := legalizeModel.Verified(ctx, u.Db); err != nil {
		util.LogError(u.Log, "verified Legalize", err)
		return nil, err
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeApproved(ctx context.Context, in *proto.UintMessage) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on approved legalize", err)
		return nil, err
	}

	if err := new(validation.Legalize).Approved(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on approved legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.ApprovedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Data
	if err := legalizeModel.Approved(ctx, u.Db); err != nil {
		util.LogError(u.Log, "Approved Legalize", err)
		return nil, err
	}

	return &legalizeModel.Pb, nil
}
