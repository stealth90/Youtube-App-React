import { DO_LOGIN } from "../actions/auth/const";

const initialState = {
  login: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DO_LOGIN: {
      state.login.push(action.payload);
      return {
        ...state,
        login: state.login.concat(action.payload),
      };
    }
    default:
      return state;
  }
};
