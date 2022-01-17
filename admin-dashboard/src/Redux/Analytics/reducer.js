import {
  GET_ANALYTIC_RESULTS,
  GET_ANALYTIC_GRAPH,
  GET_CROSS_VALIDATION,
} from "./action";
import { FAILED_REQUEST } from "../User/action";

// initial state for dataset
export const DATASET_STATE = {
  analytic: [],
  crossVal: [],
  graph: [],
  method: "",
  status: "",
};

// Reducer for Dataset state
export const AnalyticReducer = (state = DATASET_STATE, action) => {
  switch (action.type) {
    case FAILED_REQUEST:
      return {
        ...state,
        method: "ERROR",
        status: "FAILED",
      };
    case GET_ANALYTIC_RESULTS:
      return {
        ...state,
        analytic: action.payload,
        method: "GET ANALYTIC",
        status: "SUCCESS",
      };
    case GET_ANALYTIC_GRAPH:
      return {
        ...state,
        graph: action.payload,
        method: "GET ANALYTIC",
        status: "SUCCESS",
      };
    case GET_CROSS_VALIDATION:
      return {
        ...state,
        crossVal: action.payload,
        method: "GET CROSS VALIDATION",
        status: "SUCCESS",
      };
    default:
      return state;
  }
};
