import {deps} from '../../services/tracert';
import {User, LoginInput} from '../../proto/single-proto_pb';
import userService from '../../services/user';
import loginService from '../../services/login';
import storage from './storage';

export const actions = {
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILED: 'CREATE_USER_FAILED',
  GET_USER: 'GET_USER',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
};

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
        data: data.token,
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
    loginInput.setEmail(`${email}`);
    loginInput.setPassword(`${password}`);
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
        data: data.token,
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
