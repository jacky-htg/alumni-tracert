package service

import (
	"context"
	"os"

	"tracert/internal/model"
	"tracert/internal/pkg/email"
	"tracert/internal/pkg/token"
	"tracert/proto"

	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) UserCreate(ctx context.Context, in *proto.User) (*proto.User, error) {
	if len(in.Email) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid email")
	}
	if len(in.Name) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid name")
	}
	if in.UserType < 1 || in.UserType > 2 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid user type")
	}

	var userModel model.User
	userModel.Pb.Email = in.Email
	userModel.Pb.Name = in.Name
	userModel.Pb.UserType = in.UserType

	userModel.Password = generateRandomPassword()
	err := userModel.Create(ctx, u.Db)
	if err != nil {
		return nil, err
	}

	token, err := token.ClaimToken(userModel.Pb.Email)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "claim token: %v", err)
	}

	userModel.Pb.Token = token

	// send email registration info
	from := mail.NewEmail(os.Getenv("SENDGRID_FROM_NAME"), os.Getenv("SENDGRID_FROM_EMAIL"))
	p := mail.NewPersonalization()
	tos := []*mail.Email{
		mail.NewEmail(userModel.Pb.GetName(), userModel.Pb.GetEmail()),
	}
	p.AddTos(tos...)

	p.SetDynamicTemplateData("name", userModel.Pb.GetName())
	p.SetDynamicTemplateData("username", userModel.Pb.Email)
	p.SetDynamicTemplateData("password", userModel.Password)
	p.SetDynamicTemplateData("app_name", os.Getenv("APP_NAME"))
	p.SetDynamicTemplateData("cs_email", os.Getenv("CUSTOMERSERVICE_EMAIL"))
	p.SetDynamicTemplateData("cs_phone", os.Getenv("CUSTOMERSERVICE_PHONE"))

	err = email.SendMailV3(from, p, os.Getenv("SENDGRID_TEMPLATE_NEW_USER"))
	if err != nil {
		// return nil, status.Errorf(codes.Internal, "send new account email: %v", err)
		println(err)
	}
	return &userModel.Pb, nil
}
