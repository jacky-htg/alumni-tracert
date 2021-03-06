package validation

import (
	"context"
	"database/sql"
	"time"
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

func (u *Legalize) Upload(ctx context.Context, in *proto.Legalize, db *sql.DB) error {
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

	if in.GetCertificateId() <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid certificate")
	}

	var certificate model.Certificate
	certificate.Pb.Id = in.GetCertificateId()
	certificate.Pb.AlumniId = alumniId.(uint64)
	err := certificate.GetByIdAndAlumni(ctx, db)
	if err != nil {
		return err
	}

	mTracer := model.Tracer{}
	mTracer.Pb.UserId = ctx.Value(app.Ctx("user_id")).(uint64)
	err = mTracer.GetLastByUserId(ctx, db)
	if err != nil {
		return err
	}

	created, err := time.Parse("2006-01-02T15:04:05Z", mTracer.Pb.Created)
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}

	expired := time.Now().Add(-time.Hour * 24 * 30 * 2)
	if expired.After(created) {
		return status.Error(codes.PermissionDenied, "Silahkan update kuisioner terlebih dahulu")
	}

	return nil
}

func (u *Legalize) Rejected(ctx context.Context, in *proto.Legalize, db *sql.DB) error {
	if len(in.Id) <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) != constant.USERTYPE_ADMIN {
		return status.Error(codes.PermissionDenied, "You can not verified this document")
	}

	u.Model.Pb.Id = in.Id
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

func (u *Legalize) Extended(ctx context.Context, in *proto.Legalize, db *sql.DB) error {
	if len(in.Id) <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) != constant.USERTYPE_ALUMNI {
		return status.Error(codes.PermissionDenied, "You can not extended this document")
	}

	u.Model.Pb.Id = in.Id
	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status != uint32(constant.LEGALIZE_STATUS_APPROVED) {
		return status.Error(codes.InvalidArgument, "Legalize must be approved before")
	}

	if !u.Model.Pb.IsApproved {
		return status.Error(codes.InvalidArgument, "Legalize must be approved before")
	}

	return nil
}

func (u *Legalize) Done(ctx context.Context, in *proto.Legalize, db *sql.DB) error {
	if len(in.Id) <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	if ctx.Value(app.Ctx("user_type")).(uint32) != constant.USERTYPE_ADMIN {
		return status.Error(codes.PermissionDenied, "You can not finishing this document")
	}

	u.Model.Pb.Id = in.Id
	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status == uint32(constant.LEGALIZE_STATUS_REJECTED) {
		return status.Error(codes.InvalidArgument, "Legalize has been rejected")
	}

	if !u.Model.Pb.IsVerified {
		return status.Error(codes.InvalidArgument, "Legalize has not been verified")
	}

	if !u.Model.Pb.IsOffline {
		return status.Error(codes.InvalidArgument, "Legalize not offline option")
	}

	if u.Model.Pb.Status != uint32(constant.LEGALIZE_STATUS_VERIFIED) {
		return status.Error(codes.InvalidArgument, "Legalize has not been verified")
	}

	return nil
}

func (u *Legalize) Verified(ctx context.Context, in *proto.StringMessage, db *sql.DB) error {
	if len(in.Data) <= 0 {
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

func (u *Legalize) Check(ctx context.Context, in *proto.StringMessage, db *sql.DB) error {
	if len(in.Data) <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid ID")
	}

	u.Model.Pb.Id = in.Data
	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status != uint32(constant.LEGALIZE_STATUS_APPROVED) {
		return status.Error(codes.InvalidArgument, "Invalid Certificate")
	}

	if u.Model.Pb.IsOffline {
		return status.Error(codes.InvalidArgument, "Invalid Certificate")
	}

	return nil
}

func (u *Legalize) Approved(ctx context.Context, in *proto.StringMessage, db *sql.DB) error {
	if len(in.Data) <= 0 {
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

func (u *Legalize) Rating(ctx context.Context, db *sql.DB) error {
	if u.Model.Pb.Rating < 1 || u.Model.Pb.Rating > 5 {
		return status.Error(codes.InvalidArgument, "Please supply valid Rating")
	}

	if err := u.Model.Get(ctx, db); err != nil {
		return err
	}

	if u.Model.Pb.Status != uint32(constant.LEGALIZE_STATUS_APPROVED) {
		return status.Error(codes.InvalidArgument, "Legalize has not been approved")
	}

	if !u.Model.Pb.IsApproved {
		return status.Error(codes.InvalidArgument, "Legalize has not been approved")
	}

	return nil
}
