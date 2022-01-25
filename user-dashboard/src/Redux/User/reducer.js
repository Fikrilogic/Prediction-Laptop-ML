import {
  REQUEST_USER,
  FAILED_REQUEST,
  GET_USER,
  CONSULT_RESULT,
} from "./action";

// initial state
export const USER_STATE = {
  loading: false,
  profile: [],
  results: [],
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
      return {
        ...state,
        loading: false,
        method: "GET",
        profile: action.payload,
        status: "SUCCESS",
      };
    case CONSULT_RESULT:
      return {
        ...state,
        loading: false,
        method: "GET",
        results: action.payload,
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
