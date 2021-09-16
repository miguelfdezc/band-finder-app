import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth';
import { userReducer } from './reducers/user';
import { postReducer } from './reducers/post';
import { eventReducer } from './reducers/event';
import { bandReducer } from './reducers/band';
import { all } from 'redux-saga/effects';
import { authSaga } from './sagas/auth';
import { userSaga } from './sagas/user';
import { postSaga } from './sagas/post';
import { eventSaga } from './sagas/event';
import { bandSaga } from './sagas/band';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  event: eventReducer,
  band: bandReducer,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga(), eventSaga(), bandSaga()]);
}
