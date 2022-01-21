import { REQUEST_USER, FAILED_REQUEST, POST_USER, GET_USER } from "./action";

// initial state
export const USER_STATE = {
  loading: false,
  users: [],
  method: "",
  status: "",
};

// Reducer for Data User
export const UserReducer = (state = USER_STATE, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
        status: "ONGOING",
      };
    case GET_USER:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        method: "GET",
        users: action.payload.user,
        status: "SUCCESS",
      };
    case POST_USER:
      return {
        ...state,
        loading: false,
        method: "POST",
        users: action.payload.user,
        status: "SUCCESS",
      };
    case FAILED_REQUEST:
      return {
        ...state,
        status: "FAILED",
      };
    default:
      return state;
  }
};
