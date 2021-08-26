package service

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"time"

	"tracert/internal/constant"
	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/myimage"
	"tracert/internal/pkg/oss"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"github.com/jung-kurt/gofpdf"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) LegalizeUpload(ctx context.Context, in *proto.Legalize) (*proto.Legalize, error) {
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

	if err := new(validation.Legalize).Upload(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on upload legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.AlumniId = ctx.Value(app.Ctx("alumni_id")).(uint64)
	legalizeModel.Pb.CertificateId = in.CertificateId
	legalizeModel.Pb.Ijazah = in.Ijazah
	legalizeModel.Pb.Transcript = in.Transcript
	legalizeModel.Pb.IsOffline = in.IsOffline

	err = legalizeModel.Upsert(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	err = legalizeModel.Get(ctx, u.Db)

	var userModel model.User
	list, err := userModel.GetAdmin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "get admon on notif legalisir status as submited", err)
	}

	for _, admin := range list {
		if err := NotifLegalisirEmailHelper(ctx, map[string]string{
			"Name":         admin.Name,
			"Email":        admin.Email,
			"NoIjazah":     legalizeModel.Pb.NoIjazah,
			"StatusIjazah": "SUBMIT",
		}); err != nil {
			util.LogError(u.Log, "send email notif legalisir status as submited", err)
		}
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeGetOwn(ctx context.Context, in *proto.EmptyMessage) (*proto.Certificates, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on get own legalize ", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.AlumniId = ctx.Value(app.Ctx("alumni_id")).(uint64)

	legalizes, err := legalizeModel.GetByAlumniId(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	return legalizes, nil
}

func (u *AlumniTracertServer) LegalizeRating(ctx context.Context, in *proto.Legalize) (*proto.StringMessage, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on rating legalize ", err)
		return nil, err
	}

	var legalizeValidate validation.Legalize
	legalizeValidate.Model.Pb.Id = in.Id
	legalizeValidate.Model.Pb.Rating = in.Rating
	if err := legalizeValidate.Rating(ctx, u.Db); err != nil {
		util.LogError(u.Log, "validation on rate legalize", err)
		return nil, err
	}

	err = legalizeValidate.Model.Rating(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	return &proto.StringMessage{Data: "Success"}, nil
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
		var pbCertificate proto.Certificate
		var verifiedAt, approvedAt, rejectedReason sql.NullString
		var verifiedBy, approvedBy sql.NullInt64
		err = rows.Scan(
			&pbLegalize.Id, &pbAlumni.Id, &pbAlumni.Name, &pbCertificate.Nim, &pbAlumni.Nik,
			&pbCertificate.Id, &pbCertificate.NoIjazah, &pbCertificate.MajorStudy, &pbCertificate.GraduationYear,
			&pbLegalize.Ijazah, &pbLegalize.Transcript, &pbLegalize.IsOffline, &pbLegalize.IsVerified, &pbLegalize.IsApproved,
			&verifiedBy, &verifiedAt, &approvedBy, &approvedAt,
			&pbLegalize.Status, &rejectedReason, &createdAt, &updatedAt,
		)
		if err != nil {
			util.LogError(u.Log, "scan on looping list ijazah", err)
			return status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbLegalize.Created = createdAt.String()
		pbLegalize.Updated = updatedAt.String()
		pbLegalize.AlumniId = pbAlumni.Id
		pbLegalize.VerifiedAt = verifiedAt.String
		pbLegalize.VerifiedBy = uint64(verifiedBy.Int64)
		pbLegalize.ApprovedAt = approvedAt.String
		pbLegalize.ApprovedBy = uint64(approvedBy.Int64)
		pbLegalize.CertificateId = pbCertificate.Id
		pbLegalize.RejectedReason = rejectedReason.String

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
		(ctx.Value(app.Ctx("user_type")).(uint32) == constant.USERTYPE_ALUMNI && ctx.Value(app.Ctx("alumni_id")).(uint64) != legalizeModel.Pb.AlumniId) {
		util.LogError(u.Log, "invalid access", err)
		return nil, status.Errorf(codes.PermissionDenied, "can not get legalize")
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeVerified(ctx context.Context, in *proto.StringMessage) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on verified legalize", err)
		return nil, err
	}

	var legalizeValidation validation.Legalize
	if err := legalizeValidation.Verified(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on verified legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.VerifiedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Data
	if err := legalizeModel.Verified(ctx, u.Db); err != nil {
		util.LogError(u.Log, "verified Legalize", err)
		return nil, err
	}

	if err := UpdateLegalisirEmailHelper(ctx, map[string]string{
		"Name":         legalizeValidation.Model.Pb.AlumniName,
		"Email":        legalizeValidation.Model.Pb.AlumniEmail,
		"NoIjazah":     legalizeValidation.Model.Pb.NoIjazah,
		"StatusIjazah": "DIVERIFIKASI",
		"Selamat":      "Selamat",
		"Subject":      "Legalisir No " + legalizeValidation.Model.Pb.NoIjazah + " Telah Diverifikasi",
	}); err != nil {
		util.LogError(u.Log, "send email update legalisir status as verified", err)
	}

	var userModel model.User
	list, err := userModel.GetPejabat(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "get pejabat on notif legalisir status as verified", err)
	}

	for _, pejabat := range list {
		if err := NotifLegalisirEmailHelper(ctx, map[string]string{
			"Name":         pejabat.Name,
			"Email":        pejabat.Email,
			"NoIjazah":     legalizeValidation.Model.Pb.NoIjazah,
			"StatusIjazah": "VERIFIED",
		}); err != nil {
			util.LogError(u.Log, "send email notif legalisir status as verified", err)
		}
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeRejected(ctx context.Context, in *proto.Legalize) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on rejected legalize", err)
		return nil, err
	}

	var legalizeValidation validation.Legalize
	if err := legalizeValidation.Rejected(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on rejected legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.VerifiedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Id
	legalizeModel.Pb.RejectedReason = in.RejectedReason
	if err := legalizeModel.Rejected(ctx, u.Db); err != nil {
		util.LogError(u.Log, "rejected Legalize", err)
		return nil, err
	}

	if err := UpdateLegalisirEmailHelper(ctx, map[string]string{
		"Name":         legalizeValidation.Model.Pb.AlumniName,
		"Email":        legalizeValidation.Model.Pb.AlumniEmail,
		"NoIjazah":     legalizeValidation.Model.Pb.NoIjazah,
		"StatusIjazah": "DITOLAK",
		"Selamat":      "Maaf",
		"Subject":      "Legalisir No " + legalizeValidation.Model.Pb.NoIjazah + " Telah Ditolak",
	}); err != nil {
		util.LogError(u.Log, "send email update legalisir status as rejected", err)
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeDone(ctx context.Context, in *proto.Legalize) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on done legalize", err)
		return nil, err
	}

	var legalizeValidation validation.Legalize
	if err := legalizeValidation.Done(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on done legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.ApprovedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Id
	if err := legalizeModel.Done(ctx, u.Db); err != nil {
		util.LogError(u.Log, "Done Legalize", err)
		return nil, err
	}

	if err := UpdateLegalisirEmailHelper(ctx, map[string]string{
		"Name":         legalizeValidation.Model.Pb.AlumniName,
		"Email":        legalizeValidation.Model.Pb.AlumniEmail,
		"NoIjazah":     legalizeValidation.Model.Pb.NoIjazah,
		"StatusIjazah": "SELESAI. Silahkan ambil legalisir di kampus Poltekkes Medan",
		"Selamat":      "Selamat",
		"Subject":      "Legalisir No " + legalizeValidation.Model.Pb.NoIjazah + " Telah Selesai",
	}); err != nil {
		util.LogError(u.Log, "send email update legalisir status as done", err)
	}

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeExtended(ctx context.Context, in *proto.Legalize) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	ctx, err := GetUserLogin(ctx, u.Db)
	if err != nil {
		util.LogError(u.Log, "Get user login on extended legalize", err)
		return nil, err
	}

	var legalizeValidation validation.Legalize
	if err := legalizeValidation.Extended(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on extended legalize", err)
		return nil, err
	}

	if legalizeValidation.Model.Pb.IsOffline {
		err = legalizeValidation.Model.ExtendedOffline(ctx, u.Db)
	} else {
		err = legalizeValidation.Model.ExtendedOnline(ctx, u.Db)
	}

	if err != nil {
		util.LogError(u.Log, "Extended Legalize", err)
		return nil, err
	}

	if legalizeValidation.Model.Pb.IsOffline {
		var userModel model.User
		list, err := userModel.GetAdmin(ctx, u.Db)
		if err != nil {
			util.LogError(u.Log, "get admon on notif legalisir status as submited", err)
		}

		for _, admin := range list {
			if err := NotifLegalisirEmailHelper(ctx, map[string]string{
				"Name":         admin.Name,
				"Email":        admin.Email,
				"NoIjazah":     legalizeValidation.Model.Pb.NoIjazah,
				"StatusIjazah": "Permintaan Perpanjangan Legalisir",
			}); err != nil {
				util.LogError(u.Log, "send email notif legalisir status as extended request", err)
			}
		}
	}

	return &legalizeValidation.Model.Pb, nil
}

func (u *AlumniTracertServer) LegalizeCheck(ctx context.Context, in *proto.StringMessage) (*proto.Legalize, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	var legalizeValidate validation.Legalize
	err := legalizeValidate.Check(ctx, in, u.Db)
	if err != nil {
		util.LogError(u.Log, "validation on check legalize", err)
		return nil, err
	}

	return &legalizeValidate.Model.Pb, nil
}

func (u *AlumniTracertServer) LegalizeApproved(ctx context.Context, in *proto.StringMessage) (*proto.Legalize, error) {
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

	var legalizeValidate validation.Legalize
	err = legalizeValidate.Approved(ctx, in, u.Db)
	if err != nil {
		util.LogError(u.Log, "validation on approved legalize", err)
		return nil, err
	}

	sUnix := fmt.Sprintf("%d", time.Now().Unix())
	pdfName := sUnix + "-" + legalizeValidate.Model.Pb.Id + ".pdf"

	for fileType, path := range map[string]string{
		"ijazah":     legalizeValidate.Model.Pb.Ijazah,
		"transcript": legalizeValidate.Model.Pb.Transcript,
	} {
		err = signPdf(fileType, path, sUnix, legalizeValidate.Model.Pb.Id)
		if err != nil {
			return nil, err
		}

		oss.UploadLocalFile(os.Getenv("OSS_BUCKET_DOCUMENT"), fileType+"/"+pdfName, fileType+"-"+pdfName)
		os.Remove(fileType + "-" + pdfName)
		os.Remove(fileType + "-" + sUnix + "-" + legalizeValidate.Model.Pb.Id + ".jpeg")
		os.Remove("qrCode-" + fileType + "-" + legalizeValidate.Model.Pb.Id + ".jpg")
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.ApprovedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Data
	legalizeModel.Pb.IjazahSigned = "ijazah/" + pdfName
	legalizeModel.Pb.TranscriptSigned = "transcript/" + pdfName
	if err := legalizeModel.Approved(ctx, u.Db); err != nil {
		util.LogError(u.Log, "Approved Legalize", err)
		return nil, err
	}

	if err := UpdateLegalisirEmailHelper(ctx, map[string]string{
		"Name":         legalizeValidate.Model.Pb.AlumniName,
		"Email":        legalizeValidate.Model.Pb.AlumniEmail,
		"NoIjazah":     legalizeValidate.Model.Pb.NoIjazah,
		"StatusIjazah": "SELESAI",
		"Selamat":      "Selamat",
		"Subject":      "Legalisir No " + legalizeValidate.Model.Pb.NoIjazah + " Telah Selesai",
	}); err != nil {
		util.LogError(u.Log, "send email update legalisir status as approved", err)
	}

	return &legalizeModel.Pb, nil
}

func signPdf(fileType string, pathUrl string, sUnix string, id string) error {
	pdf := gofpdf.New("P", "mm", "A4", "")

	if fileType == "ijazah" {
		pdf = gofpdf.New("L", "mm", "A4", "")
	}

	pdf.AddPage()

	resp, err := http.Get(pathUrl)
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}
	defer resp.Body.Close()

	img, err := myimage.ToGray(resp.Body)
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}

	err = myimage.SaveToFile(img, "jpeg", fileType+"-"+sUnix+"-"+id)
	if err != nil {
		return status.Error(codes.Internal, err.Error())
	}

	if err := util.CreateQrCode(fileType, id); err != nil {
		return err
	}

	if fileType == "ijazah" {
		pdf.Image("./"+fileType+"-"+sUnix+"-"+id+".jpeg", 0, 0, 290, 0, false, "", 0, "")
		pdf.Image("./stempel-sign.png", 44, 15, 75, 0, false, "", 0, "")
		pdf.Image("./qrCode-"+fileType+"-"+id+".jpg", 10, 15, 35, 0, false, "", 0, "")
	} else {
		pdf.Image("./"+fileType+"-"+sUnix+"-"+id+".jpeg", 0, 0, 205, 0, false, "", 0, "")
		pdf.Image("./stempel-sign.png", 44, 220, 75, 0, false, "", 0, "")
		pdf.Image("./qrCode-"+fileType+"-"+id+".jpg", 10, 220, 35, 0, false, "", 0, "")
	}

	return pdf.OutputFileAndClose(fileType + "-" + sUnix + "-" + id + ".pdf")

}
