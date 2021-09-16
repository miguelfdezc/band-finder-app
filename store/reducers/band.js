import { BandActionTypes, BandDefaultState } from '../types/band';

export const bandReducer = (state = BandDefaultState(), action) => {
  switch (action.type) {
    case BandActionTypes.CREATE_BAND_SUCCESS:
      return { ...state, band: action.data };
    default:
      return state;
  }
};
