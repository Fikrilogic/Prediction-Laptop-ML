import {
  POST_DATASET,
  UPLOAD_EXCEL,
  GET_DATASET,
  DELETE_ALL_DATASET,
  GET_DATASET_PAGE,
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
    case UPLOAD_EXCEL:
      return {
        ...state,
        method: "POST upload file",
        status: "SUCCESS",
      };
    case POST_DATASET:
      return {
        ...state,
        method: "POST add Data",
        status: "SUCCESS",
      };
    case DELETE_ALL_DATASET:
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
