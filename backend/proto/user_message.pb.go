// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.25.0
// 	protoc        v3.13.0
// source: user_message.proto

package proto

import (
	proto "github.com/golang/protobuf/proto"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
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

type User struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id              uint64           `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Email           string           `protobuf:"bytes,2,opt,name=email,proto3" json:"email,omitempty"`
	Name            string           `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	IsActived       bool             `protobuf:"varint,4,opt,name=is_actived,json=isActived,proto3" json:"is_actived,omitempty"`
	UserType        uint32           `protobuf:"varint,5,opt,name=user_type,json=userType,proto3" json:"user_type,omitempty"`
	Alumni          *Alumni          `protobuf:"bytes,6,opt,name=alumni,proto3" json:"alumni,omitempty"`
	AlumniAppraiser *AlumniAppraiser `protobuf:"bytes,7,opt,name=alumni_appraiser,json=alumniAppraiser,proto3" json:"alumni_appraiser,omitempty"`
	UserAnswer      []*UserAnswer    `protobuf:"bytes,8,rep,name=user_answer,json=userAnswer,proto3" json:"user_answer,omitempty"`
	Created         string           `protobuf:"bytes,9,opt,name=created,proto3" json:"created,omitempty"`
	Updated         string           `protobuf:"bytes,10,opt,name=updated,proto3" json:"updated,omitempty"`
	Token           string           `protobuf:"bytes,11,opt,name=token,proto3" json:"token,omitempty"`
}

func (x *User) Reset() {
	*x = User{}
	if protoimpl.UnsafeEnabled {
		mi := &file_user_message_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *User) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*User) ProtoMessage() {}

func (x *User) ProtoReflect() protoreflect.Message {
	mi := &file_user_message_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use User.ProtoReflect.Descriptor instead.
func (*User) Descriptor() ([]byte, []int) {
	return file_user_message_proto_rawDescGZIP(), []int{0}
}

func (x *User) GetId() uint64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *User) GetEmail() string {
	if x != nil {
		return x.Email
	}
	return ""
}

func (x *User) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *User) GetIsActived() bool {
	if x != nil {
		return x.IsActived
	}
	return false
}

func (x *User) GetUserType() uint32 {
	if x != nil {
		return x.UserType
	}
	return 0
}

func (x *User) GetAlumni() *Alumni {
	if x != nil {
		return x.Alumni
	}
	return nil
}

func (x *User) GetAlumniAppraiser() *AlumniAppraiser {
	if x != nil {
		return x.AlumniAppraiser
	}
	return nil
}

func (x *User) GetUserAnswer() []*UserAnswer {
	if x != nil {
		return x.UserAnswer
	}
	return nil
}

func (x *User) GetCreated() string {
	if x != nil {
		return x.Created
	}
	return ""
}

func (x *User) GetUpdated() string {
	if x != nil {
		return x.Updated
	}
	return ""
}

func (x *User) GetToken() string {
	if x != nil {
		return x.Token
	}
	return ""
}

type UserListResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	User      *User      `protobuf:"bytes,1,opt,name=user,proto3" json:"user,omitempty"`
	ListInput *ListInput `protobuf:"bytes,2,opt,name=list_input,json=listInput,proto3" json:"list_input,omitempty"`
}

func (x *UserListResponse) Reset() {
	*x = UserListResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_user_message_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserListResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserListResponse) ProtoMessage() {}

func (x *UserListResponse) ProtoReflect() protoreflect.Message {
	mi := &file_user_message_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserListResponse.ProtoReflect.Descriptor instead.
func (*UserListResponse) Descriptor() ([]byte, []int) {
	return file_user_message_proto_rawDescGZIP(), []int{1}
}

func (x *UserListResponse) GetUser() *User {
	if x != nil {
		return x.User
	}
	return nil
}

func (x *UserListResponse) GetListInput() *ListInput {
	if x != nil {
		return x.ListInput
	}
	return nil
}

type ChangePassword struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	NewPassword   string `protobuf:"bytes,1,opt,name=new_password,json=newPassword,proto3" json:"new_password,omitempty"`
	ReNewPassword string `protobuf:"bytes,2,opt,name=re_new_password,json=reNewPassword,proto3" json:"re_new_password,omitempty"`
}

func (x *ChangePassword) Reset() {
	*x = ChangePassword{}
	if protoimpl.UnsafeEnabled {
		mi := &file_user_message_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ChangePassword) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ChangePassword) ProtoMessage() {}

func (x *ChangePassword) ProtoReflect() protoreflect.Message {
	mi := &file_user_message_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ChangePassword.ProtoReflect.Descriptor instead.
func (*ChangePassword) Descriptor() ([]byte, []int) {
	return file_user_message_proto_rawDescGZIP(), []int{2}
}

func (x *ChangePassword) GetNewPassword() string {
	if x != nil {
		return x.NewPassword
	}
	return ""
}

func (x *ChangePassword) GetReNewPassword() string {
	if x != nil {
		return x.ReNewPassword
	}
	return ""
}

type LoginInput struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Email    string `protobuf:"bytes,1,opt,name=email,proto3" json:"email,omitempty"`
	Password string `protobuf:"bytes,2,opt,name=password,proto3" json:"password,omitempty"`
}

func (x *LoginInput) Reset() {
	*x = LoginInput{}
	if protoimpl.UnsafeEnabled {
		mi := &file_user_message_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LoginInput) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LoginInput) ProtoMessage() {}

func (x *LoginInput) ProtoReflect() protoreflect.Message {
	mi := &file_user_message_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LoginInput.ProtoReflect.Descriptor instead.
func (*LoginInput) Descriptor() ([]byte, []int) {
	return file_user_message_proto_rawDescGZIP(), []int{3}
}

func (x *LoginInput) GetEmail() string {
	if x != nil {
		return x.Email
	}
	return ""
}

func (x *LoginInput) GetPassword() string {
	if x != nil {
		return x.Password
	}
	return ""
}

type AlumniRegistrationInput struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Alumni      *Alumni      `protobuf:"bytes,1,opt,name=alumni,proto3" json:"alumni,omitempty"`
	User        *User        `protobuf:"bytes,2,opt,name=user,proto3" json:"user,omitempty"`
	Certificate *Certificate `protobuf:"bytes,3,opt,name=certificate,proto3" json:"certificate,omitempty"`
}

func (x *AlumniRegistrationInput) Reset() {
	*x = AlumniRegistrationInput{}
	if protoimpl.UnsafeEnabled {
		mi := &file_user_message_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AlumniRegistrationInput) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AlumniRegistrationInput) ProtoMessage() {}

func (x *AlumniRegistrationInput) ProtoReflect() protoreflect.Message {
	mi := &file_user_message_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AlumniRegistrationInput.ProtoReflect.Descriptor instead.
func (*AlumniRegistrationInput) Descriptor() ([]byte, []int) {
	return file_user_message_proto_rawDescGZIP(), []int{4}
}

func (x *AlumniRegistrationInput) GetAlumni() *Alumni {
	if x != nil {
		return x.Alumni
	}
	return nil
}

func (x *AlumniRegistrationInput) GetUser() *User {
	if x != nil {
		return x.User
	}
	return nil
}

func (x *AlumniRegistrationInput) GetCertificate() *Certificate {
	if x != nil {
		return x.Certificate
	}
	return nil
}

var File_user_message_proto protoreflect.FileDescriptor

var file_user_message_proto_rawDesc = []byte{
	0x0a, 0x12, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x14, 0x61, 0x6c, 0x75,
	0x6d, 0x6e, 0x69, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x1e, 0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x5f, 0x61, 0x70, 0x70, 0x72, 0x61, 0x69,
	0x73, 0x65, 0x72, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x19, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x61, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x5f, 0x6d,
	0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x15, 0x67, 0x65,
	0x6e, 0x65, 0x72, 0x69, 0x63, 0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x19, 0x63, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65,
	0x5f, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xe4,
	0x02, 0x0a, 0x04, 0x55, 0x73, 0x65, 0x72, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x04, 0x52, 0x02, 0x69, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c, 0x12, 0x12, 0x0a,
	0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x12, 0x1d, 0x0a, 0x0a, 0x69, 0x73, 0x5f, 0x61, 0x63, 0x74, 0x69, 0x76, 0x65, 0x64, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x08, 0x52, 0x09, 0x69, 0x73, 0x41, 0x63, 0x74, 0x69, 0x76, 0x65, 0x64,
	0x12, 0x1b, 0x0a, 0x09, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x74, 0x79, 0x70, 0x65, 0x18, 0x05, 0x20,
	0x01, 0x28, 0x0d, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72, 0x54, 0x79, 0x70, 0x65, 0x12, 0x25, 0x0a,
	0x06, 0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x41, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x52, 0x06, 0x61, 0x6c,
	0x75, 0x6d, 0x6e, 0x69, 0x12, 0x41, 0x0a, 0x10, 0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x5f, 0x61,
	0x70, 0x70, 0x72, 0x61, 0x69, 0x73, 0x65, 0x72, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x16,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x41, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x41, 0x70, 0x70,
	0x72, 0x61, 0x69, 0x73, 0x65, 0x72, 0x52, 0x0f, 0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x41, 0x70,
	0x70, 0x72, 0x61, 0x69, 0x73, 0x65, 0x72, 0x12, 0x32, 0x0a, 0x0b, 0x75, 0x73, 0x65, 0x72, 0x5f,
	0x61, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x18, 0x08, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x41, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x52,
	0x0a, 0x75, 0x73, 0x65, 0x72, 0x41, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x12, 0x18, 0x0a, 0x07, 0x63,
	0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x18, 0x09, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x63, 0x72,
	0x65, 0x61, 0x74, 0x65, 0x64, 0x12, 0x18, 0x0a, 0x07, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64,
	0x18, 0x0a, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64, 0x12,
	0x14, 0x0a, 0x05, 0x74, 0x6f, 0x6b, 0x65, 0x6e, 0x18, 0x0b, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05,
	0x74, 0x6f, 0x6b, 0x65, 0x6e, 0x22, 0x64, 0x0a, 0x10, 0x55, 0x73, 0x65, 0x72, 0x4c, 0x69, 0x73,
	0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1f, 0x0a, 0x04, 0x75, 0x73, 0x65,
	0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e,
	0x55, 0x73, 0x65, 0x72, 0x52, 0x04, 0x75, 0x73, 0x65, 0x72, 0x12, 0x2f, 0x0a, 0x0a, 0x6c, 0x69,
	0x73, 0x74, 0x5f, 0x69, 0x6e, 0x70, 0x75, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x70, 0x75, 0x74,
	0x52, 0x09, 0x6c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x70, 0x75, 0x74, 0x22, 0x5b, 0x0a, 0x0e, 0x43,
	0x68, 0x61, 0x6e, 0x67, 0x65, 0x50, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x12, 0x21, 0x0a,
	0x0c, 0x6e, 0x65, 0x77, 0x5f, 0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x0b, 0x6e, 0x65, 0x77, 0x50, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64,
	0x12, 0x26, 0x0a, 0x0f, 0x72, 0x65, 0x5f, 0x6e, 0x65, 0x77, 0x5f, 0x70, 0x61, 0x73, 0x73, 0x77,
	0x6f, 0x72, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0d, 0x72, 0x65, 0x4e, 0x65, 0x77,
	0x50, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x22, 0x3e, 0x0a, 0x0a, 0x4c, 0x6f, 0x67, 0x69,
	0x6e, 0x49, 0x6e, 0x70, 0x75, 0x74, 0x12, 0x14, 0x0a, 0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x65, 0x6d, 0x61, 0x69, 0x6c, 0x12, 0x1a, 0x0a, 0x08,
	0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08,
	0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64, 0x22, 0x97, 0x01, 0x0a, 0x17, 0x41, 0x6c, 0x75,
	0x6d, 0x6e, 0x69, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x49,
	0x6e, 0x70, 0x75, 0x74, 0x12, 0x25, 0x0a, 0x06, 0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x41, 0x6c, 0x75,
	0x6d, 0x6e, 0x69, 0x52, 0x06, 0x61, 0x6c, 0x75, 0x6d, 0x6e, 0x69, 0x12, 0x1f, 0x0a, 0x04, 0x75,
	0x73, 0x65, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0b, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x04, 0x75, 0x73, 0x65, 0x72, 0x12, 0x34, 0x0a, 0x0b,
	0x63, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x12, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x43, 0x65, 0x72, 0x74, 0x69, 0x66,
	0x69, 0x63, 0x61, 0x74, 0x65, 0x52, 0x0b, 0x63, 0x65, 0x72, 0x74, 0x69, 0x66, 0x69, 0x63, 0x61,
	0x74, 0x65, 0x42, 0x09, 0x5a, 0x07, 0x2e, 0x3b, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_user_message_proto_rawDescOnce sync.Once
	file_user_message_proto_rawDescData = file_user_message_proto_rawDesc
)

func file_user_message_proto_rawDescGZIP() []byte {
	file_user_message_proto_rawDescOnce.Do(func() {
		file_user_message_proto_rawDescData = protoimpl.X.CompressGZIP(file_user_message_proto_rawDescData)
	})
	return file_user_message_proto_rawDescData
}

var file_user_message_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_user_message_proto_goTypes = []interface{}{
	(*User)(nil),                    // 0: proto.User
	(*UserListResponse)(nil),        // 1: proto.UserListResponse
	(*ChangePassword)(nil),          // 2: proto.ChangePassword
	(*LoginInput)(nil),              // 3: proto.LoginInput
	(*AlumniRegistrationInput)(nil), // 4: proto.AlumniRegistrationInput
	(*Alumni)(nil),                  // 5: proto.Alumni
	(*AlumniAppraiser)(nil),         // 6: proto.AlumniAppraiser
	(*UserAnswer)(nil),              // 7: proto.UserAnswer
	(*ListInput)(nil),               // 8: proto.ListInput
	(*Certificate)(nil),             // 9: proto.Certificate
}
var file_user_message_proto_depIdxs = []int32{
	5, // 0: proto.User.alumni:type_name -> proto.Alumni
	6, // 1: proto.User.alumni_appraiser:type_name -> proto.AlumniAppraiser
	7, // 2: proto.User.user_answer:type_name -> proto.UserAnswer
	0, // 3: proto.UserListResponse.user:type_name -> proto.User
	8, // 4: proto.UserListResponse.list_input:type_name -> proto.ListInput
	5, // 5: proto.AlumniRegistrationInput.alumni:type_name -> proto.Alumni
	0, // 6: proto.AlumniRegistrationInput.user:type_name -> proto.User
	9, // 7: proto.AlumniRegistrationInput.certificate:type_name -> proto.Certificate
	8, // [8:8] is the sub-list for method output_type
	8, // [8:8] is the sub-list for method input_type
	8, // [8:8] is the sub-list for extension type_name
	8, // [8:8] is the sub-list for extension extendee
	0, // [0:8] is the sub-list for field type_name
}

func init() { file_user_message_proto_init() }
func file_user_message_proto_init() {
	if File_user_message_proto != nil {
		return
	}
	file_alumni_message_proto_init()
	file_alumni_appraiser_message_proto_init()
	file_user_answer_message_proto_init()
	file_generic_message_proto_init()
	file_certificate_message_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_user_message_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*User); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_user_message_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserListResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_user_message_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ChangePassword); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_user_message_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LoginInput); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_user_message_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AlumniRegistrationInput); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_user_message_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_user_message_proto_goTypes,
		DependencyIndexes: file_user_message_proto_depIdxs,
		MessageInfos:      file_user_message_proto_msgTypes,
	}.Build()
	File_user_message_proto = out.File
	file_user_message_proto_rawDesc = nil
	file_user_message_proto_goTypes = nil
	file_user_message_proto_depIdxs = nil
}
