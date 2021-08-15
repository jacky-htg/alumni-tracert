package validation

import (
	"context"
	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Alumni struct {
	Model model.Alumni
}

func (u *Alumni) Create(ctx context.Context, in *proto.Alumni) error {
	if len(in.Nik) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid NIK")
	}
	if len(in.PlaceOfBirth) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid place of birth")
	}
	if len(in.DateOfBirth) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid date of birth")
	}
	if len(in.Phone) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid phone")
	}

	return nil
}
