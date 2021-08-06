package validation

import (
	"context"
	"database/sql"
	"tracert/internal/constant"
	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Legalize struct {
	Model model.Legalize
}

func (u *Legalize) Create(ctx context.Context, in *proto.Legalize, db *sql.DB) error {
	alumniId := ctx.Value(app.Ctx("alumni_id"))

	if alumniId == nil || alumniId.(uint64) <= 0 {
		return status.Error(codes.InvalidArgument, "You are not alumni")
	}

	if len(in.Ijazah) <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ijazah")
	}

	if len(in.Transcript) <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid transcript")
	}

	return nil
}

func (u *Legalize) Rejected(ctx context.Context, in *proto.UintMessage, db *sql.DB) error {
	if in.Data <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) != constant.USERTYPE_ADMIN {
		return status.Error(codes.PermissionDenied, "You can not verified this document")
	}

	u.Model.Pb.Id = in.Data
	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status == uint32(constant.LEGALIZE_STATUS_REJECTED) {
		return status.Error(codes.InvalidArgument, "Legalize has been rejected")
	}

	if u.Model.Pb.IsVerified {
		return status.Error(codes.InvalidArgument, "Legalize has been verified")
	}

	if u.Model.Pb.IsApproved {
		return status.Error(codes.InvalidArgument, "Legalize has been approved")
	}

	return nil
}

func (u *Legalize) Verified(ctx context.Context, in *proto.UintMessage, db *sql.DB) error {
	if in.Data <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) != constant.USERTYPE_ADMIN {
		return status.Error(codes.PermissionDenied, "You can not verified this document")
	}

	u.Model.Pb.Id = in.Data
	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status == uint32(constant.LEGALIZE_STATUS_REJECTED) {
		return status.Error(codes.InvalidArgument, "Legalize has been rejected")
	}

	if u.Model.Pb.IsVerified {
		return status.Error(codes.InvalidArgument, "Legalize has been verified")
	}

	if u.Model.Pb.IsApproved {
		return status.Error(codes.InvalidArgument, "Legalize has been approved")
	}

	return nil
}

func (u *Legalize) Approved(ctx context.Context, in *proto.UintMessage, db *sql.DB) error {
	if in.Data <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) != constant.USERTYPE_PEJABAT {
		return status.Error(codes.PermissionDenied, "You can not signed this document")
	}

	u.Model.Pb.Id = in.Data
	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status == uint32(constant.LEGALIZE_STATUS_REJECTED) {
		return status.Error(codes.InvalidArgument, "Legalize has been rejected")
	}

	if !u.Model.Pb.IsVerified {
		return status.Error(codes.InvalidArgument, "Legalize not yet verified")
	}

	if u.Model.Pb.IsApproved {
		return status.Error(codes.InvalidArgument, "Legalize has been approved")
	}

	return nil
}
