import * as jspb from 'google-protobuf'

import * as generic_message_pb from './generic_message_pb';
import * as certificate_message_pb from './certificate_message_pb';


export class Alumni extends jspb.Message {
  getId(): number;
  setId(value: number): Alumni;

  getUserId(): number;
  setUserId(value: number): Alumni;

  getName(): string;
  setName(value: string): Alumni;

  getNik(): string;
  setNik(value: string): Alumni;

  getPlaceOfBirth(): string;
  setPlaceOfBirth(value: string): Alumni;

  getDateOfBirth(): string;
  setDateOfBirth(value: string): Alumni;

  getPhone(): string;
  setPhone(value: string): Alumni;

  getCertificatesList(): Array<certificate_message_pb.Certificate>;
  setCertificatesList(value: Array<certificate_message_pb.Certificate>): Alumni;
  clearCertificatesList(): Alumni;
  addCertificates(value?: certificate_message_pb.Certificate, index?: number): certificate_message_pb.Certificate;

  getCreated(): string;
  setCreated(value: string): Alumni;

  getUpdated(): string;
  setUpdated(value: string): Alumni;

  getEmail(): string;
  setEmail(value: string): Alumni;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Alumni.AsObject;
  static toObject(includeInstance: boolean, msg: Alumni): Alumni.AsObject;
  static serializeBinaryToWriter(message: Alumni, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Alumni;
  static deserializeBinaryFromReader(message: Alumni, reader: jspb.BinaryReader): Alumni;
}

export namespace Alumni {
  export type AsObject = {
    id: number,
    userId: number,
    name: string,
    nik: string,
    placeOfBirth: string,
    dateOfBirth: string,
    phone: string,
    certificatesList: Array<certificate_message_pb.Certificate.AsObject>,
    created: string,
    updated: string,
    email: string,
  }
}

export class AlumniListResponse extends jspb.Message {
  getAlumni(): Alumni | undefined;
  setAlumni(value?: Alumni): AlumniListResponse;
  hasAlumni(): boolean;
  clearAlumni(): AlumniListResponse;

  getListInput(): generic_message_pb.ListInput | undefined;
  setListInput(value?: generic_message_pb.ListInput): AlumniListResponse;
  hasListInput(): boolean;
  clearListInput(): AlumniListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlumniListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AlumniListResponse): AlumniListResponse.AsObject;
  static serializeBinaryToWriter(message: AlumniListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlumniListResponse;
  static deserializeBinaryFromReader(message: AlumniListResponse, reader: jspb.BinaryReader): AlumniListResponse;
}

export namespace AlumniListResponse {
  export type AsObject = {
    alumni?: Alumni.AsObject,
    listInput?: generic_message_pb.ListInput.AsObject,
  }
}

