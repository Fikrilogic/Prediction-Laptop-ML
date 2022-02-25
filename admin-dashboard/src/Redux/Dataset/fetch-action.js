import { deleteDatasetById, getDataset, getDatasetPage, getLaptop } from "./action";
import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest } from "../User/action";

// Function for fire API to GET, POST, PATCH, DELETE
export const FetchDataset = (props = {}) => {
  const { path } = props;
  return async (dispatch) => {
    try {
      if(path){
        const req = await axios.get(path, {
          withCredentials: true,
        });
        dispatch(getDataset(req.data));
        return;
      }
      const req = await axios.get(URL + "dataset/", { withCredentials: true });
      dispatch(getDataset(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

export const FetchLaptop = (props = {}) => {
  const { path } =  props;
  return async (dispatch) => {
    try {
      if(path){
        const req = await axios.get(path, {
          withCredentials: true,
        });
        dispatch(getLaptop(req.data));
        return;
      }
      const req = await axios.get(URL + "laptop/", {
        withCredentials: true,
      })
      dispatch(getLaptop(req.data))
    } catch (e) {
      console.log(e);
      dispatch(FailRequest());
    }
  };
};

// export const FetchDatasetPage = ({ path }) => {
//   return async (dispatch) => {
//     try {
//       const req = await axios.get(path, {
//         withCredentials: true,
//       });
//       dispatch(getDatasetPage(req.data));
//     } catch (e) {
//       dispatch(FailRequest());
//     }
//   };
// };

export const deleteDataset = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(URL + `dataset/${id}/`, { withCredentials: true });
      dispatch(deleteDatasetById());
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};
// End for function
