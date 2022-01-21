export const AuthActionTypes = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

export const AuthDefaultState = () => ({
  authUser: {
    // uid: '1Qw0Nr34SERXZVQmarYX6D2Ow2r2', // Músic@
    uid: 'EVpPrpQ3jMfeVQbMhhEft0eyzGD2', // Negocio
  },
});
