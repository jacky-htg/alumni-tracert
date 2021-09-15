import * as jspb from 'google-protobuf'



export class QuestionOption extends jspb.Message {
  getId(): number;
  setId(value: number): QuestionOption;

  getQuestionId(): number;
  setQuestionId(value: number): QuestionOption;

  getTitle(): string;
  setTitle(value: string): QuestionOption;

  getIsNeedEssay(): boolean;
  setIsNeedEssay(value: boolean): QuestionOption;

  getCreated(): string;
  setCreated(value: string): QuestionOption;

  getUpdated(): string;
  setUpdated(value: string): QuestionOption;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuestionOption.AsObject;
  static toObject(includeInstance: boolean, msg: QuestionOption): QuestionOption.AsObject;
  static serializeBinaryToWriter(message: QuestionOption, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuestionOption;
  static deserializeBinaryFromReader(message: QuestionOption, reader: jspb.BinaryReader): QuestionOption;
}

export namespace QuestionOption {
  export type AsObject = {
    id: number,
    questionId: number,
    title: string,
    isNeedEssay: boolean,
    created: string,
    updated: string,
  }
}

