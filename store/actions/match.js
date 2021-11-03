import { MatchActionTypes } from '../types/match';

export const matchBandAction = (data) => ({
  type: MatchActionTypes.MATCH_BAND,
  data,
});

export const matchBandActionSuccess = (data) => ({
  type: MatchActionTypes.MATCH_BAND_SUCCESS,
  data,
});
