import {
  getAnalyticResults,
  getDataset,
  getDatasetPage,
  uploadFile,
} from "./action";
import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../User/action";

// Function for fire API to GET, POST, PATCH, DELETE
export const FetchDataset = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "dataset/", { withCredentials: true });
      dispatch(getDataset(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchDatasetPage = ({ path }) => {
  return async (dispatch) => {
    try {
      const req = await axios.get(path, {
        withCredentials: true,
      });
      dispatch(getDatasetPage(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

export const uploadDataset = ({ name, path }) => {
  return async (dispatch) => {
    try {
      const req = await axios.get(
        `${URL}dataset/`,
        { name, path },
        { credentials: true }
      );
      dispatch(uploadFile());
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

export const fetchAnalyticResults = () => {
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

// End for function
