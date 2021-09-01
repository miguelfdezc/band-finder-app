import { EventActionTypes } from '../types/event';

export const getEventsAction = () => ({
  type: EventActionTypes.GET_EVENTS,
});
export const getEventsActionSuccess = (data) => ({
  type: EventActionTypes.GET_EVENTS_SUCCESS,
  data,
});
