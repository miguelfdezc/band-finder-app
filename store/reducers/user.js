import { UserActionTypes, UserDefaultState } from '../types/user';

export const userReducer = (state = UserDefaultState(), action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER_SUCCESS:
      return { ...state, currentUser: action.data };
    default:
      return state;
  }
};
