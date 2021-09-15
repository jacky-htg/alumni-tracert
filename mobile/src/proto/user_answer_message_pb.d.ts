import * as jspb from 'google-protobuf'



export class Tracer extends jspb.Message {
  getId(): number;
  setId(value: number): Tracer;

  getUserId(): number;
  setUserId(value: number): Tracer;

  getCreated(): string;
  setCreated(value: string): Tracer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tracer.AsObject;
  static toObject(includeInstance: boolean, msg: Tracer): Tracer.AsObject;
  static serializeBinaryToWriter(message: Tracer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tracer;
  static deserializeBinaryFromReader(message: Tracer, reader: jspb.BinaryReader): Tracer;
}

export namespace Tracer {
  export type AsObject = {
    id: number,
    userId: number,
    created: string,
  }
}

export class UserAnswer extends jspb.Message {
  getId(): number;
  setId(value: number): UserAnswer;

  getTracerId(): number;
  setTracerId(value: number): UserAnswer;

  getQuestionId(): number;
  setQuestionId(value: number): UserAnswer;

  getAnswer(): string;
  setAnswer(value: string): UserAnswer;

  getCreated(): string;
  setCreated(value: string): UserAnswer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserAnswer.AsObject;
  static toObject(includeInstance: boolean, msg: UserAnswer): UserAnswer.AsObject;
  static serializeBinaryToWriter(message: UserAnswer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserAnswer;
  static deserializeBinaryFromReader(message: UserAnswer, reader: jspb.BinaryReader): UserAnswer;
}

export namespace UserAnswer {
  export type AsObject = {
    id: number,
    tracerId: number,
    questionId: number,
    answer: string,
    created: string,
  }
}

export class AlumniKuisioner extends jspb.Message {
  getId(): number;
  setId(value: number): AlumniKuisioner;

  getName(): string;
  setName(value: string): AlumniKuisioner;

  getNik(): string;
  setNik(value: string): AlumniKuisioner;

  getAnswerList(): Array<Answer>;
  setAnswerList(value: Array<Answer>): AlumniKuisioner;
  clearAnswerList(): AlumniKuisioner;
  addAnswer(value?: Answer, index?: number): Answer;

  getCreated(): string;
  setCreated(value: string): AlumniKuisioner;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlumniKuisioner.AsObject;
  static toObject(includeInstance: boolean, msg: AlumniKuisioner): AlumniKuisioner.AsObject;
  static serializeBinaryToWriter(message: AlumniKuisioner, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlumniKuisioner;
  static deserializeBinaryFromReader(message: AlumniKuisioner, reader: jspb.BinaryReader): AlumniKuisioner;
}

export namespace AlumniKuisioner {
  export type AsObject = {
    id: number,
    name: string,
    nik: string,
    answerList: Array<Answer.AsObject>,
    created: string,
  }
}

export class Answer extends jspb.Message {
  getQuestion(): string;
  setQuestion(value: string): Answer;

  getAnswer(): string;
  setAnswer(value: string): Answer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Answer.AsObject;
  static toObject(includeInstance: boolean, msg: Answer): Answer.AsObject;
  static serializeBinaryToWriter(message: Answer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Answer;
  static deserializeBinaryFromReader(message: Answer, reader: jspb.BinaryReader): Answer;
}

export namespace Answer {
  export type AsObject = {
    question: string,
    answer: string,
  }
}

export class TracerList extends jspb.Message {
  getAnswerList(): Array<AlumniKuisioner>;
  setAnswerList(value: Array<AlumniKuisioner>): TracerList;
  clearAnswerList(): TracerList;
  addAnswer(value?: AlumniKuisioner, index?: number): AlumniKuisioner;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TracerList.AsObject;
  static toObject(includeInstance: boolean, msg: TracerList): TracerList.AsObject;
  static serializeBinaryToWriter(message: TracerList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TracerList;
  static deserializeBinaryFromReader(message: TracerList, reader: jspb.BinaryReader): TracerList;
}

export namespace TracerList {
  export type AsObject = {
    answerList: Array<AlumniKuisioner.AsObject>,
  }
}

