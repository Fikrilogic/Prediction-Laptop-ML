import * as ACTION from "./action";
import axios from "axios";
import { URL } from "../../Context/action";

export const fetchLaptop = () => {
  return (dispatch) => {
    dispatch(ACTION.RequestData());
    setTimeout(async () => {
      try {
        const req = await axios.get(URL + "laptop", { withCredentials: true });
        dispatch(ACTION.GetData(req.data));
      } catch {
        dispatch(ACTION.failedRequest());
      }
    }, 500);
  };
};
