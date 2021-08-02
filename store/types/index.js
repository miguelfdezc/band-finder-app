export const ActionTypes = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
};

export const DefaultState = {
  authUser: {},
  currentUser: {
    actuaciones: 0,
    customClaims: {
      admin: false,
      type: '',
    },
    descripcion: '',
    disabled: false,
    email: '',
    emailVerified: false,
    fans: 0,
    imagenFondo: '',
    metadata: {
      creationTime: '',
      lastSignInTime: '',
    },
    photoURL: 'https://image.flaticon.com/icons/png/512/848/848043.png',
    providerData: [
      {
        email: '',
        photoURL: '',
        providerId: 'password',
        uid: '',
      },
    ],
    tokensValidAfterTime: '',
    ubicacion: '',
    uid: '',
    usuario: '',
    valoracion: 0,
  },
};
