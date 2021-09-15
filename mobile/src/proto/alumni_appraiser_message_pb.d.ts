import * as jspb from 'google-protobuf'

import * as alumni_message_pb from './alumni_message_pb';
import * as generic_message_pb from './generic_message_pb';


export class AlumniAppraiser extends jspb.Message {
  getId(): number;
  setId(value: number): AlumniAppraiser;

  getUserId(): number;
  setUserId(value: number): AlumniAppraiser;

  getAlumni(): alumni_message_pb.Alumni | undefined;
  setAlumni(value?: alumni_message_pb.Alumni): AlumniAppraiser;
  hasAlumni(): boolean;
  clearAlumni(): AlumniAppraiser;

  getName(): string;
  setName(value: string): AlumniAppraiser;

  getInstansi(): string;
  setInstansi(value: string): AlumniAppraiser;

  getPosition(): string;
  setPosition(value: string): AlumniAppraiser;

  getAlumniPosition(): string;
  setAlumniPosition(value: string): AlumniAppraiser;

  getCreated(): string;
  setCreated(value: string): AlumniAppraiser;

  getUpdated(): string;
  setUpdated(value: string): AlumniAppraiser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlumniAppraiser.AsObject;
  static toObject(includeInstance: boolean, msg: AlumniAppraiser): AlumniAppraiser.AsObject;
  static serializeBinaryToWriter(message: AlumniAppraiser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlumniAppraiser;
  static deserializeBinaryFromReader(message: AlumniAppraiser, reader: jspb.BinaryReader): AlumniAppraiser;
}

export namespace AlumniAppraiser {
  export type AsObject = {
    id: number,
    userId: number,
    alumni?: alumni_message_pb.Alumni.AsObject,
    name: string,
    instansi: string,
    position: string,
    alumniPosition: string,
    created: string,
    updated: string,
  }
}

export class AlumniAppraiserListResponse extends jspb.Message {
  getAlumniAppraiser(): AlumniAppraiser | undefined;
  setAlumniAppraiser(value?: AlumniAppraiser): AlumniAppraiserListResponse;
  hasAlumniAppraiser(): boolean;
  clearAlumniAppraiser(): AlumniAppraiserListResponse;

  getListInput(): generic_message_pb.ListInput | undefined;
  setListInput(value?: generic_message_pb.ListInput): AlumniAppraiserListResponse;
  hasListInput(): boolean;
  clearListInput(): AlumniAppraiserListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlumniAppraiserListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AlumniAppraiserListResponse): AlumniAppraiserListResponse.AsObject;
  static serializeBinaryToWriter(message: AlumniAppraiserListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlumniAppraiserListResponse;
  static deserializeBinaryFromReader(message: AlumniAppraiserListResponse, reader: jspb.BinaryReader): AlumniAppraiserListResponse;
}

export namespace AlumniAppraiserListResponse {
  export type AsObject = {
    alumniAppraiser?: AlumniAppraiser.AsObject,
    listInput?: generic_message_pb.ListInput.AsObject,
  }
}

