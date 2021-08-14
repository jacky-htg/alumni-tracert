// source: certificate_message.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.proto.Certificate', null, global);
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
proto.proto.Certificate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.proto.Certificate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.Certificate.displayName = 'proto.proto.Certificate';
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
proto.proto.Certificate.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.Certificate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.Certificate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.Certificate.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    alumniId: jspb.Message.getFieldWithDefault(msg, 2, 0),
    nim: jspb.Message.getFieldWithDefault(msg, 3, ""),
    majorStudy: jspb.Message.getFieldWithDefault(msg, 4, ""),
    graduationYear: jspb.Message.getFieldWithDefault(msg, 5, 0),
    noIjazah: jspb.Message.getFieldWithDefault(msg, 6, ""),
    created: jspb.Message.getFieldWithDefault(msg, 7, ""),
    updated: jspb.Message.getFieldWithDefault(msg, 8, "")
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
 * @return {!proto.proto.Certificate}
 */
proto.proto.Certificate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.Certificate;
  return proto.proto.Certificate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.Certificate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.Certificate}
 */
proto.proto.Certificate.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setAlumniId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNim(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMajorStudy(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setGraduationYear(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setNoIjazah(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreated(value);
      break;
    case 8:
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
proto.proto.Certificate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.Certificate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.Certificate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.Certificate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getAlumniId();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getNim();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getMajorStudy();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getGraduationYear();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getNoIjazah();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getCreated();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getUpdated();
  if (f.length > 0) {
    writer.writeString(
      8,
      f
    );
  }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.proto.Certificate.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint64 alumni_id = 2;
 * @return {number}
 */
proto.proto.Certificate.prototype.getAlumniId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setAlumniId = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string nim = 3;
 * @return {string}
 */
proto.proto.Certificate.prototype.getNim = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setNim = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string major_study = 4;
 * @return {string}
 */
proto.proto.Certificate.prototype.getMajorStudy = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setMajorStudy = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional uint32 graduation_year = 5;
 * @return {number}
 */
proto.proto.Certificate.prototype.getGraduationYear = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setGraduationYear = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional string no_ijazah = 6;
 * @return {string}
 */
proto.proto.Certificate.prototype.getNoIjazah = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setNoIjazah = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string created = 7;
 * @return {string}
 */
proto.proto.Certificate.prototype.getCreated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setCreated = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string updated = 8;
 * @return {string}
 */
proto.proto.Certificate.prototype.getUpdated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.Certificate} returns this
 */
proto.proto.Certificate.prototype.setUpdated = function(value) {
  return jspb.Message.setProto3StringField(this, 8, value);
};


goog.object.extend(exports, proto.proto);
