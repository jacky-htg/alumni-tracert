package validation

import (
	"context"
	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type Certificate struct {
	Model model.Certificate
}

func (u *Certificate) Create(ctx context.Context, in *proto.Certificate) error {
	if len(in.Nim) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid NIM")
	}
	if len(in.MajorStudy) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid major study")
	}
	if in.EntryYear <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid entry year")
	}
	if in.GraduationYear <= 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid graduation year")
	}
	if len(in.NoIjazah) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid no ijazah")
	}

	return nil
}
