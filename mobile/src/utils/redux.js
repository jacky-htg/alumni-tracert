import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {actions} from './actions';
import {combineReducers} from 'redux';

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
      case actions.CREATE_USER_SUCCESS:
        return true;
      default:
        return state;
    }
  },
  alumniList: (state = [], action) => {
    switch (action.type) {
      case actions.GET_ALUMNI_LIST_SUCCESS:
        return [...state, action.data];
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
