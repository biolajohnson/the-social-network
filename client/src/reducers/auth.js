import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_FAILED,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/types";

const initialState = {
  loading: true,
  user: null,
  isAuthenticated: null,
  token: localStorage.getItem("token"),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_FAILED:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        repos: [],
      };
    default:
      return state;
  }
};
