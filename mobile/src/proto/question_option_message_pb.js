// source: question_option_message.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.proto.QuestionOption', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.proto.QuestionOption = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.QuestionOption, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.QuestionOption.displayName = 'proto.proto.QuestionOption';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.proto.QuestionOption.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.QuestionOption.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.QuestionOption} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionOption.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    questionId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    title: jspb.Message.getFieldWithDefault(msg, 3, ""),
    isNeedEssay: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    created: jspb.Message.getFieldWithDefault(msg, 5, ""),
    updated: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.proto.QuestionOption}
 */
proto.proto.QuestionOption.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.QuestionOption;
  return proto.proto.QuestionOption.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.QuestionOption} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.QuestionOption}
 */
proto.proto.QuestionOption.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setQuestionId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsNeedEssay(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreated(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setUpdated(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.proto.QuestionOption.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.QuestionOption.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.QuestionOption} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionOption.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getQuestionId();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getIsNeedEssay();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getCreated();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getUpdated();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.proto.QuestionOption.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.QuestionOption} returns this
 */
proto.proto.QuestionOption.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 question_id = 2;
 * @return {number}
 */
proto.proto.QuestionOption.prototype.getQuestionId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.QuestionOption} returns this
 */
proto.proto.QuestionOption.prototype.setQuestionId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string title = 3;
 * @return {string}
 */
proto.proto.QuestionOption.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.QuestionOption} returns this
 */
proto.proto.QuestionOption.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool is_need_essay = 4;
 * @return {boolean}
 */
proto.proto.QuestionOption.prototype.getIsNeedEssay = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.proto.QuestionOption} returns this
 */
proto.proto.QuestionOption.prototype.setIsNeedEssay = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional string created = 5;
 * @return {string}
 */
proto.proto.QuestionOption.prototype.getCreated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.QuestionOption} returns this
 */
proto.proto.QuestionOption.prototype.setCreated = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string updated = 6;
 * @return {string}
 */
proto.proto.QuestionOption.prototype.getUpdated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.QuestionOption} returns this
 */
proto.proto.QuestionOption.prototype.setUpdated = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


goog.object.extend(exports, proto.proto);