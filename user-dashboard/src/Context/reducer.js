import * as ACTION from "./action";

// initial state
export const AUTH_STATE = {
  isAuthenticated: false,
  message: "FAIL",
  loading: false,
};

// store state to localstorage
export const persistState = () => {
  try {
    const local = localStorage.getItem("auth");
    if (local === null) return undefined;
    return JSON.parse(local);
  } catch (e) {
    return undefined;
  }
};

// Authentication Reducer
export const Reducer = (state = AUTH_STATE, action) => {
  switch (action.type) {
    case ACTION.LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        message: "REQ",
        isAuthenticated: false,
      };
    case ACTION.LOGIN_SUCCESS:
      window.localStorage.setItem("auth", JSON.stringify());
      return {
        ...state,
        loading: false,
        message: "SUCCESS",
        isAuthenticated: true,
      };
    case ACTION.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        message: "FAIL",
        isAuthenticated: false,
      };
    case ACTION.REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        message: "REQ",
      };
    case ACTION.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "SUCCESS",
      };
    case ACTION.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        message: "FAIL",
      };
    case ACTION.LOGOUT:
      return {
        ...state,
        loading: false,
        message: "LOGOUT",
        isAuthenticated: "false",
      };
    default:
      return state;
  }
};
