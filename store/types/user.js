export const UserActionTypes = {
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  EDIT_USER: 'EDIT_USER',
  EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
};

export const UserDefaultState = () => ({
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
    photoURL: 'https://image.flaticon.com/icons/png/512/848/848043.png',
    tokensValidAfterTime: '',
    ubicacion: '',
    uid: '',
    usuario: '',
    valoracion: 0,
  },
});
