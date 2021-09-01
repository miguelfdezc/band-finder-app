import { EventActionTypes, EventDefaultState } from '../types/event';

export const eventReducer = (state = EventDefaultState(), action) => {
  switch (action.type) {
    case EventActionTypes.GET_EVENTS_SUCCESS:
      return { ...state, eventos: action.data };
    default:
      return state;
  }
};
