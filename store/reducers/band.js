import { BandActionTypes, BandDefaultState } from '../types/band';

export const bandReducer = (state = BandDefaultState(), action) => {
  switch (action.type) {
    case BandActionTypes.CREATE_BAND_SUCCESS:
      return { ...state, band: action.data };
    case BandActionTypes.GET_BANDS_FOUNDER_SUCCESS:
      return { ...state, myBands: action.data };
    case BandActionTypes.GET_BAND_SUCCESS:
      return { ...state, editBand: action.data };
    default:
      return state;
  }
};
