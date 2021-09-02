import { EventActionTypes } from '../types/event';

export const getEventsAction = () => ({
  type: EventActionTypes.GET_EVENTS,
});

export const createEventAction = (data) => ({
  type: EventActionTypes.CREATE_EVENT,
  data,
});

export const getEventsActionSuccess = (data) => ({
  type: EventActionTypes.GET_EVENTS_SUCCESS,
  data,
});

export const createEventActionSuccess = (data) => ({
  type: EventActionTypes.CREATE_EVENT_SUCCESS,
  data,
});
