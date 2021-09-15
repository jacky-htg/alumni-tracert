import * as jspb from 'google-protobuf'

import * as question_message_pb from './question_message_pb';


export class QuestionGroup extends jspb.Message {
  getId(): number;
  setId(value: number): QuestionGroup;

  getTitle(): string;
  setTitle(value: string): QuestionGroup;

  getAddressedTo(): number;
  setAddressedTo(value: number): QuestionGroup;

  getQuestionList(): Array<question_message_pb.Question>;
  setQuestionList(value: Array<question_message_pb.Question>): QuestionGroup;
  clearQuestionList(): QuestionGroup;
  addQuestion(value?: question_message_pb.Question, index?: number): question_message_pb.Question;

  getCreated(): string;
  setCreated(value: string): QuestionGroup;

  getUpdated(): string;
  setUpdated(value: string): QuestionGroup;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuestionGroup.AsObject;
  static toObject(includeInstance: boolean, msg: QuestionGroup): QuestionGroup.AsObject;
  static serializeBinaryToWriter(message: QuestionGroup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuestionGroup;
  static deserializeBinaryFromReader(message: QuestionGroup, reader: jspb.BinaryReader): QuestionGroup;
}

export namespace QuestionGroup {
  export type AsObject = {
    id: number,
    title: string,
    addressedTo: number,
    questionList: Array<question_message_pb.Question.AsObject>,
    created: string,
    updated: string,
  }
}

export class QuestionGroupList extends jspb.Message {
  getQuestionGroupList(): Array<QuestionGroup>;
  setQuestionGroupList(value: Array<QuestionGroup>): QuestionGroupList;
  clearQuestionGroupList(): QuestionGroupList;
  addQuestionGroup(value?: QuestionGroup, index?: number): QuestionGroup;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuestionGroupList.AsObject;
  static toObject(includeInstance: boolean, msg: QuestionGroupList): QuestionGroupList.AsObject;
  static serializeBinaryToWriter(message: QuestionGroupList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuestionGroupList;
  static deserializeBinaryFromReader(message: QuestionGroupList, reader: jspb.BinaryReader): QuestionGroupList;
}

export namespace QuestionGroupList {
  export type AsObject = {
    questionGroupList: Array<QuestionGroup.AsObject>,
  }
}

export class QuestionGroupListInput extends jspb.Message {
  getQuestionGroupIdList(): Array<number>;
  setQuestionGroupIdList(value: Array<number>): QuestionGroupListInput;
  clearQuestionGroupIdList(): QuestionGroupListInput;
  addQuestionGroupId(value: number, index?: number): QuestionGroupListInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuestionGroupListInput.AsObject;
  static toObject(includeInstance: boolean, msg: QuestionGroupListInput): QuestionGroupListInput.AsObject;
  static serializeBinaryToWriter(message: QuestionGroupListInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuestionGroupListInput;
  static deserializeBinaryFromReader(message: QuestionGroupListInput, reader: jspb.BinaryReader): QuestionGroupListInput;
}

export namespace QuestionGroupListInput {
  export type AsObject = {
    questionGroupIdList: Array<number>,
  }
}

