import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { BandActionTypes } from '../types/band';
import Constants from 'expo-constants';
import * as RootNavigation from '../../navigation/RootNavigation';
import { Alert } from 'react-native';
import {
  createBandActionSuccess,
  submitApplicationActionSuccess,
  getBandsByFounderActionSuccess,
  getBandActionSuccess,
} from '../actions/band';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* createBand(action) {
  try {
    const { data } = action;
    const response = yield call(axios.post, `${API_BASE_PATH}/bands`, data);
    yield put(createBandActionSuccess(response.data.band));
    yield call(() => RootNavigation.goBack());
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* submitApplication(action) {
  try {
    const { id, usuario, instrumento } = action;
    const response = yield call(
      axios.post,
      `${API_BASE_PATH}/bands/${id}/application`,
      { usuario, instrumento }
    );
    yield put(submitApplicationActionSuccess(response.data.application));
    yield call(() => RootNavigation.goBack());
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* getBandsByFounder(action) {
  try {
    const { id, uid } = action;
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}/bands/${id}/founder?uid=${uid}`
    );
    yield put(getBandsByFounderActionSuccess(response.data.bands));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* getBand(action) {
  try {
    const { id } = action;
    const response = yield call(axios.get, `${API_BASE_PATH}/bands/${id}`);
    yield put(getBandActionSuccess(response.data.band));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* editBand(action) {
  try {
    const { id, uid, data } = action;
    yield call(axios.put, `${API_BASE_PATH}/bands/${id}?uid=${uid}`, data);
    yield call(() => RootNavigation.goBack());
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* updateMembers(action) {
  try {
    const { id, uid, data } = action;
    yield call(
      axios.put,
      `${API_BASE_PATH}/bands/${id}/members?uid=${uid}`,
      data
    );
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* bandSaga() {
  yield all([
    takeLatest(BandActionTypes.CREATE_BAND, createBand),
    takeLatest(BandActionTypes.SUBMIT_APPLICATION, submitApplication),
    takeLatest(BandActionTypes.GET_BANDS_FOUNDER, getBandsByFounder),
    takeLatest(BandActionTypes.GET_BAND, getBand),
    takeLatest(BandActionTypes.EDIT_BAND, editBand),
    takeLatest(BandActionTypes.UPDATE_MEMBERS, updateMembers),
  ]);
}
