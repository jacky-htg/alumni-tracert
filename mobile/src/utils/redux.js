import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {actions} from './actions';
import {combineReducers} from 'redux';
import {useState} from 'react';

const middlewares = [thunkMiddleware, createLogger()];

const reducer = combineReducers({
  user: (state = {}, action) => {
    switch (action.type) {
      case actions.CREATE_USER_SUCCESS:
        return {
          ...state,
          ...action.data,
        };
      default:
        return state;
    }
  },
  isLogin: (state = false, action) => {
    switch (action.type) {
      case actions.LOGIN_SUCCESS:
      case actions.CREATE_USER_SUCCESS:
        return true;
      case actions.LOGOUT:
        return false;
      case actions.SET_LOGIN:
        return action.status;
      default:
        return state;
    }
  },
  alumniList: (state = [], action) => {
    switch (action.type) {
      case actions.GET_ALUMNI_LIST_SUCCESS:
        if (!state.find(a => a.id === action.data.id)) {
          return [...state, action.data];
        }
        return state;
      default:
        return state;
    }
  },
  legalisirList: (state = [], action) => {
    switch (action.type) {
      case actions.GET_MY_LEGALISIR_LIST_SUCCESS:
        if (action.data) {
          return [...action.data];
        }
        return state;
      default:
        return state;
    }
  },
  detailCertificate: (state = {}, action) => {
    switch (action.type) {
      case actions.SET_DETAIL_IJAZAH:
        return {
          ...action.data,
        };
      default:
        return state;
    }
  },
  questionList: (state = [], action) => {
    switch (action.type) {
      case actions.GET_QUESTION_GROUP_LIST_SUCCESS:
        return [...action.data.questionGroupList];
      default:
        return state;
    }
  },
});

const store = createStore(
  reducer,
  {},
  compose(applyMiddleware(...middlewares)),
);
export default store;
