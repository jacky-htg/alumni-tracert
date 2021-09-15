import * as jspb from 'google-protobuf'



export class RequestPassword extends jspb.Message {
  getId(): string;
  setId(value: string): RequestPassword;

  getUserId(): number;
  setUserId(value: number): RequestPassword;

  getIsUsed(): boolean;
  setIsUsed(value: boolean): RequestPassword;

  getExpiredAt(): string;
  setExpiredAt(value: string): RequestPassword;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestPassword.AsObject;
  static toObject(includeInstance: boolean, msg: RequestPassword): RequestPassword.AsObject;
  static serializeBinaryToWriter(message: RequestPassword, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestPassword;
  static deserializeBinaryFromReader(message: RequestPassword, reader: jspb.BinaryReader): RequestPassword;
}

export namespace RequestPassword {
  export type AsObject = {
    id: string,
    userId: number,
    isUsed: boolean,
    expiredAt: string,
  }
}

