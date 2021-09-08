import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  getEventsActionSuccess,
  getEventActionSuccess,
  updateSubscribedActionSuccess,
  getEventsSubscribedActionSuccess,
} from '../actions';
import { EventActionTypes } from '../types/event';
import Constants from 'expo-constants';
import * as RootNavigation from '../../navigation/RootNavigation';
import { Alert } from 'react-native';

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

function* createEvent(action) {
  try {
    const { data } = action;
    yield call(axios.post, `${API_BASE_PATH}/events`, data);
    yield call(() => RootNavigation.navigate('Events'));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* getEvent(action) {
  try {
    const { id } = action;
    const response = yield call(axios.get, `${API_BASE_PATH}/events/${id}`);
    yield put(getEventActionSuccess(response.data.event));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* updateSubscribed(action) {
  try {
    const { id, usuario, fechaInicio: fecha } = action;
    const response = yield call(
      axios.put,
      `${API_BASE_PATH}/events/${id}/subscription`,
      {
        usuario,
        fecha,
      }
    );
    yield put(updateSubscribedActionSuccess(response.data.event));
    yield call(() => RootNavigation.goBack());
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* getEventsSubscribed(action) {
  try {
    const { uid } = action;
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}/events/${uid}/subscription`
    );
    yield put(getEventsSubscribedActionSuccess(response.data.events));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* eventSaga() {
  yield all([
    takeLatest(EventActionTypes.GET_EVENTS, getEvents),
    takeLatest(EventActionTypes.CREATE_EVENT, createEvent),
    takeLatest(EventActionTypes.GET_EVENT, getEvent),
    takeLatest(EventActionTypes.UPDATE_SUBSCRIBED, updateSubscribed),
    takeLatest(EventActionTypes.GET_EVENTS_SUBSCRIBED, getEventsSubscribed),
  ]);
}
