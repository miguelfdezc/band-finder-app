export const AuthActionTypes = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

export const AuthDefaultState = () => ({
  authUser: {
    uid: 'HhNJnbPpYEcSmb1s24sb4GEorw63', // Músic@
    // uid: 'EVpPrpQ3jMfeVQbMhhEft0eyzGD2', // Negocio
  },
});
