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


module.exports = proto.proto;

