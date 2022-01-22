import {
  getCompanyData,
  getCpuData,
  getGpuData,
  getKebutuhanData,
  getResolutionData,
  getScreenData,
  getStorageData,
  getTypeData,
} from "./action";
import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../Data/action";

// Function for fire API to GET, POST, PATCH, DELETE

export const FetchCpu = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "cpu/", { withCredentials: true });
      dispatch(getCpuData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchGpu = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "gpu/", { withCredentials: true });
      dispatch(getGpuData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchStorage = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "memory-type/", {
        withCredentials: true,
      });
      dispatch(getStorageData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchLaptopType = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "laptop-type/", {
        withCredentials: true,
      });
      dispatch(getTypeData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchCompany = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "company/", { withCredentials: true });
      dispatch(getCompanyData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchScreenType = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "screen-type/", {
        withCredentials: true,
      });
      dispatch(getScreenData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchScreenResolution = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "screen-reso/", {
        withCredentials: true,
      });
      dispatch(getResolutionData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
export const FetchKebutuhan = () => {
  return async (dispatch) => {
    try {
      const req = await axios.get(URL + "kebutuhan/", {
        withCredentials: true,
      });
      dispatch(getKebutuhanData(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

// End for function
