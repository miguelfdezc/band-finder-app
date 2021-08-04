import { ActionTypes, DefaultState } from '../types';

const reducer = (state = DefaultState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, authUser: action.data };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        authUser: DefaultState.authUser,
        currentUser: DefaultState.currentUser,
      };
    case ActionTypes.GET_USER_SUCCESS:
      return { ...state, currentUser: action.data };
    default:
      return state;
  }
};
export default reducer;
