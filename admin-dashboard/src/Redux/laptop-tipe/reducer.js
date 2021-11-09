import * as ACTION from "./action";

export const TYPE_STATE = {
  loading: false,
  status: "",
  data: [],
};

export const Type_Reducer = (state = TYPE_STATE, action) => {
  switch (action.type) {
    case ACTION.REQUEST:
      return {
        ...state,
        loading: true,
        status: "REQUEST",
      };
    case ACTION.FAILED_REQ:
      return {
        ...state,
        loading: false,
        status: "FAILED",
      };
    case ACTION.GET_TYPE:
      return {
        ...state,
        loading: true,
        status: "GET",
        data: action.payload.data,
      };
    case ACTION.POST_TYPE:
      return {
        ...state,
        loading: true,
        status: "POST",
        data: action.payload.data,
      };
    case ACTION.PATCH_TYPE:
      return {
        ...state,
        loading: true,
        status: "PATCH",
        data: action.payload.data,
      };
    case ACTION.DELETE_TYPE:
      return {
        ...state,
        loading: true,
        status: "DELETE",
      };
    default:
      return state;
  }
};
