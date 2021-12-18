import { UserActionTypes } from '../types/user';

export const getUserAction = (uid) => ({
  type: UserActionTypes.GET_USER,
  uid,
});

export const editUserAction = (uid, data) => ({
  type: UserActionTypes.EDIT_USER,
  uid,
  data,
});

export const updateFansAction = (uid, data) => ({
  type: UserActionTypes.UPDATE_FANS,
  uid,
  data,
});

export const getUserActionSuccess = (data) => ({
  type: UserActionTypes.GET_USER_SUCCESS,
  data,
});

export const editUserActionSuccess = (data) => ({
  type: UserActionTypes.EDIT_USER_SUCCESS,
  data,
});
