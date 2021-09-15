import * as jspb from 'google-protobuf'

import * as alumni_message_pb from './alumni_message_pb';
import * as alumni_appraiser_message_pb from './alumni_appraiser_message_pb';
import * as user_answer_message_pb from './user_answer_message_pb';
import * as generic_message_pb from './generic_message_pb';
import * as certificate_message_pb from './certificate_message_pb';


export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getEmail(): string;
  setEmail(value: string): User;

  getName(): string;
  setName(value: string): User;

  getIsActived(): boolean;
  setIsActived(value: boolean): User;

  getUserType(): number;
  setUserType(value: number): User;

  getAlumni(): alumni_message_pb.Alumni | undefined;
  setAlumni(value?: alumni_message_pb.Alumni): User;
  hasAlumni(): boolean;
  clearAlumni(): User;

  getAlumniAppraiser(): alumni_appraiser_message_pb.AlumniAppraiser | undefined;
  setAlumniAppraiser(value?: alumni_appraiser_message_pb.AlumniAppraiser): User;
  hasAlumniAppraiser(): boolean;
  clearAlumniAppraiser(): User;

  getUserAnswerList(): Array<user_answer_message_pb.UserAnswer>;
  setUserAnswerList(value: Array<user_answer_message_pb.UserAnswer>): User;
  clearUserAnswerList(): User;
  addUserAnswer(value?: user_answer_message_pb.UserAnswer, index?: number): user_answer_message_pb.UserAnswer;

  getCreated(): string;
  setCreated(value: string): User;

  getUpdated(): string;
  setUpdated(value: string): User;

  getToken(): string;
  setToken(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    email: string,
    name: string,
    isActived: boolean,
    userType: number,
    alumni?: alumni_message_pb.Alumni.AsObject,
    alumniAppraiser?: alumni_appraiser_message_pb.AlumniAppraiser.AsObject,
    userAnswerList: Array<user_answer_message_pb.UserAnswer.AsObject>,
    created: string,
    updated: string,
    token: string,
  }
}

export class UserListResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): UserListResponse;
  hasUser(): boolean;
  clearUser(): UserListResponse;

  getListInput(): generic_message_pb.ListInput | undefined;
  setListInput(value?: generic_message_pb.ListInput): UserListResponse;
  hasListInput(): boolean;
  clearListInput(): UserListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserListResponse): UserListResponse.AsObject;
  static serializeBinaryToWriter(message: UserListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserListResponse;
  static deserializeBinaryFromReader(message: UserListResponse, reader: jspb.BinaryReader): UserListResponse;
}

export namespace UserListResponse {
  export type AsObject = {
    user?: User.AsObject,
    listInput?: generic_message_pb.ListInput.AsObject,
  }
}

export class ChangePassword extends jspb.Message {
  getNewPassword(): string;
  setNewPassword(value: string): ChangePassword;

  getReNewPassword(): string;
  setReNewPassword(value: string): ChangePassword;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePassword.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePassword): ChangePassword.AsObject;
  static serializeBinaryToWriter(message: ChangePassword, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePassword;
  static deserializeBinaryFromReader(message: ChangePassword, reader: jspb.BinaryReader): ChangePassword;
}

export namespace ChangePassword {
  export type AsObject = {
    newPassword: string,
    reNewPassword: string,
  }
}

export class LoginInput extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginInput;

  getPassword(): string;
  setPassword(value: string): LoginInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginInput.AsObject;
  static toObject(includeInstance: boolean, msg: LoginInput): LoginInput.AsObject;
  static serializeBinaryToWriter(message: LoginInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginInput;
  static deserializeBinaryFromReader(message: LoginInput, reader: jspb.BinaryReader): LoginInput;
}

export namespace LoginInput {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class AlumniRegistrationInput extends jspb.Message {
  getAlumni(): alumni_message_pb.Alumni | undefined;
  setAlumni(value?: alumni_message_pb.Alumni): AlumniRegistrationInput;
  hasAlumni(): boolean;
  clearAlumni(): AlumniRegistrationInput;

  getUser(): User | undefined;
  setUser(value?: User): AlumniRegistrationInput;
  hasUser(): boolean;
  clearUser(): AlumniRegistrationInput;

  getCertificate(): certificate_message_pb.Certificate | undefined;
  setCertificate(value?: certificate_message_pb.Certificate): AlumniRegistrationInput;
  hasCertificate(): boolean;
  clearCertificate(): AlumniRegistrationInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlumniRegistrationInput.AsObject;
  static toObject(includeInstance: boolean, msg: AlumniRegistrationInput): AlumniRegistrationInput.AsObject;
  static serializeBinaryToWriter(message: AlumniRegistrationInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlumniRegistrationInput;
  static deserializeBinaryFromReader(message: AlumniRegistrationInput, reader: jspb.BinaryReader): AlumniRegistrationInput;
}

export namespace AlumniRegistrationInput {
  export type AsObject = {
    alumni?: alumni_message_pb.Alumni.AsObject,
    user?: User.AsObject,
    certificate?: certificate_message_pb.Certificate.AsObject,
  }
}

