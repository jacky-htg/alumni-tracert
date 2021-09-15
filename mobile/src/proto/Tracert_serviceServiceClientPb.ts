/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as generic_message_pb from './generic_message_pb';
import * as legalize_message_pb from './legalize_message_pb';
import * as certificate_message_pb from './certificate_message_pb';
import * as alumni_message_pb from './alumni_message_pb';
import * as alumni_appraiser_message_pb from './alumni_appraiser_message_pb';
import * as auth_message_pb from './auth_message_pb';
import * as question_group_message_pb from './question_group_message_pb';
import * as user_answer_message_pb from './user_answer_message_pb';
import * as user_message_pb from './user_message_pb';


export class TracertServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    user_message_pb.User,
    (request: user_message_pb.LoginInput) => {
      return request.serializeBinary();
    },
    user_message_pb.User.deserializeBinary
  );

  login(
    request: user_message_pb.LoginInput,
    metadata: grpcWeb.Metadata | null): Promise<user_message_pb.User>;

  login(
    request: user_message_pb.LoginInput,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_message_pb.User) => void): grpcWeb.ClientReadableStream<user_message_pb.User>;

  login(
    request: user_message_pb.LoginInput,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_message_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoForgotPassword = new grpcWeb.AbstractClientBase.MethodInfo(
    generic_message_pb.StringMessage,
    (request: auth_message_pb.ForgotPasswordRequest) => {
      return request.serializeBinary();
    },
    generic_message_pb.StringMessage.deserializeBinary
  );

  forgotPassword(
    request: auth_message_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<generic_message_pb.StringMessage>;

  forgotPassword(
    request: auth_message_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void): grpcWeb.ClientReadableStream<generic_message_pb.StringMessage>;

  forgotPassword(
    request: auth_message_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/ForgotPassword',
        request,
        metadata || {},
        this.methodInfoForgotPassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/ForgotPassword',
    request,
    metadata || {},
    this.methodInfoForgotPassword);
  }

  methodInfoResetPassword = new grpcWeb.AbstractClientBase.MethodInfo(
    generic_message_pb.StringMessage,
    (request: auth_message_pb.ResetPasswordRequest) => {
      return request.serializeBinary();
    },
    generic_message_pb.StringMessage.deserializeBinary
  );

  resetPassword(
    request: auth_message_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<generic_message_pb.StringMessage>;

  resetPassword(
    request: auth_message_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void): grpcWeb.ClientReadableStream<generic_message_pb.StringMessage>;

  resetPassword(
    request: auth_message_pb.ResetPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/ResetPassword',
        request,
        metadata || {},
        this.methodInfoResetPassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/ResetPassword',
    request,
    metadata || {},
    this.methodInfoResetPassword);
  }

  methodInfoChangePassword = new grpcWeb.AbstractClientBase.MethodInfo(
    generic_message_pb.StringMessage,
    (request: auth_message_pb.ChangePasswordRequest) => {
      return request.serializeBinary();
    },
    generic_message_pb.StringMessage.deserializeBinary
  );

  changePassword(
    request: auth_message_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<generic_message_pb.StringMessage>;

  changePassword(
    request: auth_message_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void): grpcWeb.ClientReadableStream<generic_message_pb.StringMessage>;

  changePassword(
    request: auth_message_pb.ChangePasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/ChangePassword',
        request,
        metadata || {},
        this.methodInfoChangePassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/ChangePassword',
    request,
    metadata || {},
    this.methodInfoChangePassword);
  }

  methodInfoQuestionList = new grpcWeb.AbstractClientBase.MethodInfo(
    question_group_message_pb.QuestionGroupList,
    (request: question_group_message_pb.QuestionGroupListInput) => {
      return request.serializeBinary();
    },
    question_group_message_pb.QuestionGroupList.deserializeBinary
  );

  questionList(
    request: question_group_message_pb.QuestionGroupListInput,
    metadata: grpcWeb.Metadata | null): Promise<question_group_message_pb.QuestionGroupList>;

  questionList(
    request: question_group_message_pb.QuestionGroupListInput,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: question_group_message_pb.QuestionGroupList) => void): grpcWeb.ClientReadableStream<question_group_message_pb.QuestionGroupList>;

  questionList(
    request: question_group_message_pb.QuestionGroupListInput,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: question_group_message_pb.QuestionGroupList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/QuestionList',
        request,
        metadata || {},
        this.methodInfoQuestionList,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/QuestionList',
    request,
    metadata || {},
    this.methodInfoQuestionList);
  }

  methodInfoAlumniRegistration = new grpcWeb.AbstractClientBase.MethodInfo(
    user_message_pb.AlumniRegistrationInput,
    (request: user_message_pb.AlumniRegistrationInput) => {
      return request.serializeBinary();
    },
    user_message_pb.AlumniRegistrationInput.deserializeBinary
  );

  alumniRegistration(
    request: user_message_pb.AlumniRegistrationInput,
    metadata: grpcWeb.Metadata | null): Promise<user_message_pb.AlumniRegistrationInput>;

  alumniRegistration(
    request: user_message_pb.AlumniRegistrationInput,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_message_pb.AlumniRegistrationInput) => void): grpcWeb.ClientReadableStream<user_message_pb.AlumniRegistrationInput>;

  alumniRegistration(
    request: user_message_pb.AlumniRegistrationInput,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_message_pb.AlumniRegistrationInput) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/AlumniRegistration',
        request,
        metadata || {},
        this.methodInfoAlumniRegistration,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/AlumniRegistration',
    request,
    metadata || {},
    this.methodInfoAlumniRegistration);
  }

  methodInfoCertificateCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    certificate_message_pb.Certificate,
    (request: certificate_message_pb.Certificate) => {
      return request.serializeBinary();
    },
    certificate_message_pb.Certificate.deserializeBinary
  );

  certificateCreate(
    request: certificate_message_pb.Certificate,
    metadata: grpcWeb.Metadata | null): Promise<certificate_message_pb.Certificate>;

  certificateCreate(
    request: certificate_message_pb.Certificate,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: certificate_message_pb.Certificate) => void): grpcWeb.ClientReadableStream<certificate_message_pb.Certificate>;

  certificateCreate(
    request: certificate_message_pb.Certificate,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: certificate_message_pb.Certificate) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/CertificateCreate',
        request,
        metadata || {},
        this.methodInfoCertificateCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/CertificateCreate',
    request,
    metadata || {},
    this.methodInfoCertificateCreate);
  }

  methodInfoAlumniCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    alumni_message_pb.Alumni,
    (request: alumni_message_pb.Alumni) => {
      return request.serializeBinary();
    },
    alumni_message_pb.Alumni.deserializeBinary
  );

  alumniCreate(
    request: alumni_message_pb.Alumni,
    metadata: grpcWeb.Metadata | null): Promise<alumni_message_pb.Alumni>;

  alumniCreate(
    request: alumni_message_pb.Alumni,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: alumni_message_pb.Alumni) => void): grpcWeb.ClientReadableStream<alumni_message_pb.Alumni>;

  alumniCreate(
    request: alumni_message_pb.Alumni,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: alumni_message_pb.Alumni) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/AlumniCreate',
        request,
        metadata || {},
        this.methodInfoAlumniCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/AlumniCreate',
    request,
    metadata || {},
    this.methodInfoAlumniCreate);
  }

  methodInfoAlumniList = new grpcWeb.AbstractClientBase.MethodInfo(
    alumni_message_pb.AlumniListResponse,
    (request: generic_message_pb.ListInput) => {
      return request.serializeBinary();
    },
    alumni_message_pb.AlumniListResponse.deserializeBinary
  );

  alumniList(
    request: generic_message_pb.ListInput,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/proto.TracertService/AlumniList',
      request,
      metadata || {},
      this.methodInfoAlumniList);
  }

  methodInfoAlumniGet = new grpcWeb.AbstractClientBase.MethodInfo(
    alumni_message_pb.Alumni,
    (request: alumni_message_pb.Alumni) => {
      return request.serializeBinary();
    },
    alumni_message_pb.Alumni.deserializeBinary
  );

  alumniGet(
    request: alumni_message_pb.Alumni,
    metadata: grpcWeb.Metadata | null): Promise<alumni_message_pb.Alumni>;

  alumniGet(
    request: alumni_message_pb.Alumni,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: alumni_message_pb.Alumni) => void): grpcWeb.ClientReadableStream<alumni_message_pb.Alumni>;

  alumniGet(
    request: alumni_message_pb.Alumni,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: alumni_message_pb.Alumni) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/AlumniGet',
        request,
        metadata || {},
        this.methodInfoAlumniGet,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/AlumniGet',
    request,
    metadata || {},
    this.methodInfoAlumniGet);
  }

  methodInfoAlumniAppraiserCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    alumni_appraiser_message_pb.AlumniAppraiser,
    (request: alumni_appraiser_message_pb.AlumniAppraiser) => {
      return request.serializeBinary();
    },
    alumni_appraiser_message_pb.AlumniAppraiser.deserializeBinary
  );

  alumniAppraiserCreate(
    request: alumni_appraiser_message_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | null): Promise<alumni_appraiser_message_pb.AlumniAppraiser>;

  alumniAppraiserCreate(
    request: alumni_appraiser_message_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: alumni_appraiser_message_pb.AlumniAppraiser) => void): grpcWeb.ClientReadableStream<alumni_appraiser_message_pb.AlumniAppraiser>;

  alumniAppraiserCreate(
    request: alumni_appraiser_message_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: alumni_appraiser_message_pb.AlumniAppraiser) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/AlumniAppraiserCreate',
        request,
        metadata || {},
        this.methodInfoAlumniAppraiserCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/AlumniAppraiserCreate',
    request,
    metadata || {},
    this.methodInfoAlumniAppraiserCreate);
  }

  methodInfoAlumniAppraiserList = new grpcWeb.AbstractClientBase.MethodInfo(
    alumni_appraiser_message_pb.AlumniAppraiserListResponse,
    (request: generic_message_pb.ListInput) => {
      return request.serializeBinary();
    },
    alumni_appraiser_message_pb.AlumniAppraiserListResponse.deserializeBinary
  );

  alumniAppraiserList(
    request: generic_message_pb.ListInput,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/proto.TracertService/AlumniAppraiserList',
      request,
      metadata || {},
      this.methodInfoAlumniAppraiserList);
  }

  methodInfoAlumniAppraiserGet = new grpcWeb.AbstractClientBase.MethodInfo(
    alumni_appraiser_message_pb.AlumniAppraiser,
    (request: alumni_appraiser_message_pb.AlumniAppraiser) => {
      return request.serializeBinary();
    },
    alumni_appraiser_message_pb.AlumniAppraiser.deserializeBinary
  );

  alumniAppraiserGet(
    request: alumni_appraiser_message_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | null): Promise<alumni_appraiser_message_pb.AlumniAppraiser>;

  alumniAppraiserGet(
    request: alumni_appraiser_message_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: alumni_appraiser_message_pb.AlumniAppraiser) => void): grpcWeb.ClientReadableStream<alumni_appraiser_message_pb.AlumniAppraiser>;

  alumniAppraiserGet(
    request: alumni_appraiser_message_pb.AlumniAppraiser,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: alumni_appraiser_message_pb.AlumniAppraiser) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/AlumniAppraiserGet',
        request,
        metadata || {},
        this.methodInfoAlumniAppraiserGet,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/AlumniAppraiserGet',
    request,
    metadata || {},
    this.methodInfoAlumniAppraiserGet);
  }

  methodInfoUserCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    user_message_pb.User,
    (request: user_message_pb.User) => {
      return request.serializeBinary();
    },
    user_message_pb.User.deserializeBinary
  );

  userCreate(
    request: user_message_pb.User,
    metadata: grpcWeb.Metadata | null): Promise<user_message_pb.User>;

  userCreate(
    request: user_message_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_message_pb.User) => void): grpcWeb.ClientReadableStream<user_message_pb.User>;

  userCreate(
    request: user_message_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_message_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/UserCreate',
        request,
        metadata || {},
        this.methodInfoUserCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/UserCreate',
    request,
    metadata || {},
    this.methodInfoUserCreate);
  }

  methodInfoUserList = new grpcWeb.AbstractClientBase.MethodInfo(
    user_message_pb.UserListResponse,
    (request: generic_message_pb.ListInput) => {
      return request.serializeBinary();
    },
    user_message_pb.UserListResponse.deserializeBinary
  );

  userList(
    request: generic_message_pb.ListInput,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/proto.TracertService/UserList',
      request,
      metadata || {},
      this.methodInfoUserList);
  }

  methodInfoUserGet = new grpcWeb.AbstractClientBase.MethodInfo(
    user_message_pb.User,
    (request: user_message_pb.User) => {
      return request.serializeBinary();
    },
    user_message_pb.User.deserializeBinary
  );

  userGet(
    request: user_message_pb.User,
    metadata: grpcWeb.Metadata | null): Promise<user_message_pb.User>;

  userGet(
    request: user_message_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_message_pb.User) => void): grpcWeb.ClientReadableStream<user_message_pb.User>;

  userGet(
    request: user_message_pb.User,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_message_pb.User) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/UserGet',
        request,
        metadata || {},
        this.methodInfoUserGet,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/UserGet',
    request,
    metadata || {},
    this.methodInfoUserGet);
  }

  methodInfoLegalizeCheck = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: generic_message_pb.StringMessage) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeCheck(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeCheck(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeCheck(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeCheck',
        request,
        metadata || {},
        this.methodInfoLegalizeCheck,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeCheck',
    request,
    metadata || {},
    this.methodInfoLegalizeCheck);
  }

  methodInfoLegalizeUpload = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: legalize_message_pb.Legalize) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeUpload(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeUpload(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeUpload(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeUpload',
        request,
        metadata || {},
        this.methodInfoLegalizeUpload,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeUpload',
    request,
    metadata || {},
    this.methodInfoLegalizeUpload);
  }

  methodInfoLegalizeList = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.LegalizeListResponse,
    (request: generic_message_pb.ListInput) => {
      return request.serializeBinary();
    },
    legalize_message_pb.LegalizeListResponse.deserializeBinary
  );

  legalizeList(
    request: generic_message_pb.ListInput,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/proto.TracertService/LegalizeList',
      request,
      metadata || {},
      this.methodInfoLegalizeList);
  }

  methodInfoLegalizeGet = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: legalize_message_pb.Legalize) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeGet(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeGet(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeGet(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeGet',
        request,
        metadata || {},
        this.methodInfoLegalizeGet,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeGet',
    request,
    metadata || {},
    this.methodInfoLegalizeGet);
  }

  methodInfoLegalizeGetOwn = new grpcWeb.AbstractClientBase.MethodInfo(
    certificate_message_pb.Certificates,
    (request: generic_message_pb.EmptyMessage) => {
      return request.serializeBinary();
    },
    certificate_message_pb.Certificates.deserializeBinary
  );

  legalizeGetOwn(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null): Promise<certificate_message_pb.Certificates>;

  legalizeGetOwn(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: certificate_message_pb.Certificates) => void): grpcWeb.ClientReadableStream<certificate_message_pb.Certificates>;

  legalizeGetOwn(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: certificate_message_pb.Certificates) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeGetOwn',
        request,
        metadata || {},
        this.methodInfoLegalizeGetOwn,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeGetOwn',
    request,
    metadata || {},
    this.methodInfoLegalizeGetOwn);
  }

  methodInfoLegalizeDone = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: legalize_message_pb.Legalize) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeDone(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeDone(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeDone(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeDone',
        request,
        metadata || {},
        this.methodInfoLegalizeDone,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeDone',
    request,
    metadata || {},
    this.methodInfoLegalizeDone);
  }

  methodInfoLegalizeVerified = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: generic_message_pb.StringMessage) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeVerified(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeVerified(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeVerified(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeVerified',
        request,
        metadata || {},
        this.methodInfoLegalizeVerified,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeVerified',
    request,
    metadata || {},
    this.methodInfoLegalizeVerified);
  }

  methodInfoLegalizeRejected = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: legalize_message_pb.Legalize) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeRejected(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeRejected(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeRejected(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeRejected',
        request,
        metadata || {},
        this.methodInfoLegalizeRejected,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeRejected',
    request,
    metadata || {},
    this.methodInfoLegalizeRejected);
  }

  methodInfoLegalizeApproved = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: generic_message_pb.StringMessage) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeApproved(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeApproved(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeApproved(
    request: generic_message_pb.StringMessage,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeApproved',
        request,
        metadata || {},
        this.methodInfoLegalizeApproved,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeApproved',
    request,
    metadata || {},
    this.methodInfoLegalizeApproved);
  }

  methodInfoLegalizeRating = new grpcWeb.AbstractClientBase.MethodInfo(
    generic_message_pb.StringMessage,
    (request: legalize_message_pb.Legalize) => {
      return request.serializeBinary();
    },
    generic_message_pb.StringMessage.deserializeBinary
  );

  legalizeRating(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null): Promise<generic_message_pb.StringMessage>;

  legalizeRating(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void): grpcWeb.ClientReadableStream<generic_message_pb.StringMessage>;

  legalizeRating(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: generic_message_pb.StringMessage) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeRating',
        request,
        metadata || {},
        this.methodInfoLegalizeRating,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeRating',
    request,
    metadata || {},
    this.methodInfoLegalizeRating);
  }

  methodInfoLegalizeExtended = new grpcWeb.AbstractClientBase.MethodInfo(
    legalize_message_pb.Legalize,
    (request: legalize_message_pb.Legalize) => {
      return request.serializeBinary();
    },
    legalize_message_pb.Legalize.deserializeBinary
  );

  legalizeExtended(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null): Promise<legalize_message_pb.Legalize>;

  legalizeExtended(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void): grpcWeb.ClientReadableStream<legalize_message_pb.Legalize>;

  legalizeExtended(
    request: legalize_message_pb.Legalize,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: legalize_message_pb.Legalize) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/LegalizeExtended',
        request,
        metadata || {},
        this.methodInfoLegalizeExtended,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/LegalizeExtended',
    request,
    metadata || {},
    this.methodInfoLegalizeExtended);
  }

  methodInfoUserAnswerCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    user_answer_message_pb.UserAnswer,
    (request: user_answer_message_pb.UserAnswer) => {
      return request.serializeBinary();
    },
    user_answer_message_pb.UserAnswer.deserializeBinary
  );

  userAnswerCreate(
    request: user_answer_message_pb.UserAnswer,
    metadata: grpcWeb.Metadata | null): Promise<user_answer_message_pb.UserAnswer>;

  userAnswerCreate(
    request: user_answer_message_pb.UserAnswer,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_answer_message_pb.UserAnswer) => void): grpcWeb.ClientReadableStream<user_answer_message_pb.UserAnswer>;

  userAnswerCreate(
    request: user_answer_message_pb.UserAnswer,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_answer_message_pb.UserAnswer) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/UserAnswerCreate',
        request,
        metadata || {},
        this.methodInfoUserAnswerCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/UserAnswerCreate',
    request,
    metadata || {},
    this.methodInfoUserAnswerCreate);
  }

  methodInfoTracerCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    user_answer_message_pb.Tracer,
    (request: user_answer_message_pb.Tracer) => {
      return request.serializeBinary();
    },
    user_answer_message_pb.Tracer.deserializeBinary
  );

  tracerCreate(
    request: user_answer_message_pb.Tracer,
    metadata: grpcWeb.Metadata | null): Promise<user_answer_message_pb.Tracer>;

  tracerCreate(
    request: user_answer_message_pb.Tracer,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_answer_message_pb.Tracer) => void): grpcWeb.ClientReadableStream<user_answer_message_pb.Tracer>;

  tracerCreate(
    request: user_answer_message_pb.Tracer,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_answer_message_pb.Tracer) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/TracerCreate',
        request,
        metadata || {},
        this.methodInfoTracerCreate,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/TracerCreate',
    request,
    metadata || {},
    this.methodInfoTracerCreate);
  }

  methodInfoGetTrace = new grpcWeb.AbstractClientBase.MethodInfo(
    user_answer_message_pb.TracerList,
    (request: generic_message_pb.EmptyMessage) => {
      return request.serializeBinary();
    },
    user_answer_message_pb.TracerList.deserializeBinary
  );

  getTrace(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null): Promise<user_answer_message_pb.TracerList>;

  getTrace(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_answer_message_pb.TracerList) => void): grpcWeb.ClientReadableStream<user_answer_message_pb.TracerList>;

  getTrace(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_answer_message_pb.TracerList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/GetTrace',
        request,
        metadata || {},
        this.methodInfoGetTrace,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/GetTrace',
    request,
    metadata || {},
    this.methodInfoGetTrace);
  }

  methodInfoGetLastTrace = new grpcWeb.AbstractClientBase.MethodInfo(
    user_answer_message_pb.Tracer,
    (request: generic_message_pb.EmptyMessage) => {
      return request.serializeBinary();
    },
    user_answer_message_pb.Tracer.deserializeBinary
  );

  getLastTrace(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null): Promise<user_answer_message_pb.Tracer>;

  getLastTrace(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_answer_message_pb.Tracer) => void): grpcWeb.ClientReadableStream<user_answer_message_pb.Tracer>;

  getLastTrace(
    request: generic_message_pb.EmptyMessage,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_answer_message_pb.Tracer) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.TracertService/GetLastTrace',
        request,
        metadata || {},
        this.methodInfoGetLastTrace,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.TracertService/GetLastTrace',
    request,
    metadata || {},
    this.methodInfoGetLastTrace);
  }

}

