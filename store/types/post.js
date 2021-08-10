export const PostActionTypes = {
  GET_POSTS: 'GET_POSTS',
  GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',
  UPDATE_LIKES: 'UPDATE_LIKES',
  UPDATE_LIKES_SUCCESS: 'UPDATE_LIKES_SUCCESS',
  UPDATE_SHARED: 'UPDATE_SHARED',
  UPDATE_SHARED_SUCCESS: 'UPDATE_SHARED_SUCCESS',
  DELETE_POST: 'DELETE_POST',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
  CREATE_POST: 'CREATE_POST',
};

export const PostDefaultState = () => ({
  publicaciones: [],
});
