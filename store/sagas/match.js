import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { MatchActionTypes } from '../types/match';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
import { matchBandActionSuccess } from '../actions/match';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* matchBand(action) {
  try {
    const { data } = action;
    const response = yield call(axios.post, `${API_BASE_PATH}/matching`, data);
    yield put(matchBandActionSuccess(response.data.match));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* matchSaga() {
  yield all([takeLatest(MatchActionTypes.MATCH_BAND, matchBand)]);
}
