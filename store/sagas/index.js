import { put, takeLatest, all, call } from 'redux-saga/effects';
import { auth } from '../../config';
import axios from 'axios';
import { loginActionSuccess, logoutActionSuccess } from '../actions';
import { ActionTypes } from '../types';
import * as RootNavigation from '../../navigation/RootNavigation';
import Constants from 'expo-constants';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* signUp(action) {
  try {
    const { usuario, email, password } = action;
    yield call(() =>
      axios.post(`${API_BASE_PATH}/register/musicos`, {
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

/* function* getUser() {
  axios
    .get(`${API_BASE_PATH}/usuarios/${uid}?uid=${uid}`)
    .then((response) => setUsuario(response.data.user))
    .catch((err) => alert(err));
} */

export default function* rootSaga() {
  yield all([
    takeLatest(ActionTypes.SIGNUP, signUp),
    takeLatest(ActionTypes.LOGIN, login),
    takeLatest(ActionTypes.LOGOUT, logout),
  ]);
}
