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
	if len(in.Nim) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid NIM")
	}
	if len(in.Nik) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid NIK")
	}
	if len(in.PlaceOfBirth) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid place of birth")
	}
	if len(in.DateOfBirth) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid date of birth")
	}
	if len(in.MajorStudy) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid major study")
	}
	if in.GraduationYear <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid graduation year")
	}
	if len(in.NoIjazah) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid no ijazah")
	}
	if len(in.Phone) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid phone")
	}

	return nil
}
