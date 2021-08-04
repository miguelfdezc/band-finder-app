import { put, takeLatest, all, call } from 'redux-saga/effects';
import { auth } from '../../config';
import axios from 'axios';
import {
  loginActionSuccess,
  logoutActionSuccess,
  getUserActionSuccess,
} from '../actions';
import { ActionTypes } from '../types';
import * as RootNavigation from '../../navigation/RootNavigation';
import Constants from 'expo-constants';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* signUp(action) {
  try {
    const { usuario, email, password } = action;
    yield call(() =>
      axios.post(`${API_BASE_PATH}/users/musicos`, {
        usuario,
        email,
        password,
      })
    );
    yield call(() => RootNavigation.navigate('Login'));
  } catch (error) {
    if (error.response.data.message) console.error(error.response.data.message);
    else console.error(`ERROR: ${error.message}`);
  }
}

function* login(action) {
  try {
    const { email, password } = action;
    yield call(() => auth.signInWithEmailAndPassword(email, password));
    yield put(loginActionSuccess(auth.currentUser));
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

function* logout() {
  try {
    yield call(() => auth.signOut());
    yield put(logoutActionSuccess());
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

function* getUser(action) {
  try {
    const { uid } = action;
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}/users/${uid}?uid=${uid}`
    );
    yield put(getUserActionSuccess(response.data.user));
  } catch (error) {
    if (error.response.data.message) console.error(error.response.data.message);
    else console.error(`ERROR: ${error.message}`);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(ActionTypes.SIGNUP, signUp),
    takeLatest(ActionTypes.LOGIN, login),
    takeLatest(ActionTypes.LOGOUT, logout),
    takeLatest(ActionTypes.GET_USER, getUser),
  ]);
}
