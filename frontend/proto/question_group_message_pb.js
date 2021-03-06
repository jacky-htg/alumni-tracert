// source: question_group_message.proto
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

var question_message_pb = require('./question_message_pb.js');
goog.object.extend(proto, question_message_pb);
goog.exportSymbol('proto.proto.QuestionGroup', null, global);
goog.exportSymbol('proto.proto.QuestionGroupList', null, global);
goog.exportSymbol('proto.proto.QuestionGroupListInput', null, global);
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
proto.proto.QuestionGroup = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.QuestionGroup.repeatedFields_, null);
};
goog.inherits(proto.proto.QuestionGroup, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.QuestionGroup.displayName = 'proto.proto.QuestionGroup';
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
proto.proto.QuestionGroupList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.QuestionGroupList.repeatedFields_, null);
};
goog.inherits(proto.proto.QuestionGroupList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.QuestionGroupList.displayName = 'proto.proto.QuestionGroupList';
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
proto.proto.QuestionGroupListInput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.proto.QuestionGroupListInput.repeatedFields_, null);
};
goog.inherits(proto.proto.QuestionGroupListInput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.proto.QuestionGroupListInput.displayName = 'proto.proto.QuestionGroupListInput';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.QuestionGroup.repeatedFields_ = [4];



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
proto.proto.QuestionGroup.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.QuestionGroup.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.QuestionGroup} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionGroup.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    title: jspb.Message.getFieldWithDefault(msg, 2, ""),
    addressedTo: jspb.Message.getFieldWithDefault(msg, 3, 0),
    questionList: jspb.Message.toObjectList(msg.getQuestionList(),
    question_message_pb.Question.toObject, includeInstance),
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
 * @return {!proto.proto.QuestionGroup}
 */
proto.proto.QuestionGroup.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.QuestionGroup;
  return proto.proto.QuestionGroup.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.QuestionGroup} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.QuestionGroup}
 */
proto.proto.QuestionGroup.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setAddressedTo(value);
      break;
    case 4:
      var value = new question_message_pb.Question;
      reader.readMessage(value,question_message_pb.Question.deserializeBinaryFromReader);
      msg.addQuestion(value);
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
proto.proto.QuestionGroup.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.QuestionGroup.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.QuestionGroup} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionGroup.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAddressedTo();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = message.getQuestionList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      question_message_pb.Question.serializeBinaryToWriter
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
proto.proto.QuestionGroup.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.QuestionGroup} returns this
 */
proto.proto.QuestionGroup.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.proto.QuestionGroup.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.QuestionGroup} returns this
 */
proto.proto.QuestionGroup.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint32 addressed_to = 3;
 * @return {number}
 */
proto.proto.QuestionGroup.prototype.getAddressedTo = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.proto.QuestionGroup} returns this
 */
proto.proto.QuestionGroup.prototype.setAddressedTo = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated Question question = 4;
 * @return {!Array<!proto.proto.Question>}
 */
proto.proto.QuestionGroup.prototype.getQuestionList = function() {
  return /** @type{!Array<!proto.proto.Question>} */ (
    jspb.Message.getRepeatedWrapperField(this, question_message_pb.Question, 4));
};


/**
 * @param {!Array<!proto.proto.Question>} value
 * @return {!proto.proto.QuestionGroup} returns this
*/
proto.proto.QuestionGroup.prototype.setQuestionList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.proto.Question=} opt_value
 * @param {number=} opt_index
 * @return {!proto.proto.Question}
 */
proto.proto.QuestionGroup.prototype.addQuestion = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.proto.Question, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.proto.QuestionGroup} returns this
 */
proto.proto.QuestionGroup.prototype.clearQuestionList = function() {
  return this.setQuestionList([]);
};


/**
 * optional string created = 5;
 * @return {string}
 */
proto.proto.QuestionGroup.prototype.getCreated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.QuestionGroup} returns this
 */
proto.proto.QuestionGroup.prototype.setCreated = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string updated = 6;
 * @return {string}
 */
proto.proto.QuestionGroup.prototype.getUpdated = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.proto.QuestionGroup} returns this
 */
proto.proto.QuestionGroup.prototype.setUpdated = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.QuestionGroupList.repeatedFields_ = [1];



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
proto.proto.QuestionGroupList.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.QuestionGroupList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.QuestionGroupList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionGroupList.toObject = function(includeInstance, msg) {
  var f, obj = {
    questionGroupList: jspb.Message.toObjectList(msg.getQuestionGroupList(),
    proto.proto.QuestionGroup.toObject, includeInstance)
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
 * @return {!proto.proto.QuestionGroupList}
 */
proto.proto.QuestionGroupList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.QuestionGroupList;
  return proto.proto.QuestionGroupList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.QuestionGroupList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.QuestionGroupList}
 */
proto.proto.QuestionGroupList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.proto.QuestionGroup;
      reader.readMessage(value,proto.proto.QuestionGroup.deserializeBinaryFromReader);
      msg.addQuestionGroup(value);
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
proto.proto.QuestionGroupList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.QuestionGroupList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.QuestionGroupList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionGroupList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQuestionGroupList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.proto.QuestionGroup.serializeBinaryToWriter
    );
  }
};


/**
 * repeated QuestionGroup question_group = 1;
 * @return {!Array<!proto.proto.QuestionGroup>}
 */
proto.proto.QuestionGroupList.prototype.getQuestionGroupList = function() {
  return /** @type{!Array<!proto.proto.QuestionGroup>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.proto.QuestionGroup, 1));
};


/**
 * @param {!Array<!proto.proto.QuestionGroup>} value
 * @return {!proto.proto.QuestionGroupList} returns this
*/
proto.proto.QuestionGroupList.prototype.setQuestionGroupList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.proto.QuestionGroup=} opt_value
 * @param {number=} opt_index
 * @return {!proto.proto.QuestionGroup}
 */
proto.proto.QuestionGroupList.prototype.addQuestionGroup = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.proto.QuestionGroup, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.proto.QuestionGroupList} returns this
 */
proto.proto.QuestionGroupList.prototype.clearQuestionGroupList = function() {
  return this.setQuestionGroupList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.proto.QuestionGroupListInput.repeatedFields_ = [1];



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
proto.proto.QuestionGroupListInput.prototype.toObject = function(opt_includeInstance) {
  return proto.proto.QuestionGroupListInput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.proto.QuestionGroupListInput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionGroupListInput.toObject = function(includeInstance, msg) {
  var f, obj = {
    questionGroupIdList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.proto.QuestionGroupListInput}
 */
proto.proto.QuestionGroupListInput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.proto.QuestionGroupListInput;
  return proto.proto.QuestionGroupListInput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.proto.QuestionGroupListInput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.proto.QuestionGroupListInput}
 */
proto.proto.QuestionGroupListInput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array<number>} */ (reader.readPackedUint64());
      msg.setQuestionGroupIdList(value);
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
proto.proto.QuestionGroupListInput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.proto.QuestionGroupListInput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.proto.QuestionGroupListInput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.proto.QuestionGroupListInput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getQuestionGroupIdList();
  if (f.length > 0) {
    writer.writePackedUint64(
      1,
      f
    );
  }
};


/**
 * repeated uint64 question_group_id = 1;
 * @return {!Array<number>}
 */
proto.proto.QuestionGroupListInput.prototype.getQuestionGroupIdList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.proto.QuestionGroupListInput} returns this
 */
proto.proto.QuestionGroupListInput.prototype.setQuestionGroupIdList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.proto.QuestionGroupListInput} returns this
 */
proto.proto.QuestionGroupListInput.prototype.addQuestionGroupId = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.proto.QuestionGroupListInput} returns this
 */
proto.proto.QuestionGroupListInput.prototype.clearQuestionGroupIdList = function() {
  return this.setQuestionGroupIdList([]);
};


goog.object.extend(exports, proto.proto);
