import {deps} from '../../services/tracert';
import {
  User,
  LoginInput,
  ListInput,
  AlumniAppraiser,
  Alumni,
  Legalize,
  EmptyMessage,
  Certificate,
  QuestionGroupListInput,
  QuestionGroupList,
  ChangePasswordRequest,
} from '../../proto/single-proto_pb';
//
import userService from '../../services/user';
import loginService from '../../services/login';
import alumniService from '../../services/alumni';
import AlumniListService from '../../services/alumniList';
import appraiserService from '../../services/appraiser';
import LegalizeService from '../../services/legalize';
import CertificateService from '../../services/certificate';
import QuestionService from '../../services/question';
import UserAnswerService from '../../services/user_answer';
import Login from '../../services/login';
import storage from './storage';

export const actions = {
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILED: 'CREATE_USER_FAILED',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  GET_ALUMNI_LIST_SUCCESS: 'GET_ALUMNI_LIST_SUCCESS',
  GET_ALUMNI_LIST_FAILED: 'GET_ALUMNI_LIST_FAILED',
  REGISTER_APPRAISER_SUCCESS: 'REGISTER_APPRAISER_SUCCESS',
  REGISTER_APPRAISER_FAILED: 'REGISTER_APPRAISER_FAILED',
  GET_MY_LEGALISIR_LIST_SUCCESS: 'GET_MY_LEGALISIR_LIST_SUCCESS',
  GET_MY_LEGALISIR_LIST_FAILED: 'GET_MY_LEGALISIR_LIST_FAILED',
  CREATE_CERTIFICATE_SUCCESS: 'CREATE_CERTIFICATE_SUCCESS',
  CREATE_CERTIFICATE_FAILED: 'CREATE_CERTIFICATE_FAILED',
  SET_DETAIL_IJAZAH: 'SET_DETAIL_IJAZAH',
  CREATE_LEGALIZE_SUCCESS: 'CREATE_LEGALIZE_SUCCESS',
  CREATE_LEGALIZE_FAILED: 'CREATE_LEGALIZE_FAILED',
  GET_QUESTION_GROUP_LIST_SUCCESS: 'GET_QUESTION_GROUP_LIST_SUCCESS',
  GET_QUESTION_GROUP_LIST_FAILED: 'GET_QUESTION_GROUP_LIST_FAILED',
  LOGOUT: 'LOGOUT',
  SET_LOGIN: 'SET_LOGIN',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED',
  GIVE_RATING_SUCCESS: 'GIVE_RATING_SUCCESS',
  GIVE_RATING_FAILED: 'GIVE_RATING_FAILED',
};

export const setDetailIjazah = data => ({
  type: actions.SET_DETAIL_IJAZAH,
  data,
});

export const createUser = (name, email) => async dispatch => {
  try {
    const userProto = new User();
    userProto.setUserType(2); // 2 = appraiser
    userProto.setName(name);
    userProto.setEmail(email);
    const user = new userService(deps, userProto);
    const result = await user.create();
    if (result) {
      const data = result.toObject();
      dispatch({
        type: actions.CREATE_USER_SUCCESS,
        data,
      });
      storage.save({
        key: 'token', // Note: Do not use underscore("_") in key!
        data: {
          token: data.token,
          userId: data.id,
          userType: data.userType,
        },
      });
    } else {
      throw new Error('Failed create user');
    }
    return result;
  } catch (error) {
    dispatch({
      type: actions.CREATE_USER_FAILED,
      message: error.message,
    });
    throw new Error(error);
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const loginInput = new LoginInput();
    loginInput.setEmail(email);
    loginInput.setPassword(password);
    const mylogin = new loginService(deps, loginInput);
    const result = await mylogin.login();
    if (result) {
      const data = result.toObject();
      dispatch({
        type: actions.LOGIN_SUCCESS,
        data,
      });
      storage.save({
        key: 'token', // Note: Do not use underscore("_") in key!
        data: {
          token: data.token,
          userId: data.id,
          userType: data.userType,
        },
      });
    } else {
      throw new Error('Failed login');
    }
    return result;
  } catch (error) {
    dispatch({
      type: actions.LOGIN_FAILED,
      message: error.message,
    });
    throw new Error(error);
  }
};

export const getAlumniList = (search, limit, page) => async dispatch => {
  try {
    const listInputProto = new ListInput();
    listInputProto.setSearch(search);
    listInputProto.setLimit(limit);
    listInputProto.setPage(page);
    const alumni = new AlumniListService(deps, listInputProto);
    const token = await storage.load({key: 'token'});
    const alumniStream = await alumni.alumniList(token.token);
    alumniStream.on('data', response => {
      const data = response.toObject().alumni;
      dispatch({
        type: actions.GET_ALUMNI_LIST_SUCCESS,
        data: {...data, title: data.name},
      });
    });
    alumniStream.on('end', () => {
      console.log('End stream = ');
    });
    alumniStream.on('error', err => {
      throw new Error(err.message);
    });
    return alumniStream;
  } catch (error) {
    dispatch({
      type: actions.GET_ALUMNI_LIST_FAILED,
      message: error.message,
    });
    throw new Error(error);
  }
};

export const registerAppraiser =
  ({name, instansi, position, alumniPosition, alumniData}) =>
  async dispatch => {
    try {
      const alumniAppraiserProto = new AlumniAppraiser();
      const alumniProto = new Alumni();
      alumniAppraiserProto.setName(name);
      alumniAppraiserProto.setInstansi(instansi);
      alumniAppraiserProto.setPosition(position);
      alumniAppraiserProto.setAlumniPosition(alumniPosition);
      console.log(alumniProto.toObject());
      alumniProto.setId(alumniData.id);
      alumniProto.setCreated(alumniData.created);
      alumniProto.setDateOfBirth(alumniData.dateOfBirth);
      alumniProto.setGraduationYear(alumniData.graduationYear);
      alumniProto.setMajorStudy(alumniData.majorStudy);
      alumniProto.setName(alumniData.name);
      alumniProto.setNik(alumniData.nik);
      alumniProto.setNim(alumniData.nim);
      alumniProto.setNoIjazah(alumniData.noIjazah);
      alumniProto.setPhone(alumniData.phone);
      alumniProto.setPlaceOfBirth(alumniData.placeOfBirth);
      alumniProto.setUpdated(alumniData.updated);
      alumniProto.setUserId(alumniData.userId);
      alumniAppraiserProto.setAlumni(alumniProto);
      const appraiser = new appraiserService(deps, alumniAppraiserProto);
      const token = await storage.load({key: 'token'});
      alumniAppraiserProto.setUserId(token.userId);
      const result = await appraiser.registration(token.token);
      if (result) {
        const data = result.toObject();
        dispatch({
          type: actions.REGISTER_APPRAISER_SUCCESS,
          data,
        });
      } else {
        throw new Error('Failed register pengguna');
      }
      return result;
    } catch (error) {
      dispatch({
        type: actions.REGISTER_APPRAISER_FAILED,
        message: error.message,
      });
      throw new Error(error);
    }
  };

export const getLegalizeList = () => async dispatch => {
  try {
    const legalizeService = new LegalizeService(deps, new EmptyMessage());
    const token = await storage.load({key: 'token'});
    const result = await legalizeService.getOwn(token.token);
    dispatch({
      type: actions.GET_MY_LEGALISIR_LIST_SUCCESS,
      data: result.toObject().certificateList,
    });
    return result;
  } catch (error) {
    dispatch({
      type: actions.GET_MY_LEGALISIR_LIST_FAILED,
      message: error.message,
    });
    throw new Error(error);
  }
};

export const createCertificate =
  ({nim, majorStudy, noIjazah, entryYear, graduationYear}) =>
  async dispatch => {
    try {
      const certificateProto = new Certificate();
      certificateProto.setNim(nim);
      certificateProto.setMajorStudy(majorStudy);
      certificateProto.setNoIjazah(noIjazah);
      certificateProto.setEntryYear(entryYear);
      certificateProto.setGraduationYear(graduationYear);
      const token = await storage.load({key: 'token'});
      console.log(certificateProto.toObject());
      const certificate = new CertificateService(deps, certificateProto);
      const result = await certificate.create(token.token);
      dispatch({
        type: actions.CREATE_CERTIFICATE_SUCCESS,
        data: result.toObject(),
      });
      return result;
    } catch (error) {
      dispatch({
        type: actions.CREATE_CERTIFICATE_FAILED,
        message: error.message,
      });
      throw new Error(error);
    }
  };

export const createLegalize =
  ({certificateId, ijazahPath, transcriptPath, isOffline}) =>
  async dispatch => {
    try {
      const legalizeProto = new Legalize();
      legalizeProto.setCertificateId(certificateId);
      legalizeProto.setIjazah(ijazahPath);
      legalizeProto.setTranscript(transcriptPath);
      legalizeProto.setIsOffline(isOffline);

      const legalizeService = new LegalizeService(deps, legalizeProto);
      const token = await storage.load({key: 'token'});
      console.log(legalizeProto.toObject());
      const result = await legalizeService.create(token.token);
      dispatch({
        type: actions.CREATE_LEGALIZE_SUCCESS,
        data: result.toObject(),
      });
      return result;
    } catch (error) {
      dispatch({
        type: actions.CREATE_LEGALIZE_FAILED,
        message: error.message,
      });
      throw new Error(error);
    }
  };

export const getQuestionList = () => async dispatch => {
  try {
    const questionGroupListInputProto = new QuestionGroupListInput();
    let questionList = new QuestionGroupList();

    const question = new QuestionService(deps, questionGroupListInputProto);
    /* const legalizeService = new LegalizeService(deps, new EmptyMessage()); */
    const token = await storage.load({key: 'token'});
    let groups = [1];
    if (token.usertype === 2) {
      groups = [6];
    }
    questionGroupListInputProto.setQuestionGroupIdList(groups);
    const result = await question.list(token.token);
    dispatch({
      type: actions.GET_QUESTION_GROUP_LIST_SUCCESS,
      data: result.toObject(),
    });
    return result;
  } catch (error) {
    dispatch({
      type: actions.GET_QUESTION_GROUP_LIST_FAILED,
      message: error.message,
    });
    throw new Error(error);
  }
};

export const logout = () => async dispatch => {
  await storage.remove({
    key: 'token',
  });
  dispatch({type: actions.LOGOUT});
};

export const setLogin = status => dispatch => {
  dispatch({type: actions.SET_LOGIN, status});
};

export const changePassword =
  ({oldPassword, password, confirmPassword}) =>
  async dispatch => {
    try {
      const changePasswordRequest = new ChangePasswordRequest();
      changePasswordRequest.setOldPassword(oldPassword);
      changePasswordRequest.setNewPassword(password);
      changePasswordRequest.setRePassword(confirmPassword);

      const loginServ = new Login(deps, changePasswordRequest);
      const token = await storage.load({key: 'token'});
      await loginServ.changePassword(token.token);
      dispatch({type: actions.CHANGE_PASSWORD_SUCCESS});
    } catch (e) {
      dispatch({type: actions.CHANGE_PASSWORD_FAILED, error: e});
      throw new Error(e);
    }
  };

export const giveRating = (legalizeId, idx) => async dispatch => {
  try {
    let legalizeProto = new Legalize();
    legalizeProto.setRating(idx);
    legalizeProto.setId(legalizeId);
    const legalizeService = new LegalizeService(deps, legalizeProto);
    const token = await storage.load({key: 'token'});
    await legalizeService.rating(token.token);
    // await loginServ.changePassword(token.token);
    dispatch({type: actions.GIVE_RATING_SUCCESS});
  } catch (e) {
    dispatch({type: actions.GIVE_RATING_FAILED, error: e});
    throw new Error(e);
  }
};
