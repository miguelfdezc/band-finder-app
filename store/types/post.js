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
  GET_POST: 'GET_POST',
  GET_POST_SUCCESS: 'GET_POST_SUCCESS',
  EDIT_POST: 'EDIT_POST',
  EDIT_POST_SUCCESS: 'EDIT_POST_SUCCESS',
};

export const PostDefaultState = () => ({
  publicaciones: [],
  publicacion: {
    shared: 0,
    imagen: '',
    video: '',
    descripcion: '',
    usuario: '',
    likes: [],
    comentarios: [],
  },
});
