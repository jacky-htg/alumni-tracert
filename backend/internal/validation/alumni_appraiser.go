package validation

import (
	"context"
	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type AlumniAppraiser struct {
	Model model.AlumniAppraiser
}

func (u *AlumniAppraiser) Create(ctx context.Context, in *proto.AlumniAppraiser) error {
	if len(in.Name) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid Name")
	}
	if len(in.Instansi) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid Instansi")
	}
	if len(in.Position) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid Position")
	}
	if len(in.AlumniPosition) == 0 {
		return status.Error(codes.InvalidArgument, "Please supply valid Alumni Position")
	}

	return nil
}
