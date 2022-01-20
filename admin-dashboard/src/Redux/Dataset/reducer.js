import {
  POST_DATASET,
  GET_DATASET,
  GET_DATASET_PAGE,
  DELETE_DATASET_ID,
} from "./action";
import { FAILED_REQUEST } from "../User/action";

// initial state for dataset
export const DATASET_STATE = {
  dataset: [],
  results: [],
  method: "",
  status: "",
};

// Reducer for Dataset state
export const DatasetReducer = (state = DATASET_STATE, action) => {
  switch (action.type) {
    case GET_DATASET:
      return {
        ...state,
        method: "GET",
        dataset: action.payload.results,
        results: action.payload,
        status: "SUCCESS",
      };
    case GET_DATASET_PAGE:
      return {
        ...state,
        method: "GET PAGE",
        dataset: action.payload.results,
        results: action.payload,
        status: "SUCCESS",
      };
    case POST_DATASET:
      return {
        ...state,
        method: "POST add Data",
        status: "SUCCESS",
      };
    case DELETE_DATASET_ID:
      return {
        ...state,
        method: "DELETE",
        status: "SUCCESS",
      };
    case FAILED_REQUEST:
      return {
        ...state,
        method: "ERROR",
        status: "FAILED",
      };
    default:
      return state;
  }
};
