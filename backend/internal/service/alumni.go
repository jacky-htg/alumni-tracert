package service

import (
	"context"

	"tracert/internal/model"
	"tracert/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (u *AlumniTracertServer) AlumniCreate(ctx context.Context, in *proto.Alumni) (*proto.Alumni, error) {
	if len(in.Nim) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid NIM")
	}
	if len(in.Nik) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid NIK")
	}
	if len(in.PlaceOfBirth) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid place of birth")
	}
	if len(in.DateOfBirth) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid date of birth")
	}
	if len(in.MajorStudy) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid major study")
	}
	if in.GraduationYear <= 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid graduation year")
	}
	if len(in.NoIjazah) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid no ijazah")
	}
	if len(in.Phone) == 0 {
		return nil, status.Error(codes.InvalidArgument, "Please supply valid phone")
	}

	var alumniModel model.Alumni
	alumniModel.Pb.Nim = in.Nim
	alumniModel.Pb.Nik = in.Nik
	alumniModel.Pb.PlaceOfBirth = in.PlaceOfBirth
	alumniModel.Pb.Nim = in.Nim
	alumniModel.Pb.Nim = in.Nim
	alumniModel.Pb.Nim = in.Nim
	alumniModel.Pb.Nim = in.Nim
	alumniModel.Pb.Nim = in.Nim

	/*err := alumniModel.Create(ctx, u.Db)
	if err != nil {
		return nil, err
	}*/

	return &alumniModel.Pb, nil
}
