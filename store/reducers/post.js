import { PostActionTypes, PostDefaultState } from '../types/post';

export const postReducer = (state = PostDefaultState(), action) => {
  switch (action.type) {
    case PostActionTypes.GET_POSTS_SUCCESS:
      return { ...state, publicaciones: action.data };
    case PostActionTypes.UPDATE_LIKES_SUCCESS:
      let publicaciones = state.publicaciones;
      publicaciones = publicaciones.map((value) => {
        if (value.id === action.data.id) value.likes = action.data.likes;
        return value;
      });
      return { ...state, publicaciones };
    case PostActionTypes.UPDATE_SHARED_SUCCESS:
      publicaciones = state.publicaciones;
      publicaciones = publicaciones.map((value) => {
        if (value.id === action.data.id) value.shared = action.data.shared;
        return value;
      });
      return { ...state, publicaciones };
    case PostActionTypes.DELETE_POST_SUCCESS:
      publicaciones = state.publicaciones;
      publicaciones = publicaciones.filter(
        (value) => value.id !== action.data.id
      );
      return { ...state, publicaciones };
    case PostActionTypes.GET_POST_SUCCESS:
      return { ...state, publicacion: action.data };
    case PostActionTypes.EDIT_POST_SUCCESS:
      publicaciones = state.publicaciones;
      publicaciones = publicaciones.map((value) => {
        if (value.id === action.data.id) value = action.data;
        return value;
      });
      return { ...state, publicaciones, publicacion: action.data };
    case PostActionTypes.GET_POSTS_FOLLOWED_SUCCESS:
      return { ...state, publicacionesSeguidos: action.data };
    default:
      return state;
  }
};
