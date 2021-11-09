import * as ACTION from "./action";

export const AUTH_STATE = {
  isAuthenticated: false,
  roles: "",
  message: "FAIL",
  loading: false,
};

export const persistState = () => {
  try {
    const local = localStorage.getItem("auth");
    if (local === null) return undefined;
    return JSON.parse(local);
  } catch (e) {
    return undefined;
  }
};

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
        roles: action.payload.roles,
      };
    case ACTION.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        message: "FAIL",
        isAuthenticated: false,
        roles: "",
      };
    case ACTION.LOGOUT:
      return {
        ...state,
        loading: false,
        message: "LOGOUT",
        isAuthenticated: "false",
        roles: "",
      };
    default:
      return state;
  }
};
