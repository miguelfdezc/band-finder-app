import { EventActionTypes } from '../types/event';

export const getEventsAction = () => ({
  type: EventActionTypes.GET_EVENTS,
});

export const createEventAction = (data) => ({
  type: EventActionTypes.CREATE_EVENT,
  data,
});

export const getEventAction = (id) => ({
  type: EventActionTypes.GET_EVENT,
  id,
});

export const updateSubscribedAction = (id, usuario, fechaInicio) => ({
  type: EventActionTypes.UPDATE_SUBSCRIBED,
  id,
  usuario,
  fechaInicio,
});

export const getEventsSubscribedAction = (uid) => ({
  type: EventActionTypes.GET_EVENTS_SUBSCRIBED,
  uid,
});

export const getEventsUserAction = (id, uid) => ({
  type: EventActionTypes.GET_EVENTS_USER,
  id,
  uid,
});

export const getEventsActionSuccess = (data) => ({
  type: EventActionTypes.GET_EVENTS_SUCCESS,
  data,
});

export const createEventActionSuccess = (data) => ({
  type: EventActionTypes.CREATE_EVENT_SUCCESS,
  data,
});

export const getEventActionSuccess = (data) => ({
  type: EventActionTypes.GET_EVENT_SUCCESS,
  data,
});

export const updateSubscribedActionSuccess = (data) => ({
  type: EventActionTypes.UPDATE_SUBSCRIBED_SUCCESS,
  data,
});

export const getEventsSubscribedActionSuccess = (data) => ({
  type: EventActionTypes.GET_EVENTS_SUBSCRIBED_SUCCESS,
  data,
});

export const getEventsUserActionSuccess = (data) => ({
  type: EventActionTypes.GET_EVENTS_USER_SUCCESS,
  data,
});
