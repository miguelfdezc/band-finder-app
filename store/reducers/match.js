import { MatchActionTypes, MatchDefaultState } from '../types/match';

export const matchReducer = (state = MatchDefaultState(), action) => {
  switch (action.type) {
    case MatchActionTypes.MATCH_BAND_SUCCESS:
      return { ...state, bands: action.data };
    default:
      return state;
  }
};
