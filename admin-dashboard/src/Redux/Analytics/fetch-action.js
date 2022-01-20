import {
  getAnalyticGraph,
  getAnalyticResults,
  getCrossValidation,
} from "./action";
import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../User/action";

// Function for fire API to GET, POST, PATCH, DELETE

export const FetchAnalyticResults = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "ml/train-result/", {
        withCredentials: true,
      });
      dispatch(getAnalyticResults(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

export const FetchAnalyticGraph = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "ml/train-result/result_graph/", {
        withCredentials: true,
      });
      dispatch(getAnalyticGraph(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

export const FetchCrossValidation = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "ml/cross-val/get_graph/", {
        withCredentials: true,
      });
      dispatch(getCrossValidation(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

// End for function
