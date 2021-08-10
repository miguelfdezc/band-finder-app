import { AuthActionTypes } from '../types/auth';

export const signUpAction = (usuario, email, password) => ({
  type: AuthActionTypes.SIGNUP,
  usuario,
  email,
  password,
});

export const loginAction = (email, password) => ({
  type: AuthActionTypes.LOGIN,
  email,
  password,
});

export const logoutAction = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const loginActionSuccess = (data) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  data,
});

export const logoutActionSuccess = () => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});
