import { EventActionTypes, EventDefaultState } from '../types/event';

export const eventReducer = (state = EventDefaultState(), action) => {
  switch (action.type) {
    case EventActionTypes.GET_EVENTS_SUCCESS:
      return { ...state, eventos: action.data };
    case EventActionTypes.GET_EVENT_SUCCESS:
      return { ...state, evento: action.data };
    case EventActionTypes.GET_EVENTS_SUBSCRIBED_SUCCESS:
      return { ...state, eventosSuscrito: action.data };
    case EventActionTypes.GET_EVENTS_USER_SUCCESS:
      return { ...state, eventosUsuario: action.data };
    default:
      return state;
  }
};
