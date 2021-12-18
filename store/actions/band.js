import { BandActionTypes } from '../types/band';

export const createBandAction = (data) => ({
  type: BandActionTypes.CREATE_BAND,
  data,
});

export const submitApplicationAction = (id, usuario, instrumento) => ({
  type: BandActionTypes.SUBMIT_APPLICATION,
  id,
  usuario,
  instrumento,
});

export const getBandsByFounderAction = (id, uid) => ({
  type: BandActionTypes.GET_BANDS_FOUNDER,
  id,
  uid,
});

export const getBandAction = (id) => ({
  type: BandActionTypes.GET_BAND,
  id,
});

export const editBandAction = (id, uid, data) => ({
  type: BandActionTypes.EDIT_BAND,
  id,
  uid,
  data,
});

export const updateMembersAction = (id, uid, data) => ({
  type: BandActionTypes.UPDATE_MEMBERS,
  id,
  uid,
  data,
});

export const createBandActionSuccess = (data) => ({
  type: BandActionTypes.CREATE_BAND_SUCCESS,
  data,
});

export const submitApplicationActionSuccess = (data) => ({
  type: BandActionTypes.SUBMIT_APPLICATION_SUCCESS,
  data,
});

export const getBandsByFounderActionSuccess = (data) => ({
  type: BandActionTypes.GET_BANDS_FOUNDER_SUCCESS,
  data,
});

export const getBandActionSuccess = (data) => ({
  type: BandActionTypes.GET_BAND_SUCCESS,
  data,
});
