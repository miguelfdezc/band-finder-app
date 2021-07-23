import { put, takeLatest, all, call } from 'redux-saga/effects';
import { auth } from '../../config';
import axios from 'axios';
import { loginActionSuccess } from '../actions';
import { ActionTypes } from '../types';

function* login(action) {
  try {
    const { email, password } = action;
    yield call(() => auth.signInWithEmailAndPassword(email, password));
    yield put(loginActionSuccess(auth.currentUser));
  } catch (err) {
    alert(`ERROR: ${error.message}`);
  }
}

function* logout(action) {
  try {
    yield call(() => auth.signOut());
    yield put(logoutActionSuccess());
  } catch (err) {
    alert(`ERROR: ${error.message}`);
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
    takeLatest(ActionTypes.LOGIN, login),
    takeLatest(ActionTypes.LOGOUT, logout),
  ]);
}
