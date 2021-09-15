import * as jspb from 'google-protobuf'

import * as legalize_message_pb from './legalize_message_pb';


export class Certificate extends jspb.Message {
  getId(): number;
  setId(value: number): Certificate;

  getAlumniId(): number;
  setAlumniId(value: number): Certificate;

  getNim(): string;
  setNim(value: string): Certificate;

  getMajorStudy(): string;
  setMajorStudy(value: string): Certificate;

  getEntryYear(): number;
  setEntryYear(value: number): Certificate;

  getGraduationYear(): number;
  setGraduationYear(value: number): Certificate;

  getNoIjazah(): string;
  setNoIjazah(value: string): Certificate;

  getCreated(): string;
  setCreated(value: string): Certificate;

  getUpdated(): string;
  setUpdated(value: string): Certificate;

  getLegalize(): legalize_message_pb.Legalize | undefined;
  setLegalize(value?: legalize_message_pb.Legalize): Certificate;
  hasLegalize(): boolean;
  clearLegalize(): Certificate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Certificate.AsObject;
  static toObject(includeInstance: boolean, msg: Certificate): Certificate.AsObject;
  static serializeBinaryToWriter(message: Certificate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Certificate;
  static deserializeBinaryFromReader(message: Certificate, reader: jspb.BinaryReader): Certificate;
}

export namespace Certificate {
  export type AsObject = {
    id: number,
    alumniId: number,
    nim: string,
    majorStudy: string,
    entryYear: number,
    graduationYear: number,
    noIjazah: string,
    created: string,
    updated: string,
    legalize?: legalize_message_pb.Legalize.AsObject,
  }
}

export class Certificates extends jspb.Message {
  getCertificateList(): Array<Certificate>;
  setCertificateList(value: Array<Certificate>): Certificates;
  clearCertificateList(): Certificates;
  addCertificate(value?: Certificate, index?: number): Certificate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Certificates.AsObject;
  static toObject(includeInstance: boolean, msg: Certificates): Certificates.AsObject;
  static serializeBinaryToWriter(message: Certificates, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Certificates;
  static deserializeBinaryFromReader(message: Certificates, reader: jspb.BinaryReader): Certificates;
}

export namespace Certificates {
  export type AsObject = {
    certificateList: Array<Certificate.AsObject>,
  }
}

