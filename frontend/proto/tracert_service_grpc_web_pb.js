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


var alumni_appraiser_message_pb = require('./alumni_appraiser_message_pb.js')

var alumni_message_pb = require('./alumni_message_pb.js')

var generic_message_pb = require('./generic_message_pb.js')

var legalize_message_pb = require('./legalize_message_pb.js')

var question_group_message_pb = require('./question_group_message_pb.js')

var question_message_pb = require('./question_message_pb.js')

var question_option_message_pb = require('./question_option_message_pb.js')

var user_answer_message_pb = require('./user_answer_message_pb.js')

var user_message_pb = require('./user_message_pb.js')
const proto = {};
proto.proto = require('./tracert_service_pb.js');

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
  user_message_pb.LoginInput,
  user_message_pb.User,
  /**
   * @param {!proto.proto.LoginInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_message_pb.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.LoginInput,
 *   !proto.proto.User>}
 */
const methodInfo_TracertService_Login = new grpc.web.AbstractClientBase.MethodInfo(
  user_message_pb.User,
  /**
   * @param {!proto.proto.LoginInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_message_pb.User.deserializeBinary
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
  question_group_message_pb.QuestionGroupListInput,
  question_group_message_pb.QuestionGroupList,
  /**
   * @param {!proto.proto.QuestionGroupListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  question_group_message_pb.QuestionGroupList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.QuestionGroupListInput,
 *   !proto.proto.QuestionGroupList>}
 */
const methodInfo_TracertService_QuestionList = new grpc.web.AbstractClientBase.MethodInfo(
  question_group_message_pb.QuestionGroupList,
  /**
   * @param {!proto.proto.QuestionGroupListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  question_group_message_pb.QuestionGroupList.deserializeBinary
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
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodDescriptor_TracertService_AlumniCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/AlumniCreate',
  grpc.web.MethodType.UNARY,
  alumni_message_pb.Alumni,
  alumni_message_pb.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_message_pb.Alumni.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodInfo_TracertService_AlumniCreate = new grpc.web.AbstractClientBase.MethodInfo(
  alumni_message_pb.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_message_pb.Alumni.deserializeBinary
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
  generic_message_pb.ListInput,
  alumni_message_pb.AlumniListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_message_pb.AlumniListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.AlumniListResponse>}
 */
const methodInfo_TracertService_AlumniList = new grpc.web.AbstractClientBase.MethodInfo(
  alumni_message_pb.AlumniListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_message_pb.AlumniListResponse.deserializeBinary
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
  alumni_message_pb.Alumni,
  alumni_message_pb.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_message_pb.Alumni.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.Alumni,
 *   !proto.proto.Alumni>}
 */
const methodInfo_TracertService_AlumniGet = new grpc.web.AbstractClientBase.MethodInfo(
  alumni_message_pb.Alumni,
  /**
   * @param {!proto.proto.Alumni} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_message_pb.Alumni.deserializeBinary
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
  alumni_appraiser_message_pb.AlumniAppraiser,
  alumni_appraiser_message_pb.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_appraiser_message_pb.AlumniAppraiser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.AlumniAppraiser,
 *   !proto.proto.AlumniAppraiser>}
 */
const methodInfo_TracertService_AlumniAppraiserCreate = new grpc.web.AbstractClientBase.MethodInfo(
  alumni_appraiser_message_pb.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_appraiser_message_pb.AlumniAppraiser.deserializeBinary
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
  generic_message_pb.ListInput,
  alumni_appraiser_message_pb.AlumniAppraiserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_appraiser_message_pb.AlumniAppraiserListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.AlumniAppraiserListResponse>}
 */
const methodInfo_TracertService_AlumniAppraiserList = new grpc.web.AbstractClientBase.MethodInfo(
  alumni_appraiser_message_pb.AlumniAppraiserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_appraiser_message_pb.AlumniAppraiserListResponse.deserializeBinary
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
  alumni_appraiser_message_pb.AlumniAppraiser,
  alumni_appraiser_message_pb.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_appraiser_message_pb.AlumniAppraiser.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.AlumniAppraiser,
 *   !proto.proto.AlumniAppraiser>}
 */
const methodInfo_TracertService_AlumniAppraiserGet = new grpc.web.AbstractClientBase.MethodInfo(
  alumni_appraiser_message_pb.AlumniAppraiser,
  /**
   * @param {!proto.proto.AlumniAppraiser} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  alumni_appraiser_message_pb.AlumniAppraiser.deserializeBinary
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
  user_message_pb.User,
  user_message_pb.User,
  /**
   * @param {!proto.proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_message_pb.User.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.User,
 *   !proto.proto.User>}
 */
const methodInfo_TracertService_UserCreate = new grpc.web.AbstractClientBase.MethodInfo(
  user_message_pb.User,
  /**
   * @param {!proto.proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_message_pb.User.deserializeBinary
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
  generic_message_pb.ListInput,
  user_message_pb.UserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_message_pb.UserListResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.ListInput,
 *   !proto.proto.UserListResponse>}
 */
const methodInfo_TracertService_UserList = new grpc.web.AbstractClientBase.MethodInfo(
  user_message_pb.UserListResponse,
  /**
   * @param {!proto.proto.ListInput} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_message_pb.UserListResponse.deserializeBinary
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
 *   !proto.proto.UserAnswer,
 *   !proto.proto.UserAnswer>}
 */
const methodDescriptor_TracertService_UserAnswerCreate = new grpc.web.MethodDescriptor(
  '/proto.TracertService/UserAnswerCreate',
  grpc.web.MethodType.UNARY,
  user_answer_message_pb.UserAnswer,
  user_answer_message_pb.UserAnswer,
  /**
   * @param {!proto.proto.UserAnswer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_answer_message_pb.UserAnswer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.proto.UserAnswer,
 *   !proto.proto.UserAnswer>}
 */
const methodInfo_TracertService_UserAnswerCreate = new grpc.web.AbstractClientBase.MethodInfo(
  user_answer_message_pb.UserAnswer,
  /**
   * @param {!proto.proto.UserAnswer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  user_answer_message_pb.UserAnswer.deserializeBinary
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


module.exports = proto.proto;

