import { BandActionTypes } from '../types/band';

export const createBandAction = (data) => ({
  type: BandActionTypes.CREATE_BAND,
  data,
});

export const createBandActionSuccess = (data) => ({
  type: BandActionTypes.CREATE_BAND_SUCCESS,
  data,
});
