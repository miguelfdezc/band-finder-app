import { ActionTypes, DefaultState } from '../types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, authUser: action.data };
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, authUser: DefaultState.authUser };
    default:
      return state;
  }
};
export default reducer;
