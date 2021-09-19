import {deps} from '../../services/tracert';
import {
  User,
  LoginInput,
  ListInput,
  AlumniAppraiser,
  Alumni,
} from '../../proto/single-proto_pb';
//
import userService from '../../services/user';
import loginService from '../../services/login';
import alumniService from '../../services/alumni';
import AlumniListService from '../../services/alumniList';
import appraiserService from '../../services/appraiser';
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
};

export const createUser = (name, email) => async dispatch => {
  try {
    const userProto = new User();
    userProto.setUserType(2); // 2 = appraiser
    userProto.setName(name);
    userProto.setEmail(email);
    console.log('NAME =', name, email);
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
    return error;
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
    return error;
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
    return error;
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
      return error;
    }
  };
