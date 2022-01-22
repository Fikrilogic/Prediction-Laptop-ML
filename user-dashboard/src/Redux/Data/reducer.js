import {
  GET_COMPANY_DATA,
  GET_CPU_DATA,
  GET_GPU_DATA,
  GET_KEBUTUHAN_DATA,
  GET_RESOLUTION_DATA,
  GET_SCREEN_DATA,
  GET_STORAGE_DATA,
  GET_TYPE_DATA,
} from "./action";
import { FAILED_REQUEST } from "../User/action";

// initial state for dataset
export const DATA_STATE = {
  cpu: [],
  gpu: [],
  storage: [],
  screen: [],
  resolution: [],
  company: [],
  laptop_type: [],
  kebutuhan: [],
  method: "",
  status: "",
};

// Reducer for Dataset state
export const DataReducer = (state = DATA_STATE, action) => {
  switch (action.type) {
    case FAILED_REQUEST:
      return {
        ...state,
        method: "ERROR",
        status: "FAILED",
      };

    case GET_CPU_DATA:
      return {
        ...state,
        cpu: action.payload.results,
        method: "GET CPU DATA",
        status: "SUCCESS",
      };
    case GET_GPU_DATA:
      return {
        ...state,
        gpu: action.payload.results,
        method: "GET GPU DATA",
        status: "SUCCESS",
      };
    case GET_SCREEN_DATA:
      return {
        ...state,
        screen: action.payload.results,
        method: "GET SCREEN DATA",
        status: "SUCCESS",
      };
    case GET_RESOLUTION_DATA:
      return {
        ...state,
        resolution: action.payload.results,
        method: "GET RESOLUTION DATA",
        status: "SUCCESS",
      };
    case GET_COMPANY_DATA:
      return {
        ...state,
        company: action.payload.results,
        method: "GET COMPANY DATA",
        status: "SUCCESS",
      };
    case GET_TYPE_DATA:
      return {
        ...state,
        laptop_type: action.payload.results,
        method: "GET LAPTOP TYPE DATA",
        status: "SUCCESS",
      };
    case GET_STORAGE_DATA:
      return {
        ...state,
        storage: action.payload.results,
        method: "GET STORAGE DATA",
        status: "SUCCESS",
      };
    case GET_KEBUTUHAN_DATA:
      return {
        ...state,
        kebutuhan: action.payload.results,
        method: "GET STORAGE DATA",
        status: "SUCCESS",
      };
    default:
      return state;
  }
};
