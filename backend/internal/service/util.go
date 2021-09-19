package service

import (
	"context"
	"database/sql"
	"os"
	"regexp"
	"tracert/internal/model"
	"tracert/internal/pkg/app"
	"tracert/internal/pkg/email"
	"tracert/internal/pkg/util"
	"tracert/proto"

	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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

func RegistrationEmailHelper(ctx context.Context, in *proto.User, password string) error {
	// send email registration info
	from := mail.NewEmail(os.Getenv("SENDGRID_FROM_NAME"), os.Getenv("SENDGRID_FROM_EMAIL"))
	p := mail.NewPersonalization()
	tos := []*mail.Email{
		mail.NewEmail(in.GetName(), in.GetEmail()),
	}
	p.AddTos(tos...)

	p.SetDynamicTemplateData("name", in.GetName())
	p.SetDynamicTemplateData("username", in.Email)
	p.SetDynamicTemplateData("password", password)
	p.SetDynamicTemplateData("app_name", os.Getenv("APP_NAME"))
	p.SetDynamicTemplateData("cs_email", os.Getenv("CUSTOMERSERVICE_EMAIL"))
	p.SetDynamicTemplateData("cs_phone", os.Getenv("CUSTOMERSERVICE_PHONE"))

	err := email.SendMailV3(from, p, os.Getenv("SENDGRID_TEMPLATE_NEW_USER"))
	if err != nil {
		return status.Errorf(codes.Internal, "send new account email: %v", err)
	}
	return nil
}

func UpdateLegalisirEmailHelper(ctx context.Context, in map[string]string) error {
	// send email registration info
	from := mail.NewEmail(os.Getenv("SENDGRID_FROM_NAME"), os.Getenv("SENDGRID_FROM_EMAIL"))
	p := mail.NewPersonalization()
	tos := []*mail.Email{
		mail.NewEmail(in["Name"], in["Email"]),
	}
	p.AddTos(tos...)

	p.SetDynamicTemplateData("name", in["Name"])
	p.SetDynamicTemplateData("no_ijazah", in["NoIjazah"])
	p.SetDynamicTemplateData("selamat", in["Selamat"])
	p.SetDynamicTemplateData("status_ijazah", in["StatusIjazah"])
	p.SetDynamicTemplateData("subject", in["Subject"])
	p.SetDynamicTemplateData("app_name", os.Getenv("APP_NAME"))
	p.SetDynamicTemplateData("cs_email", os.Getenv("CUSTOMERSERVICE_EMAIL"))
	p.SetDynamicTemplateData("cs_phone", os.Getenv("CUSTOMERSERVICE_PHONE"))

	err := email.SendMailV3(from, p, os.Getenv("SENDGRID_TEMPLATE_UPDATE_STATUS_LEGALISIR"))
	if err != nil {
		return status.Errorf(codes.Internal, "send update status legalisir email: %v", err)
	}
	return nil
}

func NotifLegalisirEmailHelper(ctx context.Context, in map[string]string) error {
	// send email registration info
	from := mail.NewEmail(os.Getenv("SENDGRID_FROM_NAME"), os.Getenv("SENDGRID_FROM_EMAIL"))
	p := mail.NewPersonalization()
	tos := []*mail.Email{
		mail.NewEmail(in["Name"], in["Email"]),
	}
	p.AddTos(tos...)

	p.SetDynamicTemplateData("name", in["Name"])
	p.SetDynamicTemplateData("no_ijazah", in["NoIjazah"])
	p.SetDynamicTemplateData("status_ijazah", in["StatusIjazah"])
	p.SetDynamicTemplateData("app_name", os.Getenv("APP_NAME"))
	p.SetDynamicTemplateData("cs_email", os.Getenv("CUSTOMERSERVICE_EMAIL"))
	p.SetDynamicTemplateData("cs_phone", os.Getenv("CUSTOMERSERVICE_PHONE"))

	err := email.SendMailV3(from, p, os.Getenv("SENDGRID_TEMPLATE_NOTIF_STATUS_LEGALISIR"))
	if err != nil {
		return status.Errorf(codes.Internal, "send update status legalisir email: %v", err)
	}
	return nil
}

func ForgotPasswordEmailHelper(ctx context.Context, in map[string]string) error {
	// send email link forgot password
	from := mail.NewEmail(os.Getenv("SENDGRID_FROM_NAME"), os.Getenv("SENDGRID_FROM_EMAIL"))
	p := mail.NewPersonalization()
	tos := []*mail.Email{
		mail.NewEmail(in["Name"], in["Email"]),
	}
	p.AddTos(tos...)

	p.SetDynamicTemplateData("name", in["Name"])
	p.SetDynamicTemplateData("url", os.Getenv("APP_HOST")+"/change-password/"+in["Token"])
	p.SetDynamicTemplateData("app_name", os.Getenv("APP_NAME"))
	p.SetDynamicTemplateData("cs_email", os.Getenv("CUSTOMERSERVICE_EMAIL"))
	p.SetDynamicTemplateData("cs_phone", os.Getenv("CUSTOMERSERVICE_PHONE"))

	err := email.SendMailV3(from, p, os.Getenv("SENDGRID_TEMPLATE_FORGOT_PASSWORD"))
	if err != nil {
		return status.Errorf(codes.Internal, "send link forgot password: %v", err)
	}
	return nil
}

func CheckStrongPassword(password string) error {
	if len(password) < 10 {
		return status.Error(codes.InvalidArgument, "password min 10 character")
	}

	num := `[0-9]{1}`
	az := `[a-z]{1}`
	AZ := `[A-Z]{1}`
	symbol := `[!@#~$%^&*()+|_]{1}`

	if b, err := regexp.MatchString(num, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need num :%v", err)
	}
	if b, err := regexp.MatchString(az, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need a_z :%v", err)
	}
	if b, err := regexp.MatchString(AZ, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need A_Z :%v", err)
	}
	if b, err := regexp.MatchString(symbol, password); !b || err != nil {
		return status.Errorf(codes.InvalidArgument, "password need symbol :%v", err)
	}

	return nil
}
