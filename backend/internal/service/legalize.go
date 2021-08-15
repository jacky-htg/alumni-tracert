package service

import (
	"context"
	"database/sql"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"time"

	"tracert/internal/constant"
	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/oss"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"github.com/signintech/gopdf"
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

	err = legalizeModel.Upsert(ctx, u.Db)
	if err != nil {
		return nil, err
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

	legalizeModel.Pb.IjazahSigned = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + legalizeModel.Pb.IjazahSigned
	legalizeModel.Pb.TranscriptSigned = "https://" + os.Getenv("OSS_BUCKET_DOCUMENT") + "." + os.Getenv("OSS_ENDPOINT") + "/" + legalizeModel.Pb.TranscriptSigned

	return legalizes, nil
}

func (u *AlumniTracertServer) LegalizeRating(ctx context.Context, in *proto.UintMessage) (*proto.StringMessage, error) {
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
	legalizeValidate.Model.Pb.AlumniId = ctx.Value(app.Ctx("alumni_id")).(uint64)
	if err := legalizeValidate.Rating(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on rate legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.Id = legalizeValidate.Model.Pb.Id
	legalizeModel.Pb.Rating = uint32(in.Data)

	err = legalizeModel.Rating(ctx, u.Db)
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
		var verifiedAt, approvedAt sql.NullString
		var verifiedBy, approvedBy sql.NullInt64
		err = rows.Scan(
			&pbLegalize.Id, &pbAlumni.Id, &pbAlumni.Name, &pbCertificate.Nim, &pbAlumni.Nik,
			&pbCertificate.Id, &pbCertificate.NoIjazah, &pbCertificate.MajorStudy, &pbCertificate.GraduationYear,
			&pbLegalize.Ijazah, &pbLegalize.Transcript, &pbLegalize.IsOffline, &pbLegalize.IsVerified, &pbLegalize.IsApproved,
			&verifiedBy, &verifiedAt, &approvedBy, &approvedAt,
			&pbLegalize.Status, &createdAt, &updatedAt,
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

func (u *AlumniTracertServer) LegalizeVerified(ctx context.Context, in *proto.UintMessage) (*proto.Legalize, error) {
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

	if err := new(validation.Legalize).Verified(ctx, in, u.Db); err != nil {
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

	return &legalizeModel.Pb, nil
}

func (u *AlumniTracertServer) LegalizeRejected(ctx context.Context, in *proto.UintMessage) (*proto.Legalize, error) {
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

	if err := new(validation.Legalize).Rejected(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on rejected legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.VerifiedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Data
	if err := legalizeModel.Rejected(ctx, u.Db); err != nil {
		util.LogError(u.Log, "rejected Legalize", err)
		return nil, err
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

	if err := new(validation.Legalize).Done(ctx, in, u.Db); err != nil {
		util.LogError(u.Log, "validation on done legalize", err)
		return nil, err
	}

	var legalizeModel model.Legalize
	legalizeModel.Pb.ApprovedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	if err := legalizeModel.Done(ctx, u.Db); err != nil {
		util.LogError(u.Log, "Done Legalize", err)
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

	var legalizeValidate validation.Legalize
	err = legalizeValidate.Approved(ctx, in, u.Db)
	if err != nil {
		util.LogError(u.Log, "validation on approved legalize", err)
		return nil, err
	}

	tUnix := time.Now().Unix()
	legalizeStringId := strconv.Itoa(int(legalizeValidate.Model.Pb.Id)) + ".pdf"

	ijazahLocalFileName := fmt.Sprintf("%d-", tUnix) + "ijazah-" + legalizeStringId
	ijazahSignedUrl := "ijazah/" + fmt.Sprintf("%d-", tUnix) + legalizeStringId

	transcriptLocalFileName := fmt.Sprintf("%d-", tUnix) + "transcript-" + legalizeStringId
	transcriptSignedUrl := "transcript/" + fmt.Sprintf("%d-", tUnix) + legalizeStringId

	signPdf(legalizeValidate.Model.Pb.Ijazah, ijazahLocalFileName)
	signPdf(legalizeValidate.Model.Pb.Transcript, transcriptLocalFileName)

	oss.UploadLocalFile(os.Getenv("OSS_BUCKET_DOCUMENT"), ijazahSignedUrl, ijazahLocalFileName)
	oss.UploadLocalFile(os.Getenv("OSS_BUCKET_DOCUMENT"), transcriptSignedUrl, transcriptLocalFileName)

	var legalizeModel model.Legalize
	legalizeModel.Pb.ApprovedBy = ctx.Value(app.Ctx("user_id")).(uint64)
	legalizeModel.Pb.Id = in.Data
	legalizeModel.Pb.IjazahSigned = ijazahSignedUrl
	legalizeModel.Pb.TranscriptSigned = transcriptSignedUrl
	if err := legalizeModel.Approved(ctx, u.Db); err != nil {
		util.LogError(u.Log, "Approved Legalize", err)
		return nil, err
	}

	os.Remove(ijazahLocalFileName)
	os.Remove(transcriptLocalFileName)
	return &legalizeModel.Pb, nil
}

func signPdf(url string, name string) {

	pdf := gopdf.GoPdf{}
	pdf.Start(gopdf.Config{PageSize: *gopdf.PageSizeA4})
	pdf.AddPage()

	fileUrl := "https://bpodt-staging.oss-ap-southeast-5.aliyuncs.com/" + url
	downloadFile(name, fileUrl)

	// Import page 1
	tpl1 := pdf.ImportPage(name, 1, "/MediaBox")

	// Draw pdf onto page
	pdf.UseImportedTemplate(tpl1, 0, 0, 595, 0)

	pdf.Image("./stempel-sign.png", 75, 75, nil) //print image

	pdf.WritePdf(name)
}

func downloadFile(filepath string, url string) error {

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}
