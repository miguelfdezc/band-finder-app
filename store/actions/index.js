import { ActionTypes } from '../types';

export const signUpAction = (usuario, email, password) => ({
  type: ActionTypes.SIGNUP,
  usuario,
  email,
  password,
});

export const loginAction = (email, password) => ({
  type: ActionTypes.LOGIN,
  email,
  password,
});

export const logoutAction = () => ({
  type: ActionTypes.LOGOUT,
});

export const getUserAction = (uid) => ({
  type: ActionTypes.GET_USER,
  uid,
});

export const editUserAction = (uid, data) => ({
  type: ActionTypes.EDIT_USER,
  uid,
  data,
});

export const loginActionSuccess = (data) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  data,
});

export const logoutActionSuccess = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});

export const getUserActionSuccess = (data) => ({
  type: ActionTypes.GET_USER_SUCCESS,
  data,
});

export const editUserActionSuccess = (data) => ({
  type: ActionTypes.EDIT_USER_SUCCESS,
  data,
});
