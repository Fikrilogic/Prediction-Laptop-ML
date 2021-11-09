import axios from "axios";
import { URL } from "../../Context/action";
import * as ACTION from "./action";

export const fetchTypeData = () => {
  return (dispatch) => {
    dispatch(ACTION.Request());

    setTimeout(async () => {
      try {
        const req = await axios.get(URL + "laptop-types", {
          withCredentials: true,
        });
        console.log(req.data);
        dispatch(ACTION.GetType(req.data));
      } catch {
        dispatch(ACTION.failedReq());
      }
    }, 500);
  };
};

export const fetchDataTypeById = (id) => {
  return (dispatch) => {
    dispatch(ACTION.Request());

    setTimeout(() => {
      try {
        const req = axios.get(URL + `laptop-types/${id}`, {
          withCredentials: true,
        });
        dispatch(ACTION.GetType(req));
      } catch {
        dispatch(ACTION.failedReq());
      }
    }, 500);
  };
};

export const addFetchType = (kode, name) => {
  return (dispatch) => {
    dispatch(ACTION.Request());
    axios
      .post(URL + "laptop-types", { kode, name }, { withCredentials: true })
      .then((resolve) => {
        dispatch(ACTION.postType());
      })
      .catch((error) => dispatch(ACTION.failedReq()));
  };
};

export const updateFetchType = (id, kode, name) => {
  return (dispatch) => {
    dispatch(ACTION.Request());
    axios
      .patch(
        URL + `laptop-types/${id}`,
        { kode, name },
        { withCredentials: true }
      )
      .then((resolve) => dispatch(ACTION.updateType()))
      .catch((e) => dispatch(ACTION.failedReq));
  };
};

export const deleteFetchType = (id) => {
  return (dispatch) => {
    dispatch(ACTION.Request());
    axios
      .delete(URL + `laptop-types/${id}`, { withCredentials: true })
      .then((resolve) => {
        dispatch(ACTION.deleteType());
      })
      .catch((e) => dispatch(ACTION.failedReq));
  };
};
