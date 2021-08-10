import { put, takeLatest, all, call } from 'redux-saga/effects';
import { auth } from '../../config';
import axios from 'axios';
import {
  deletePostActionSuccess,
  getPostsUserActionSuccess,
  updateLikesActionSuccess,
  updateSharedActionSuccess,
} from '../actions';
import { PostActionTypes } from '../types/post';
import * as RootNavigation from '../../navigation/RootNavigation';
import Constants from 'expo-constants';

const API_BASE_PATH = Constants.manifest.extra.apiBasePath;

function* getPostsUser(action) {
  try {
    const { uid } = action;
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}/posts/user/${uid}?uid=${uid}`
    );
    yield put(getPostsUserActionSuccess(response.data.posts));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* updateLikes(action) {
  try {
    const { uid, id } = action;
    const response = yield call(
      axios.put,
      `${API_BASE_PATH}/posts/likes/${id}`,
      { usuario: uid }
    );
    yield put(updateLikesActionSuccess(response.data.likes));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* updateShared(action) {
  try {
    const { id } = action;
    const response = yield call(
      axios.put,
      `${API_BASE_PATH}/posts/shares/${id}`
    );
    yield put(updateSharedActionSuccess(response.data.shared));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* deletePost(action) {
  try {
    const { id, uid } = action;
    const response = yield call(
      axios.delete,
      `${API_BASE_PATH}/posts/${id}?uid=${uid}`
    );
    yield put(deletePostActionSuccess(response.data));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* createPost(action) {
  try {
    const { data } = action;
    yield call(axios.post, `${API_BASE_PATH}/posts`, data);
    yield call(() => RootNavigation.navigate('Home'));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

export function* postSaga() {
  yield all([
    takeLatest(PostActionTypes.GET_POSTS, getPostsUser),
    takeLatest(PostActionTypes.UPDATE_LIKES, updateLikes),
    takeLatest(PostActionTypes.UPDATE_SHARED, updateShared),
    takeLatest(PostActionTypes.DELETE_POST, deletePost),
    takeLatest(PostActionTypes.CREATE_POST, createPost),
  ]);
}
