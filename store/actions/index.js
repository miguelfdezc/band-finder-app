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

export const loginActionSuccess = (data) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  data,
});

export const logoutActionSuccess = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});
