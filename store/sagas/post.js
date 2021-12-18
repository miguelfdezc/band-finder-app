import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  deletePostActionSuccess,
  getPostActionSuccess,
  getPostsUserActionSuccess,
  updateLikesActionSuccess,
  updateSharedActionSuccess,
  getPostsFollowedActionSuccess,
} from '../actions';
import { PostActionTypes } from '../types/post';
import * as RootNavigation from '../../navigation/RootNavigation';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

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

function* getPost(action) {
  try {
    const { id } = action;
    const response = yield call(axios.get, `${API_BASE_PATH}/posts/${id}`);
    yield put(getPostActionSuccess(response.data.post));
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* editPost(action) {
  try {
    const { id, data } = action;
    yield call(axios.put, `${API_BASE_PATH}/posts/${id}`, data);
    yield call(() => RootNavigation.goBack());
  } catch (error) {
    if (error.response.data.message) Alert.alert(error.response.data.message);
    else Alert.alert(`ERROR: ${error.message}`);
  }
}

function* getPostsFollowed(action) {
  try {
    const { uid } = action;
    const response = yield call(
      axios.get,
      `${API_BASE_PATH}/posts/user/${uid}/followed?uid=${uid}`
    );
    yield put(getPostsFollowedActionSuccess(response.data.posts));
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
    takeLatest(PostActionTypes.GET_POST, getPost),
    takeLatest(PostActionTypes.EDIT_POST, editPost),
    takeLatest(PostActionTypes.GET_POSTS_FOLLOWED, getPostsFollowed),
  ]);
}
