package service

import (
	"context"
	"os"
	"time"

	"tracert/internal/model"
	"tracert/internal/pkg/email"
	"tracert/internal/pkg/token"
	"tracert/internal/pkg/util"
	"tracert/internal/validation"
	"tracert/proto"

	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) UserCreate(ctx context.Context, in *proto.User) (*proto.User, error) {
	select {
	case <-ctx.Done():
		return nil, util.ContextError(ctx)
	default:
	}

	if err := new(validation.User).Create(ctx, in); err != nil {
		util.LogError(u.Log, "validation on create user", err)
		return nil, err
	}

	var userModel model.User
	userModel.Pb.Email = in.Email
	userModel.Pb.Name = in.Name
	userModel.Pb.UserType = in.UserType

	userModel.Password = util.GenerateRandomPassword()
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
		return nil, status.Errorf(codes.Internal, "send new account email: %v", err)
	}
	return &userModel.Pb, nil
}

func (u *AlumniTracertServer) UserList(in *proto.ListInput, stream proto.TracertService_UserListServer) error {
	ctx := stream.Context()

	select {
	case <-ctx.Done():
		return util.ContextError(ctx)
	default:
	}

	ctx, err := util.GetMetadata(ctx)
	if err != nil {
		util.LogError(u.Log, "Get metadata on list user", err)
		return err
	}

	var userModel model.User
	query, paramQueries, listResponse, err := userModel.ListQuery(ctx, u.Db, in)

	rows, err := u.Db.QueryContext(ctx, query, paramQueries...)
	if err != nil {
		util.LogError(u.Log, "Query Context on list user", err)
		return status.Error(codes.Internal, err.Error())
	}
	defer rows.Close()
	listResponse = in

	for rows.Next() {
		err := util.ContextError(ctx)
		if err != nil {
			util.LogError(u.Log, "Context Error on looping list user", err)
			return err
		}

		var createdAt, updatedAt time.Time
		var pbUser proto.User
		err = rows.Scan(
			&pbUser.Id, &pbUser.Email, &pbUser.Name, &pbUser.IsActived, &pbUser.UserType, &createdAt, &updatedAt,
		)
		if err != nil {
			util.LogError(u.Log, "scan on looping list user", err)
			return status.Errorf(codes.Internal, "scan data: %v", err)
		}

		pbUser.Created = createdAt.String()
		pbUser.Updated = updatedAt.String()

		res := &proto.UserListResponse{
			ListInput: listResponse,
			User:      &pbUser,
		}

		err = stream.Send(res)
		if err != nil {
			util.LogError(u.Log, "send stream on looping list user", err)
			return status.Errorf(codes.Unknown, "cannot send stream response: %v", err)
		}
	}

	return nil
}
