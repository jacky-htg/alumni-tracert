import * as grpcWeb from 'grpc-web';

import * as single$proto_pb from './single-proto_pb';


export class TracertServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  login(
    request: single$proto_pb.LoginInput,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.User) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.User>;

  forgotPassword(
    request: single$proto_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.StringMessage) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.StringMessage>;

  resetPassword(
    request: single$proto_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.StringMessage) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.StringMessage>;

  changePassword(
    request: single$proto_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.StringMessage) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.StringMessage>;

  questionList(
    request: single$proto_pb.QuestionGroupListInput,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.QuestionGroupList) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.QuestionGroupList>;

  alumniRegistration(
    request: single$proto_pb.AlumniRegistrationInput,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.AlumniRegistrationInput) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniRegistrationInput>;

  certificateCreate(
    request: single$proto_pb.Certificate,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Certificate) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Certificate>;

  alumniCreate(
    request: single$proto_pb.Alumni,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Alumni) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Alumni>;

  alumniList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniListResponse>;

  alumniGet(
    request: single$proto_pb.Alumni,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Alumni) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Alumni>;

  alumniAppraiserCreate(
    request: single$proto_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.AlumniAppraiser) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniAppraiser>;

  alumniAppraiserList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniAppraiserListResponse>;

  alumniAppraiserGet(
    request: single$proto_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.AlumniAppraiser) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniAppraiser>;

  userCreate(
    request: single$proto_pb.User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.User) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.User>;

  userList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.UserListResponse>;

  userGet(
    request: single$proto_pb.User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.User) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.User>;

  legalizeCheck(
    request: single$proto_pb.StringMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeUpload(
    request: single$proto_pb.Legalize,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.LegalizeListResponse>;

  legalizeGet(
    request: single$proto_pb.Legalize,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeGetOwn(
    request: single$proto_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Certificates) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Certificates>;

  legalizeDone(
    request: single$proto_pb.Legalize,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeVerified(
    request: single$proto_pb.StringMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeRejected(
    request: single$proto_pb.Legalize,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeApproved(
    request: single$proto_pb.StringMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  legalizeRating(
    request: single$proto_pb.Legalize,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.StringMessage) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.StringMessage>;

  legalizeExtended(
    request: single$proto_pb.Legalize,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Legalize) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Legalize>;

  userAnswerCreate(
    request: single$proto_pb.UserAnswer,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.UserAnswer) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.UserAnswer>;

  tracerCreate(
    request: single$proto_pb.Tracer,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Tracer) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Tracer>;

  getTrace(
    request: single$proto_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.TracerList) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.TracerList>;

  getLastTrace(
    request: single$proto_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: single$proto_pb.Tracer) => void
  ): grpcWeb.ClientReadableStream<single$proto_pb.Tracer>;

}

export class TracertServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  login(
    request: single$proto_pb.LoginInput,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.User>;

  forgotPassword(
    request: single$proto_pb.ForgotPasswordRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.StringMessage>;

  resetPassword(
    request: single$proto_pb.ResetPasswordRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.StringMessage>;

  changePassword(
    request: single$proto_pb.ChangePasswordRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.StringMessage>;

  questionList(
    request: single$proto_pb.QuestionGroupListInput,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.QuestionGroupList>;

  alumniRegistration(
    request: single$proto_pb.AlumniRegistrationInput,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.AlumniRegistrationInput>;

  certificateCreate(
    request: single$proto_pb.Certificate,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Certificate>;

  alumniCreate(
    request: single$proto_pb.Alumni,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Alumni>;

  alumniList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniListResponse>;

  alumniGet(
    request: single$proto_pb.Alumni,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Alumni>;

  alumniAppraiserCreate(
    request: single$proto_pb.AlumniAppraiser,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.AlumniAppraiser>;

  alumniAppraiserList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.AlumniAppraiserListResponse>;

  alumniAppraiserGet(
    request: single$proto_pb.AlumniAppraiser,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.AlumniAppraiser>;

  userCreate(
    request: single$proto_pb.User,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.User>;

  userList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.UserListResponse>;

  userGet(
    request: single$proto_pb.User,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.User>;

  legalizeCheck(
    request: single$proto_pb.StringMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeUpload(
    request: single$proto_pb.Legalize,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeList(
    request: single$proto_pb.ListInput,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<single$proto_pb.LegalizeListResponse>;

  legalizeGet(
    request: single$proto_pb.Legalize,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeGetOwn(
    request: single$proto_pb.EmptyMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Certificates>;

  legalizeDone(
    request: single$proto_pb.Legalize,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeVerified(
    request: single$proto_pb.StringMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeRejected(
    request: single$proto_pb.Legalize,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeApproved(
    request: single$proto_pb.StringMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  legalizeRating(
    request: single$proto_pb.Legalize,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.StringMessage>;

  legalizeExtended(
    request: single$proto_pb.Legalize,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Legalize>;

  userAnswerCreate(
    request: single$proto_pb.UserAnswer,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.UserAnswer>;

  tracerCreate(
    request: single$proto_pb.Tracer,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Tracer>;

  getTrace(
    request: single$proto_pb.EmptyMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.TracerList>;

  getLastTrace(
    request: single$proto_pb.EmptyMessage,
    metadata?: grpcWeb.Metadata
  ): Promise<single$proto_pb.Tracer>;

}

