export const EventActionTypes = {
  GET_EVENTS: 'GET_EVENTS',
  GET_EVENTS_SUCCESS: 'GET_EVENTS_SUCCESS',
  CREATE_EVENT: 'CREATE_EVENT',
  CREATE_EVENT_SUCCESS: 'CREATE_EVENT_SUCCESS',
  GET_EVENT: 'GET_EVENT',
  GET_EVENT_SUCCESS: 'GET_EVENT_SUCCESS',
  UPDATE_SUBSCRIBED: 'UPDATE_SUBSCRIBED',
  UPDATE_SUBSCRIBED_SUCCESS: 'UPDATE_SUBSCRIBED_SUCCESS',
  GET_EVENTS_SUBSCRIBED: 'GET_EVENTS_SUBSCRIBED',
  GET_EVENTS_SUBSCRIBED_SUCCESS: 'GET_EVENTS_SUBSCRIBED_SUCCESS',
};

export const EventDefaultState = () => ({
  eventos: [],
  evento: {
    usuario: '',
    titulo: '',
    descripcion: '',
    tipo: 'puntual',
    imagen: 'https://via.placeholder.com/1000x1000.png?text=Image',
    fechaInicio: '',
    fechaFin: '',
    horaInicio: '',
    horaFin: '',
    ubicacion: '',
  },
  eventosSuscrito: [],
});
