// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0
// 	protoc        v3.13.0
// source: tracert_service.proto

package proto

import (
	context "context"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

var File_tracert_service_proto protoreflect.FileDescriptor

var file_tracert_service_proto_rawDesc = []byte{
	0x0a, 0x15, 0x74, 0x72, 0x61, 0x63, 0x65, 0x72, 0x74, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1e,
	0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x5f, 0x61, 0x70, 0x70, 0x72, 0x61, 0x69, 0x73, 0x65, 0x72,
	0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x14,
	0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x15, 0x67, 0x65, 0x6e, 0x65, 0x72, 0x69, 0x63, 0x5f, 0x6d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x16, 0x6c, 0x65, 0x67,
	0x61, 0x6c, 0x69, 0x7a, 0x65, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x1c, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x67, 0x72,
	0x6f, 0x75, 0x70, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x16, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x6d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1d, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x69, 0x6f, 0x6e, 0x5f, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61,
	0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x19, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x61,
	0x6e, 0x73, 0x77, 0x65, 0x72, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x12, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x32, 0x85, 0x01, 0x0a, 0x0e, 0x54, 0x72, 0x61, 0x63,
	0x65, 0x72, 0x74, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x32, 0x0a, 0x05, 0x4c, 0x6f,
	0x67, 0x69, 0x6e, 0x12, 0x11, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x4c, 0x6f, 0x67, 0x69,
	0x6e, 0x49, 0x6e, 0x70, 0x75, 0x74, 0x1a, 0x14, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x53,
	0x74, 0x72, 0x69, 0x6e, 0x67, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x00, 0x12, 0x3f,
	0x0a, 0x0c, 0x51, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x4c, 0x69, 0x73, 0x74, 0x12, 0x13,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x1a, 0x18, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x51, 0x75, 0x65, 0x73,
	0x74, 0x69, 0x6f, 0x6e, 0x47, 0x72, 0x6f, 0x75, 0x70, 0x4c, 0x69, 0x73, 0x74, 0x22, 0x00, 0x42,
	0x09, 0x5a, 0x07, 0x2e, 0x3b, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var file_tracert_service_proto_goTypes = []interface{}{
	(*LoginInput)(nil),        // 0: proto.LoginInput
	(*EmptyMessage)(nil),      // 1: proto.EmptyMessage
	(*StringMessage)(nil),     // 2: proto.StringMessage
	(*QuestionGroupList)(nil), // 3: proto.QuestionGroupList
}
var file_tracert_service_proto_depIdxs = []int32{
	0, // 0: proto.TracertService.Login:input_type -> proto.LoginInput
	1, // 1: proto.TracertService.QuestionList:input_type -> proto.EmptyMessage
	2, // 2: proto.TracertService.Login:output_type -> proto.StringMessage
	3, // 3: proto.TracertService.QuestionList:output_type -> proto.QuestionGroupList
	2, // [2:4] is the sub-list for method output_type
	0, // [0:2] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_tracert_service_proto_init() }
func file_tracert_service_proto_init() {
	if File_tracert_service_proto != nil {
		return
	}
	file_alumni_appraiser_message_proto_init()
	file_alumni_message_proto_init()
	file_generic_message_proto_init()
	file_legalize_message_proto_init()
	file_question_group_message_proto_init()
	file_question_message_proto_init()
	file_question_option_message_proto_init()
	file_user_answer_message_proto_init()
	file_user_message_proto_init()
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_tracert_service_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_tracert_service_proto_goTypes,
		DependencyIndexes: file_tracert_service_proto_depIdxs,
	}.Build()
	File_tracert_service_proto = out.File
	file_tracert_service_proto_rawDesc = nil
	file_tracert_service_proto_goTypes = nil
	file_tracert_service_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// TracertServiceClient is the client API for TracertService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type TracertServiceClient interface {
	Login(ctx context.Context, in *LoginInput, opts ...grpc.CallOption) (*StringMessage, error)
	QuestionList(ctx context.Context, in *EmptyMessage, opts ...grpc.CallOption) (*QuestionGroupList, error)
}

type tracertServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTracertServiceClient(cc grpc.ClientConnInterface) TracertServiceClient {
	return &tracertServiceClient{cc}
}

func (c *tracertServiceClient) Login(ctx context.Context, in *LoginInput, opts ...grpc.CallOption) (*StringMessage, error) {
	out := new(StringMessage)
	err := c.cc.Invoke(ctx, "/proto.TracertService/Login", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *tracertServiceClient) QuestionList(ctx context.Context, in *EmptyMessage, opts ...grpc.CallOption) (*QuestionGroupList, error) {
	out := new(QuestionGroupList)
	err := c.cc.Invoke(ctx, "/proto.TracertService/QuestionList", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TracertServiceServer is the server API for TracertService service.
type TracertServiceServer interface {
	Login(context.Context, *LoginInput) (*StringMessage, error)
	QuestionList(context.Context, *EmptyMessage) (*QuestionGroupList, error)
}

// UnimplementedTracertServiceServer can be embedded to have forward compatible implementations.
type UnimplementedTracertServiceServer struct {
}

func (*UnimplementedTracertServiceServer) Login(context.Context, *LoginInput) (*StringMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Login not implemented")
}
func (*UnimplementedTracertServiceServer) QuestionList(context.Context, *EmptyMessage) (*QuestionGroupList, error) {
	return nil, status.Errorf(codes.Unimplemented, "method QuestionList not implemented")
}

func RegisterTracertServiceServer(s *grpc.Server, srv TracertServiceServer) {
	s.RegisterService(&_TracertService_serviceDesc, srv)
}

func _TracertService_Login_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LoginInput)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TracertServiceServer).Login(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.TracertService/Login",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TracertServiceServer).Login(ctx, req.(*LoginInput))
	}
	return interceptor(ctx, in, info, handler)
}

func _TracertService_QuestionList_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(EmptyMessage)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TracertServiceServer).QuestionList(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/proto.TracertService/QuestionList",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TracertServiceServer).QuestionList(ctx, req.(*EmptyMessage))
	}
	return interceptor(ctx, in, info, handler)
}

var _TracertService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "proto.TracertService",
	HandlerType: (*TracertServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Login",
			Handler:    _TracertService_Login_Handler,
		},
		{
			MethodName: "QuestionList",
			Handler:    _TracertService_QuestionList_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "tracert_service.proto",
}
