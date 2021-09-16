import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { BandActionTypes } from '../types/band';
import Constants from 'expo-constants';
import * as RootNavigation from '../../navigation/RootNavigation';
import { Alert } from 'react-native';
import { createBandActionSuccess } from '../actions/band';

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

export function* bandSaga() {
  yield all([takeLatest(BandActionTypes.CREATE_BAND, createBand)]);
}
