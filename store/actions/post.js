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
