import * as jspb from 'google-protobuf'

import * as question_option_message_pb from './question_option_message_pb';


export class Question extends jspb.Message {
  getId(): number;
  setId(value: number): Question;

  getQuestionGroupId(): number;
  setQuestionGroupId(value: number): Question;

  getTitle(): string;
  setTitle(value: string): Question;

  getQuestionType(): number;
  setQuestionType(value: number): Question;

  getMinimumValue(): string;
  setMinimumValue(value: string): Question;

  getMaximumValue(): string;
  setMaximumValue(value: string): Question;

  getIsRequired(): boolean;
  setIsRequired(value: boolean): Question;

  getQuestionOptionList(): Array<question_option_message_pb.QuestionOption>;
  setQuestionOptionList(value: Array<question_option_message_pb.QuestionOption>): Question;
  clearQuestionOptionList(): Question;
  addQuestionOption(value?: question_option_message_pb.QuestionOption, index?: number): question_option_message_pb.QuestionOption;

  getCreated(): string;
  setCreated(value: string): Question;

  getUpdated(): string;
  setUpdated(value: string): Question;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Question.AsObject;
  static toObject(includeInstance: boolean, msg: Question): Question.AsObject;
  static serializeBinaryToWriter(message: Question, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Question;
  static deserializeBinaryFromReader(message: Question, reader: jspb.BinaryReader): Question;
}

export namespace Question {
  export type AsObject = {
    id: number,
    questionGroupId: number,
    title: string,
    questionType: number,
    minimumValue: string,
    maximumValue: string,
    isRequired: boolean,
    questionOptionList: Array<question_option_message_pb.QuestionOption.AsObject>,
    created: string,
    updated: string,
  }
}

