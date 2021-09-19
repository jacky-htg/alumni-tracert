/**
 * @fileoverview gRPC-Web generated client stub for proto
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.proto = require('./single-proto_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.TracertServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.proto.TracertServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.LoginInput,
 *   !proto.proto.User>}
 */
const methodDescriptor_TracertService_Login = new grpc.web.MethodDescriptor(
  '/proto.TracertService/Login',
  grpc.web.MethodType.UNARY,
  proto.proto.LoginInput,
  proto.proto.User,
  /**
   * @param {!proto.proto.LoginInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.LoginInput,
 *   !proto.proto.User>}
 */
const methodInfo_TracertService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.User,
  /**
   * @param {!proto.proto.LoginInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.User.deserializeBinary
);


/**
 * @param {!proto.proto.LoginInput} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/Login',
      request,
      metadata || {},
      methodDescriptor_TracertService_Login,
      callback);
};


/**
 * @param {!proto.proto.LoginInput} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.User>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/Login',
      request,
      metadata || {},
      methodDescriptor_TracertService_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.QuestionGroupListInput,
 *   !proto.proto.QuestionGroupList>}
 */
const methodDescriptor_TracertService_QuestionList = new grpc.web.MethodDescriptor(
  '/proto.TracertService/QuestionList',
  grpc.web.MethodType.UNARY,
  proto.proto.QuestionGroupListInput,
  proto.proto.QuestionGroupList,
  /**
   * @param {!proto.proto.QuestionGroupListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.QuestionGroupList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.QuestionGroupListInput,
 *   !proto.proto.QuestionGroupList>}
 */
const methodInfo_TracertService_QuestionList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.QuestionGroupList,
  /**
   * @param {!proto.proto.QuestionGroupListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.QuestionGroupList.deserializeBinary
);


/**
 * @param {!proto.proto.QuestionGroupListInput} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.QuestionGroupList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.QuestionGroupList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.questionList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/QuestionList',
      request,
      metadata || {},
      methodDescriptor_TracertService_QuestionList,
      callback);
};


/**
 * @param {!proto.proto.QuestionGroupListInput} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.QuestionGroupList>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.questionList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/QuestionList',
      request,
      metadata || {},
      methodDescriptor_TracertService_QuestionList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.AlumniRegistrationInput,
 *   !proto.proto.AlumniRegistrationInput>}
 */
const methodDescriptor_TracertService_AlumniRegistration = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniRegistration',
  grpc.web.MethodType.UNARY,
  proto.proto.AlumniRegistrationInput,
  proto.proto.AlumniRegistrationInput,
  /**
   * @param {!proto.proto.AlumniRegistrationInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniRegistrationInput.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.AlumniRegistrationInput,
 *   !proto.proto.AlumniRegistrationInput>}
 */
const methodInfo_TracertService_AlumniRegistration = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.AlumniRegistrationInput,
  /**
   * @param {!proto.proto.AlumniRegistrationInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniRegistrationInput.deserializeBinary
);


/**
 * @param {!proto.proto.AlumniRegistrationInput} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.AlumniRegistrationInput)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniRegistrationInput>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniRegistration =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/AlumniRegistration',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniRegistration,
      callback);
};


/**
 * @param {!proto.proto.AlumniRegistrationInput} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.AlumniRegistrationInput>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.alumniRegistration =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/AlumniRegistration',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniRegistration);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Certificate,
 *   !proto.proto.Certificate>}
 */
const methodDescriptor_TracertService_CertificateCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/CertificateCreate',
  grpc.web.MethodType.UNARY,
  proto.proto.Certificate,
  proto.proto.Certificate,
  /**
   * @param {!proto.proto.Certificate} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Certificate.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Certificate,
 *   !proto.proto.Certificate>}
 */
const methodInfo_TracertService_CertificateCreate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Certificate,
  /**
   * @param {!proto.proto.Certificate} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Certificate.deserializeBinary
);


/**
 * @param {!proto.proto.Certificate} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Certificate)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Certificate>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.certificateCreate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/CertificateCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_CertificateCreate,
      callback);
};


/**
 * @param {!proto.proto.Certificate} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Certificate>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.certificateCreate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/CertificateCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_CertificateCreate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodDescriptor_TracertService_AlumniCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniCreate',
  grpc.web.MethodType.UNARY,
  proto.proto.Alumni,
  proto.proto.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Alumni.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodInfo_TracertService_AlumniCreate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Alumni.deserializeBinary
);


/**
 * @param {!proto.proto.Alumni} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Alumni)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Alumni>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniCreate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/AlumniCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniCreate,
      callback);
};


/**
 * @param {!proto.proto.Alumni} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Alumni>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.alumniCreate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/AlumniCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniCreate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.ListInput,
 *   !proto.proto.AlumniListResponse>}
 */
const methodDescriptor_TracertService_AlumniList = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniList',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.ListInput,
  proto.proto.AlumniListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.AlumniListResponse>}
 */
const methodInfo_TracertService_AlumniList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.AlumniListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniListResponse.deserializeBinary
);


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/AlumniList',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniList);
};


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServicePromiseClient.prototype.alumniList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/AlumniList',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodDescriptor_TracertService_AlumniGet = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniGet',
  grpc.web.MethodType.UNARY,
  proto.proto.Alumni,
  proto.proto.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Alumni.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodInfo_TracertService_AlumniGet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Alumni.deserializeBinary
);


/**
 * @param {!proto.proto.Alumni} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Alumni)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Alumni>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniGet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/AlumniGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniGet,
      callback);
};


/**
 * @param {!proto.proto.Alumni} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Alumni>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.alumniGet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/AlumniGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniGet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.AlumniAppraiser,
 *   !proto.proto.AlumniAppraiser>}
 */
const methodDescriptor_TracertService_AlumniAppraiserCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniAppraiserCreate',
  grpc.web.MethodType.UNARY,
  proto.proto.AlumniAppraiser,
  proto.proto.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniAppraiser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.AlumniAppraiser,
 *   !proto.proto.AlumniAppraiser>}
 */
const methodInfo_TracertService_AlumniAppraiserCreate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniAppraiser.deserializeBinary
);


/**
 * @param {!proto.proto.AlumniAppraiser} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.AlumniAppraiser)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniAppraiser>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniAppraiserCreate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/AlumniAppraiserCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniAppraiserCreate,
      callback);
};


/**
 * @param {!proto.proto.AlumniAppraiser} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.AlumniAppraiser>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.alumniAppraiserCreate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/AlumniAppraiserCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniAppraiserCreate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.ListInput,
 *   !proto.proto.AlumniAppraiserListResponse>}
 */
const methodDescriptor_TracertService_AlumniAppraiserList = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniAppraiserList',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.ListInput,
  proto.proto.AlumniAppraiserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniAppraiserListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.AlumniAppraiserListResponse>}
 */
const methodInfo_TracertService_AlumniAppraiserList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.AlumniAppraiserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniAppraiserListResponse.deserializeBinary
);


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniAppraiserListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniAppraiserList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/AlumniAppraiserList',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniAppraiserList);
};


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniAppraiserListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServicePromiseClient.prototype.alumniAppraiserList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/AlumniAppraiserList',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniAppraiserList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.AlumniAppraiser,
 *   !proto.proto.AlumniAppraiser>}
 */
const methodDescriptor_TracertService_AlumniAppraiserGet = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniAppraiserGet',
  grpc.web.MethodType.UNARY,
  proto.proto.AlumniAppraiser,
  proto.proto.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniAppraiser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.AlumniAppraiser,
 *   !proto.proto.AlumniAppraiser>}
 */
const methodInfo_TracertService_AlumniAppraiserGet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.AlumniAppraiser.deserializeBinary
);


/**
 * @param {!proto.proto.AlumniAppraiser} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.AlumniAppraiser)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.AlumniAppraiser>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.alumniAppraiserGet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/AlumniAppraiserGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniAppraiserGet,
      callback);
};


/**
 * @param {!proto.proto.AlumniAppraiser} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.AlumniAppraiser>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.alumniAppraiserGet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/AlumniAppraiserGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_AlumniAppraiserGet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.User,
 *   !proto.proto.User>}
 */
const methodDescriptor_TracertService_UserCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/UserCreate',
  grpc.web.MethodType.UNARY,
  proto.proto.User,
  proto.proto.User,
  /**
   * @param {!proto.proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.User,
 *   !proto.proto.User>}
 */
const methodInfo_TracertService_UserCreate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.User,
  /**
   * @param {!proto.proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.User.deserializeBinary
);


/**
 * @param {!proto.proto.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.userCreate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/UserCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserCreate,
      callback);
};


/**
 * @param {!proto.proto.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.User>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.userCreate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/UserCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserCreate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.ListInput,
 *   !proto.proto.UserListResponse>}
 */
const methodDescriptor_TracertService_UserList = new grpc.web.MethodDescriptor(
  '/proto.TracertService/UserList',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.ListInput,
  proto.proto.UserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.UserListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.UserListResponse>}
 */
const methodInfo_TracertService_UserList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.UserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.UserListResponse.deserializeBinary
);


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.UserListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.userList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/UserList',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserList);
};


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.UserListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServicePromiseClient.prototype.userList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/UserList',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.User,
 *   !proto.proto.User>}
 */
const methodDescriptor_TracertService_UserGet = new grpc.web.MethodDescriptor(
  '/proto.TracertService/UserGet',
  grpc.web.MethodType.UNARY,
  proto.proto.User,
  proto.proto.User,
  /**
   * @param {!proto.proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.User,
 *   !proto.proto.User>}
 */
const methodInfo_TracertService_UserGet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.User,
  /**
   * @param {!proto.proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.User.deserializeBinary
);


/**
 * @param {!proto.proto.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.userGet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/UserGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserGet,
      callback);
};


/**
 * @param {!proto.proto.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.User>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.userGet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/UserGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserGet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.StringMessage,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeCheck = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeCheck',
  grpc.web.MethodType.UNARY,
  proto.proto.StringMessage,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.StringMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.StringMessage,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeCheck = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.StringMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.StringMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeCheck =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeCheck',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeCheck,
      callback);
};


/**
 * @param {!proto.proto.StringMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeCheck =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeCheck',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeCheck);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeUpload = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeUpload',
  grpc.web.MethodType.UNARY,
  proto.proto.Legalize,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeUpload = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeUpload =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeUpload',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeUpload,
      callback);
};


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeUpload =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeUpload',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeUpload);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.ListInput,
 *   !proto.proto.LegalizeListResponse>}
 */
const methodDescriptor_TracertService_LegalizeList = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeList',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.proto.ListInput,
  proto.proto.LegalizeListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.LegalizeListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.LegalizeListResponse>}
 */
const methodInfo_TracertService_LegalizeList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.LegalizeListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.LegalizeListResponse.deserializeBinary
);


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.LegalizeListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/LegalizeList',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeList);
};


/**
 * @param {!proto.proto.ListInput} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.proto.LegalizeListResponse>}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/proto.TracertService/LegalizeList',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeGet = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeGet',
  grpc.web.MethodType.UNARY,
  proto.proto.Legalize,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeGet = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeGet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeGet,
      callback);
};


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeGet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeGet',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeGet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.EmptyMessage,
 *   !proto.proto.Certificates>}
 */
const methodDescriptor_TracertService_LegalizeGetOwn = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeGetOwn',
  grpc.web.MethodType.UNARY,
  proto.proto.EmptyMessage,
  proto.proto.Certificates,
  /**
   * @param {!proto.proto.EmptyMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Certificates.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.EmptyMessage,
 *   !proto.proto.Certificates>}
 */
const methodInfo_TracertService_LegalizeGetOwn = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Certificates,
  /**
   * @param {!proto.proto.EmptyMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Certificates.deserializeBinary
);


/**
 * @param {!proto.proto.EmptyMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Certificates)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Certificates>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeGetOwn =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeGetOwn',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeGetOwn,
      callback);
};


/**
 * @param {!proto.proto.EmptyMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Certificates>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeGetOwn =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeGetOwn',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeGetOwn);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeDone = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeDone',
  grpc.web.MethodType.UNARY,
  proto.proto.Legalize,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeDone = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeDone =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeDone',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeDone,
      callback);
};


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeDone =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeDone',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeDone);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.StringMessage,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeVerified = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeVerified',
  grpc.web.MethodType.UNARY,
  proto.proto.StringMessage,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.StringMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.StringMessage,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeVerified = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.StringMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.StringMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeVerified =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeVerified',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeVerified,
      callback);
};


/**
 * @param {!proto.proto.StringMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeVerified =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeVerified',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeVerified);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeRejected = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeRejected',
  grpc.web.MethodType.UNARY,
  proto.proto.Legalize,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Legalize,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeRejected = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeRejected =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeRejected',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeRejected,
      callback);
};


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeRejected =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeRejected',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeRejected);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.StringMessage,
 *   !proto.proto.Legalize>}
 */
const methodDescriptor_TracertService_LegalizeApproved = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeApproved',
  grpc.web.MethodType.UNARY,
  proto.proto.StringMessage,
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.StringMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.StringMessage,
 *   !proto.proto.Legalize>}
 */
const methodInfo_TracertService_LegalizeApproved = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Legalize,
  /**
   * @param {!proto.proto.StringMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Legalize.deserializeBinary
);


/**
 * @param {!proto.proto.StringMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Legalize)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Legalize>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeApproved =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeApproved',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeApproved,
      callback);
};


/**
 * @param {!proto.proto.StringMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Legalize>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeApproved =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeApproved',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeApproved);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Legalize,
 *   !proto.proto.StringMessage>}
 */
const methodDescriptor_TracertService_LegalizeRating = new grpc.web.MethodDescriptor(
  '/proto.TracertService/LegalizeRating',
  grpc.web.MethodType.UNARY,
  proto.proto.Legalize,
  proto.proto.StringMessage,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.StringMessage.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Legalize,
 *   !proto.proto.StringMessage>}
 */
const methodInfo_TracertService_LegalizeRating = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.StringMessage,
  /**
   * @param {!proto.proto.Legalize} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.StringMessage.deserializeBinary
);


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.StringMessage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.StringMessage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.legalizeRating =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/LegalizeRating',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeRating,
      callback);
};


/**
 * @param {!proto.proto.Legalize} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.StringMessage>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.legalizeRating =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/LegalizeRating',
      request,
      metadata || {},
      methodDescriptor_TracertService_LegalizeRating);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.UserAnswer,
 *   !proto.proto.UserAnswer>}
 */
const methodDescriptor_TracertService_UserAnswerCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/UserAnswerCreate',
  grpc.web.MethodType.UNARY,
  proto.proto.UserAnswer,
  proto.proto.UserAnswer,
  /**
   * @param {!proto.proto.UserAnswer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.UserAnswer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.UserAnswer,
 *   !proto.proto.UserAnswer>}
 */
const methodInfo_TracertService_UserAnswerCreate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.UserAnswer,
  /**
   * @param {!proto.proto.UserAnswer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.UserAnswer.deserializeBinary
);


/**
 * @param {!proto.proto.UserAnswer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.UserAnswer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.UserAnswer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.userAnswerCreate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/UserAnswerCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserAnswerCreate,
      callback);
};


/**
 * @param {!proto.proto.UserAnswer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.UserAnswer>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.userAnswerCreate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/UserAnswerCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_UserAnswerCreate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.Tracer,
 *   !proto.proto.Tracer>}
 */
const methodDescriptor_TracertService_TracerCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/TracerCreate',
  grpc.web.MethodType.UNARY,
  proto.proto.Tracer,
  proto.proto.Tracer,
  /**
   * @param {!proto.proto.Tracer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Tracer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Tracer,
 *   !proto.proto.Tracer>}
 */
const methodInfo_TracertService_TracerCreate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.Tracer,
  /**
   * @param {!proto.proto.Tracer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.Tracer.deserializeBinary
);


/**
 * @param {!proto.proto.Tracer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.Tracer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.Tracer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.tracerCreate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/TracerCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_TracerCreate,
      callback);
};


/**
 * @param {!proto.proto.Tracer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.Tracer>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.tracerCreate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/TracerCreate',
      request,
      metadata || {},
      methodDescriptor_TracertService_TracerCreate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.proto.EmptyMessage,
 *   !proto.proto.TracerList>}
 */
const methodDescriptor_TracertService_GetTrace = new grpc.web.MethodDescriptor(
  '/proto.TracertService/GetTrace',
  grpc.web.MethodType.UNARY,
  proto.proto.EmptyMessage,
  proto.proto.TracerList,
  /**
   * @param {!proto.proto.EmptyMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.TracerList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.EmptyMessage,
 *   !proto.proto.TracerList>}
 */
const methodInfo_TracertService_GetTrace = new grpc.web.AbstractClientBase.MethodInfo(
  proto.proto.TracerList,
  /**
   * @param {!proto.proto.EmptyMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.proto.TracerList.deserializeBinary
);


/**
 * @param {!proto.proto.EmptyMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.proto.TracerList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.proto.TracerList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.proto.TracertServiceClient.prototype.getTrace =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/proto.TracertService/GetTrace',
      request,
      metadata || {},
      methodDescriptor_TracertService_GetTrace,
      callback);
};


/**
 * @param {!proto.proto.EmptyMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.proto.TracerList>}
 *     Promise that resolves to the response
 */
proto.proto.TracertServicePromiseClient.prototype.getTrace =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/proto.TracertService/GetTrace',
      request,
      metadata || {},
      methodDescriptor_TracertService_GetTrace);
};


module.exports = proto.proto;

