// source: alumni_message.proto
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

var generic_message_pb = require('./generic_message_pb.js');
goog.object.extend(proto, generic_message_pb);
var certificate_message_pb = require('./certificate_message_pb.js');
goog.object.extend(proto, certificate_message_pb);
goog.exportSymbol('proto.proto.Alumni', null, global);
goog.exportSymbol('proto.proto.AlumniListResponse', null, global);
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
proto.proto.Alumni = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.Alumni.repeatedFields_, null);
};
goog.inherits(proto.proto.Alumni, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.Alumni.displayName = 'proto.proto.Alumni';
}
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
proto.proto.AlumniListResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.AlumniListResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.AlumniListResponse.displayName = 'proto.proto.AlumniListResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.Alumni.repeatedFields_ = [8];



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
proto.proto.Alumni.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.Alumni.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.Alumni} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.Alumni.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    userId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    name: jspb.Message.getFieldWithDefault(msg, 3, ""),
    nik: jspb.Message.getFieldWithDefault(msg, 4, ""),
    placeOfBirth: jspb.Message.getFieldWithDefault(msg, 5, ""),
    dateOfBirth: jspb.Message.getFieldWithDefault(msg, 6, ""),
    phone: jspb.Message.getFieldWithDefault(msg, 7, ""),
    certificatesList: jspb.Message.toObjectList(msg.getCertificatesList(),
    certificate_message_pb.Certificate.toObject, includeInstance),
    created: jspb.Message.getFieldWithDefault(msg, 9, ""),
    updated: jspb.Message.getFieldWithDefault(msg, 10, ""),
    email: jspb.Message.getFieldWithDefault(msg, 11, "")
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
 * @return {!proto.proto.Alumni}
 */
proto.proto.Alumni.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.Alumni;
  return proto.proto.Alumni.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.Alumni} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.Alumni}
 */
proto.proto.Alumni.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setNik(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setPlaceOfBirth(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDateOfBirth(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setPhone(value);
      break;
    case 8:
      var value = new certificate_message_pb.Certificate;
      reader.readMessage(value,certificate_message_pb.Certificate.deserializeBinaryFromReader);
      msg.addCertificates(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreated(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setUpdated(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
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
proto.proto.Alumni.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.Alumni.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.Alumni} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.Alumni.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getUserId();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getNik();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getPlaceOfBirth();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getDateOfBirth();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getPhone();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getCertificatesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      certificate_message_pb.Certificate.serializeBinaryToWriter
    );
  }
  f = message.getCreated();
  if (f.length > 0) {
    writer.writeString(
      9,
      f
    );
  }
  f = message.getUpdated();
  if (f.length > 0) {
    writer.writeString(
      10,
      f
    );
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.proto.Alumni.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 user_id = 2;
 * @return {number}
 */
proto.proto.Alumni.prototype.getUserId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setUserId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.proto.Alumni.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string nik = 4;
 * @return {string}
 */
proto.proto.Alumni.prototype.getNik = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setNik = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string place_of_birth = 5;
 * @return {string}
 */
proto.proto.Alumni.prototype.getPlaceOfBirth = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setPlaceOfBirth = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string date_of_birth = 6;
 * @return {string}
 */
proto.proto.Alumni.prototype.getDateOfBirth = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setDateOfBirth = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string phone = 7;
 * @return {string}
 */
proto.proto.Alumni.prototype.getPhone = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setPhone = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * repeated Certificate certificates = 8;
 * @return {!Array<!proto.proto.Certificate>}
 */
proto.proto.Alumni.prototype.getCertificatesList = function() {
  return /** @type{!Array<!proto.proto.Certificate>} */ (
    jspb.Message.getRepeatedWrapperField(this, certificate_message_pb.Certificate, 8));
};


/**
 * @param {!Array<!proto.proto.Certificate>} value
 * @return {!proto.proto.Alumni} returns this
*/
proto.proto.Alumni.prototype.setCertificatesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.proto.Certificate=} opt_value
 * @param {number=} opt_index
 * @return {!proto.proto.Certificate}
 */
proto.proto.Alumni.prototype.addCertificates = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.proto.Certificate, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.clearCertificatesList = function() {
  return this.setCertificatesList([]);
};


/**
 * optional string created = 9;
 * @return {string}
 */
proto.proto.Alumni.prototype.getCreated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setCreated = function(value) {
  return jspb.Message.setProto3StringField(this, 9, value);
};


/**
 * optional string updated = 10;
 * @return {string}
 */
proto.proto.Alumni.prototype.getUpdated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setUpdated = function(value) {
  return jspb.Message.setProto3StringField(this, 10, value);
};


/**
 * optional string email = 11;
 * @return {string}
 */
proto.proto.Alumni.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Alumni} returns this
 */
proto.proto.Alumni.prototype.setEmail = function(value) {
  return jspb.Message.setProto3StringField(this, 11, value);
};





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
proto.proto.AlumniListResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.AlumniListResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.AlumniListResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.AlumniListResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    alumni: (f = msg.getAlumni()) && proto.proto.Alumni.toObject(includeInstance, f),
    listInput: (f = msg.getListInput()) && generic_message_pb.ListInput.toObject(includeInstance, f)
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
 * @return {!proto.proto.AlumniListResponse}
 */
proto.proto.AlumniListResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.AlumniListResponse;
  return proto.proto.AlumniListResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.AlumniListResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.AlumniListResponse}
 */
proto.proto.AlumniListResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.proto.Alumni;
      reader.readMessage(value,proto.proto.Alumni.deserializeBinaryFromReader);
      msg.setAlumni(value);
      break;
    case 2:
      var value = new generic_message_pb.ListInput;
      reader.readMessage(value,generic_message_pb.ListInput.deserializeBinaryFromReader);
      msg.setListInput(value);
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
proto.proto.AlumniListResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.AlumniListResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.AlumniListResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.AlumniListResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAlumni();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.proto.Alumni.serializeBinaryToWriter
    );
  }
  f = message.getListInput();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      generic_message_pb.ListInput.serializeBinaryToWriter
    );
  }
};


/**
 * optional Alumni alumni = 1;
 * @return {?proto.proto.Alumni}
 */
proto.proto.AlumniListResponse.prototype.getAlumni = function() {
  return /** @type{?proto.proto.Alumni} */ (
    jspb.Message.getWrapperField(this, proto.proto.Alumni, 1));
};


/**
 * @param {?proto.proto.Alumni|undefined} value
 * @return {!proto.proto.AlumniListResponse} returns this
*/
proto.proto.AlumniListResponse.prototype.setAlumni = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.AlumniListResponse} returns this
 */
proto.proto.AlumniListResponse.prototype.clearAlumni = function() {
  return this.setAlumni(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.AlumniListResponse.prototype.hasAlumni = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ListInput list_input = 2;
 * @return {?proto.proto.ListInput}
 */
proto.proto.AlumniListResponse.prototype.getListInput = function() {
  return /** @type{?proto.proto.ListInput} */ (
    jspb.Message.getWrapperField(this, generic_message_pb.ListInput, 2));
};


/**
 * @param {?proto.proto.ListInput|undefined} value
 * @return {!proto.proto.AlumniListResponse} returns this
*/
proto.proto.AlumniListResponse.prototype.setListInput = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.proto.AlumniListResponse} returns this
 */
proto.proto.AlumniListResponse.prototype.clearListInput = function() {
  return this.setListInput(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.proto.AlumniListResponse.prototype.hasListInput = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.proto);