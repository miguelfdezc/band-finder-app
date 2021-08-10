import { PostActionTypes } from '../types/post';

export const getPostsUserAction = (uid) => ({
  type: PostActionTypes.GET_POSTS,
  uid,
});

export const updateLikesAction = (uid, id) => ({
  type: PostActionTypes.UPDATE_LIKES,
  uid,
  id,
});

export const updateSharedAction = (id) => ({
  type: PostActionTypes.UPDATE_SHARED,
  id,
});

export const deletePostAction = (id, uid) => ({
  type: PostActionTypes.DELETE_POST,
  id,
  uid,
});

export const createPostAction = (data) => ({
  type: PostActionTypes.CREATE_POST,
  data,
});

export const getPostAction = (id) => ({
  type: PostActionTypes.GET_POST,
  id,
});

export const editPostAction = (id, data) => ({
  type: PostActionTypes.EDIT_POST,
  id,
  data,
});

export const getPostsUserActionSuccess = (data) => ({
  type: PostActionTypes.GET_POSTS_SUCCESS,
  data,
});

export const updateLikesActionSuccess = (data) => ({
  type: PostActionTypes.UPDATE_LIKES_SUCCESS,
  data,
});

export const updateSharedActionSuccess = (data) => ({
  type: PostActionTypes.UPDATE_SHARED_SUCCESS,
  data,
});

export const deletePostActionSuccess = (data) => ({
  type: PostActionTypes.DELETE_POST_SUCCESS,
  data,
});

export const getPostActionSuccess = (data) => ({
  type: PostActionTypes.GET_POST_SUCCESS,
  data,
});

export const editPostActionSuccess = (data) => ({
  type: PostActionTypes.EDIT_POST_SUCCESS,
  data,
});
