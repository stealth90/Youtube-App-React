import * as constants from "./constants";

export const login = (payload) => ({
  type: constants.DO_LOGIN,
  payload,
});

export const logout = () => ({
  type: constants.DO_LOGOUT,
});

export const authenticated = (payload) => {
  return {
    type: constants.AUTHENTICATED,
  };
};

export const loginError = (error) => {
  return {
    type: constants.LOGIN_ERROR,
    payload: error,
  };
};

export const logoutDone = () => ({
  type: constants.LOGOUT_DONE,
});

export default { login, logout, authenticated, loginError, logoutDone };
