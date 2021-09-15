import * as jspb from 'google-protobuf'

import * as generic_message_pb from './generic_message_pb';


export class Legalize extends jspb.Message {
  getId(): string;
  setId(value: string): Legalize;

  getAlumniId(): number;
  setAlumniId(value: number): Legalize;

  getCertificateId(): number;
  setCertificateId(value: number): Legalize;

  getIjazah(): string;
  setIjazah(value: string): Legalize;

  getTranscript(): string;
  setTranscript(value: string): Legalize;

  getIsOffline(): boolean;
  setIsOffline(value: boolean): Legalize;

  getIsVerified(): boolean;
  setIsVerified(value: boolean): Legalize;

  getIsApproved(): boolean;
  setIsApproved(value: boolean): Legalize;

  getVerifiedBy(): number;
  setVerifiedBy(value: number): Legalize;

  getApprovedBy(): number;
  setApprovedBy(value: number): Legalize;

  getVerifiedAt(): string;
  setVerifiedAt(value: string): Legalize;

  getApprovedAt(): string;
  setApprovedAt(value: string): Legalize;

  getIjazahSigned(): string;
  setIjazahSigned(value: string): Legalize;

  getTranscriptSigned(): string;
  setTranscriptSigned(value: string): Legalize;

  getStatus(): number;
  setStatus(value: number): Legalize;

  getRating(): number;
  setRating(value: number): Legalize;

  getRejectedReason(): string;
  setRejectedReason(value: string): Legalize;

  getCreated(): string;
  setCreated(value: string): Legalize;

  getUpdated(): string;
  setUpdated(value: string): Legalize;

  getAlumniName(): string;
  setAlumniName(value: string): Legalize;

  getAlumniEmail(): string;
  setAlumniEmail(value: string): Legalize;

  getNoIjazah(): string;
  setNoIjazah(value: string): Legalize;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Legalize.AsObject;
  static toObject(includeInstance: boolean, msg: Legalize): Legalize.AsObject;
  static serializeBinaryToWriter(message: Legalize, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Legalize;
  static deserializeBinaryFromReader(message: Legalize, reader: jspb.BinaryReader): Legalize;
}

export namespace Legalize {
  export type AsObject = {
    id: string,
    alumniId: number,
    certificateId: number,
    ijazah: string,
    transcript: string,
    isOffline: boolean,
    isVerified: boolean,
    isApproved: boolean,
    verifiedBy: number,
    approvedBy: number,
    verifiedAt: string,
    approvedAt: string,
    ijazahSigned: string,
    transcriptSigned: string,
    status: number,
    rating: number,
    rejectedReason: string,
    created: string,
    updated: string,
    alumniName: string,
    alumniEmail: string,
    noIjazah: string,
  }
}

export class LegalizeListResponse extends jspb.Message {
  getLegalize(): Legalize | undefined;
  setLegalize(value?: Legalize): LegalizeListResponse;
  hasLegalize(): boolean;
  clearLegalize(): LegalizeListResponse;

  getListInput(): generic_message_pb.ListInput | undefined;
  setListInput(value?: generic_message_pb.ListInput): LegalizeListResponse;
  hasListInput(): boolean;
  clearListInput(): LegalizeListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LegalizeListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LegalizeListResponse): LegalizeListResponse.AsObject;
  static serializeBinaryToWriter(message: LegalizeListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LegalizeListResponse;
  static deserializeBinaryFromReader(message: LegalizeListResponse, reader: jspb.BinaryReader): LegalizeListResponse;
}

export namespace LegalizeListResponse {
  export type AsObject = {
    legalize?: Legalize.AsObject,
    listInput?: generic_message_pb.ListInput.AsObject,
  }
}

export class Legalizes extends jspb.Message {
  getLegalizeList(): Array<Legalize>;
  setLegalizeList(value: Array<Legalize>): Legalizes;
  clearLegalizeList(): Legalizes;
  addLegalize(value?: Legalize, index?: number): Legalize;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Legalizes.AsObject;
  static toObject(includeInstance: boolean, msg: Legalizes): Legalizes.AsObject;
  static serializeBinaryToWriter(message: Legalizes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Legalizes;
  static deserializeBinaryFromReader(message: Legalizes, reader: jspb.BinaryReader): Legalizes;
}

export namespace Legalizes {
  export type AsObject = {
    legalizeList: Array<Legalize.AsObject>,
  }
}

