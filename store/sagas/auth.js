import { put, takeLatest, all, call } from 'redux-saga/effects';
import { auth } from '../../config';
import axios from 'axios';
import { loginActionSuccess, logoutActionSuccess } from '../actions';
import { AuthActionTypes } from '../types/auth';
import * as RootNavigation from '../../navigation/RootNavigation';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* signUp(action) {
  try {
    const { usuario, email, password, tipo } = action;
    yield call(() =>
      axios.post(`${API_BASE_PATH}/users/${tipo}`, {
        usuario,
        email,
        password,
      })
    );
    yield call(() => RootNavigation.navigate('Login'));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* login(action) {
  try {
    const { email, password } = action;
    yield call(() => auth.signInWithEmailAndPassword(email, password));
    yield put(loginActionSuccess(auth.currentUser));
  } catch (error) {
    Alert.alert(`ERROR: ${error.message}`);
  }
}

function* logout() {
  try {
    yield call(() => auth.signOut());
    yield put(logoutActionSuccess());
  } catch (error) {
    Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* authSaga() {
  yield all([
    takeLatest(AuthActionTypes.SIGNUP, signUp),
    takeLatest(AuthActionTypes.LOGIN, login),
    takeLatest(AuthActionTypes.LOGOUT, logout),
  ]);
}
