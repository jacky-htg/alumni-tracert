import * as jspb from 'google-protobuf'



export class EmptyMessage extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyMessage): EmptyMessage.AsObject;
  static serializeBinaryToWriter(message: EmptyMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyMessage;
  static deserializeBinaryFromReader(message: EmptyMessage, reader: jspb.BinaryReader): EmptyMessage;
}

export namespace EmptyMessage {
  export type AsObject = {
  }
}

export class StringMessage extends jspb.Message {
  getData(): string;
  setData(value: string): StringMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StringMessage): StringMessage.AsObject;
  static serializeBinaryToWriter(message: StringMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringMessage;
  static deserializeBinaryFromReader(message: StringMessage, reader: jspb.BinaryReader): StringMessage;
}

export namespace StringMessage {
  export type AsObject = {
    data: string,
  }
}

export class UintMessage extends jspb.Message {
  getData(): number;
  setData(value: number): UintMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UintMessage.AsObject;
  static toObject(includeInstance: boolean, msg: UintMessage): UintMessage.AsObject;
  static serializeBinaryToWriter(message: UintMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UintMessage;
  static deserializeBinaryFromReader(message: UintMessage, reader: jspb.BinaryReader): UintMessage;
}

export namespace UintMessage {
  export type AsObject = {
    data: number,
  }
}

export class ListInput extends jspb.Message {
  getSearch(): string;
  setSearch(value: string): ListInput;

  getLimit(): number;
  setLimit(value: number): ListInput;

  getPage(): number;
  setPage(value: number): ListInput;

  getOrderBy(): string;
  setOrderBy(value: string): ListInput;

  getSort(): string;
  setSort(value: string): ListInput;

  getCount(): number;
  setCount(value: number): ListInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListInput.AsObject;
  static toObject(includeInstance: boolean, msg: ListInput): ListInput.AsObject;
  static serializeBinaryToWriter(message: ListInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListInput;
  static deserializeBinaryFromReader(message: ListInput, reader: jspb.BinaryReader): ListInput;
}

export namespace ListInput {
  export type AsObject = {
    search: string,
    limit: number,
    page: number,
    orderBy: string,
    sort: string,
    count: number,
  }
}

