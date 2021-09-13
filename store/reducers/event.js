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
    case EventActionTypes.UPDATE_EVENT_SUCCESS:
      eventos = state.eventos;
      eventos = eventos.map((value) => {
        if (value.id === action.data.id) value = action.data;
        return value;
      });
      return { ...state, eventos, evento: action.data };
    case EventActionTypes.DELETE_EVENT_SUCCESS:
      eventos = state.eventos;
      eventos = eventos.filter((value) => value.id !== action.data.id);
      return { ...state, eventos };
    default:
      return state;
  }
};
