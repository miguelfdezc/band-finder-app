import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import { getEventsActionSuccess } from '../actions';
import { EventActionTypes } from '../types/event';
import Constants from 'expo-constants';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* getEvents() {
  try {
    const response = yield call(axios.get, `${API_BASE_PATH}/events`);
    yield put(getEventsActionSuccess(response.data.events));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* eventSaga() {
  yield all([takeLatest(EventActionTypes.GET_EVENTS, getEvents)]);
}
