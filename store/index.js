import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth';
import { userReducer } from './reducers/user';
import { postReducer } from './reducers/post';
import { all } from 'redux-saga/effects';
import { authSaga } from './sagas/auth';
import { postSaga } from './sagas/post';
import { userSaga } from './sagas/user';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga()]);
}
