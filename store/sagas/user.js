import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { getUserActionSuccess, editUserActionSuccess } from '../actions';
import { UserActionTypes } from '../types/user';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* getUser(action) {
  try {
    const { uid } = action;
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}/users/${uid}?uid=${uid}`
    );
    yield put(getUserActionSuccess(response.data.user));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* editUser(action) {
  try {
    const { uid } = action;
    const response = yield call(
      axios.put,
      `${API_BASE_PATH}/users/${uid}?uid=${uid}`,
      action.data
    );
    yield put(editUserActionSuccess(response.data.user));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* updateFans(action) {
  try {
    const { uid, data } = action;
    const response = yield call(
      axios.put,
      `${API_BASE_PATH}/users/${uid}/fans?uid=${uid}`,
      action.data
    );
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* userSaga() {
  yield all([
    takeLatest(UserActionTypes.GET_USER, getUser),
    takeLatest(UserActionTypes.EDIT_USER, editUser),
    takeLatest(UserActionTypes.UPDATE_FANS, updateFans),
  ]);
}
