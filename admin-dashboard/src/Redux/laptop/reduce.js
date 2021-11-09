import {
  LAPTOP_REQUEST,
  REQUEST_FAILED,
  GET_LAPTOP,
  POST_LAPTOP,
  UPDATE_LAPTOP,
  DELETE_LAPTOP,
} from "./action";

export const Laptop_State = {
  loading: false,
  status: "",
  laptops: [],
};

export const LaptopReducer = (state = Laptop_State, action) => {
  switch (action.type) {
    case LAPTOP_REQUEST:
      return {
        ...state,
        loading: true,
        status: "REQUEST",
      };
    case REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        status: "FAILED",
      };
    case GET_LAPTOP:
      return {
        ...state,
        loading: false,
        status: "GET",
        laptop: action.payload.laptop,
      };
    case UPDATE_LAPTOP:
      return {
        ...state,
        loading: false,
        status: "PATCH",
        laptop: action.payload.laptop,
      };
    case POST_LAPTOP:
      return {
        ...state,
        loading: false,
        status: "POST",
        laptop: action.payload.laptop,
      };
    case DELETE_LAPTOP:
      return {
        ...state,
        loading: false,
        status: "DELETE",
      };
    default:
      return state;
  }
};
