import axios from "axios";
import { URL } from "../../Context/action";
import { RequestData, UserSuccess, FailRequest } from "./action";

// Function for fire API to GET, POST, PATCH, DELETE
export const getProfile = () => {
  return async (dispatch) => {
    dispatch(RequestData());

    try {
      const req = await axios.get(URL + "member/profile/", {
        withCredentials: true,
      });
      dispatch(UserSuccess(req.data));
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

// End of function
