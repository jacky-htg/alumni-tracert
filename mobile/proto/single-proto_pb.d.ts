import * as jspb from 'google-protobuf'



export class AlumniAppraiser extends jspb.Message {
  getId(): number;
  setId(value: number): AlumniAppraiser;

  getUserId(): number;
  setUserId(value: number): AlumniAppraiser;

  getAlumni(): Alumni | undefined;
  setAlumni(value?: Alumni): AlumniAppraiser;
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
    alumni?: Alumni.AsObject,
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

  getListInput(): ListInput | undefined;
  setListInput(value?: ListInput): AlumniAppraiserListResponse;
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
    listInput?: ListInput.AsObject,
  }
}

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

  getCertificatesList(): Array<Certificate>;
  setCertificatesList(value: Array<Certificate>): Alumni;
  clearCertificatesList(): Alumni;
  addCertificates(value?: Certificate, index?: number): Certificate;

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
    certificatesList: Array<Certificate.AsObject>,
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

  getListInput(): ListInput | undefined;
  setListInput(value?: ListInput): AlumniListResponse;
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
    listInput?: ListInput.AsObject,
  }
}

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

  getLegalize(): Legalize | undefined;
  setLegalize(value?: Legalize): Certificate;
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
    legalize?: Legalize.AsObject,
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

  getListInput(): ListInput | undefined;
  setListInput(value?: ListInput): LegalizeListResponse;
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
    listInput?: ListInput.AsObject,
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

export class QuestionGroup extends jspb.Message {
  getId(): number;
  setId(value: number): QuestionGroup;

  getTitle(): string;
  setTitle(value: string): QuestionGroup;

  getAddressedTo(): number;
  setAddressedTo(value: number): QuestionGroup;

  getQuestionList(): Array<Question>;
  setQuestionList(value: Array<Question>): QuestionGroup;
  clearQuestionList(): QuestionGroup;
  addQuestion(value?: Question, index?: number): Question;

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
    questionList: Array<Question.AsObject>,
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

  getQuestionOptionList(): Array<QuestionOption>;
  setQuestionOptionList(value: Array<QuestionOption>): Question;
  clearQuestionOptionList(): Question;
  addQuestionOption(value?: QuestionOption, index?: number): QuestionOption;

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
    questionOptionList: Array<QuestionOption.AsObject>,
    created: string,
    updated: string,
  }
}

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

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getEmail(): string;
  setEmail(value: string): User;

  getName(): string;
  setName(value: string): User;

  getIsActived(): boolean;
  setIsActived(value: boolean): User;

  getUserType(): number;
  setUserType(value: number): User;

  getAlumni(): Alumni | undefined;
  setAlumni(value?: Alumni): User;
  hasAlumni(): boolean;
  clearAlumni(): User;

  getAlumniAppraiser(): AlumniAppraiser | undefined;
  setAlumniAppraiser(value?: AlumniAppraiser): User;
  hasAlumniAppraiser(): boolean;
  clearAlumniAppraiser(): User;

  getUserAnswerList(): Array<UserAnswer>;
  setUserAnswerList(value: Array<UserAnswer>): User;
  clearUserAnswerList(): User;
  addUserAnswer(value?: UserAnswer, index?: number): UserAnswer;

  getCreated(): string;
  setCreated(value: string): User;

  getUpdated(): string;
  setUpdated(value: string): User;

  getToken(): string;
  setToken(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    email: string,
    name: string,
    isActived: boolean,
    userType: number,
    alumni?: Alumni.AsObject,
    alumniAppraiser?: AlumniAppraiser.AsObject,
    userAnswerList: Array<UserAnswer.AsObject>,
    created: string,
    updated: string,
    token: string,
  }
}

export class UserListResponse extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): UserListResponse;
  hasUser(): boolean;
  clearUser(): UserListResponse;

  getListInput(): ListInput | undefined;
  setListInput(value?: ListInput): UserListResponse;
  hasListInput(): boolean;
  clearListInput(): UserListResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserListResponse): UserListResponse.AsObject;
  static serializeBinaryToWriter(message: UserListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserListResponse;
  static deserializeBinaryFromReader(message: UserListResponse, reader: jspb.BinaryReader): UserListResponse;
}

export namespace UserListResponse {
  export type AsObject = {
    user?: User.AsObject,
    listInput?: ListInput.AsObject,
  }
}

export class ChangePassword extends jspb.Message {
  getNewPassword(): string;
  setNewPassword(value: string): ChangePassword;

  getReNewPassword(): string;
  setReNewPassword(value: string): ChangePassword;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangePassword.AsObject;
  static toObject(includeInstance: boolean, msg: ChangePassword): ChangePassword.AsObject;
  static serializeBinaryToWriter(message: ChangePassword, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangePassword;
  static deserializeBinaryFromReader(message: ChangePassword, reader: jspb.BinaryReader): ChangePassword;
}

export namespace ChangePassword {
  export type AsObject = {
    newPassword: string,
    reNewPassword: string,
  }
}

export class LoginInput extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginInput;

  getPassword(): string;
  setPassword(value: string): LoginInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginInput.AsObject;
  static toObject(includeInstance: boolean, msg: LoginInput): LoginInput.AsObject;
  static serializeBinaryToWriter(message: LoginInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginInput;
  static deserializeBinaryFromReader(message: LoginInput, reader: jspb.BinaryReader): LoginInput;
}

export namespace LoginInput {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class AlumniRegistrationInput extends jspb.Message {
  getAlumni(): Alumni | undefined;
  setAlumni(value?: Alumni): AlumniRegistrationInput;
  hasAlumni(): boolean;
  clearAlumni(): AlumniRegistrationInput;

  getUser(): User | undefined;
  setUser(value?: User): AlumniRegistrationInput;
  hasUser(): boolean;
  clearUser(): AlumniRegistrationInput;

  getCertificate(): Certificate | undefined;
  setCertificate(value?: Certificate): AlumniRegistrationInput;
  hasCertificate(): boolean;
  clearCertificate(): AlumniRegistrationInput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlumniRegistrationInput.AsObject;
  static toObject(includeInstance: boolean, msg: AlumniRegistrationInput): AlumniRegistrationInput.AsObject;
  static serializeBinaryToWriter(message: AlumniRegistrationInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlumniRegistrationInput;
  static deserializeBinaryFromReader(message: AlumniRegistrationInput, reader: jspb.BinaryReader): AlumniRegistrationInput;
}

export namespace AlumniRegistrationInput {
  export type AsObject = {
    alumni?: Alumni.AsObject,
    user?: User.AsObject,
    certificate?: Certificate.AsObject,
  }
}

