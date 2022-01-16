import axios from "axios";
import { URL } from "../../Context/action";
import { RequestData, UserSuccess, FailRequest, DeleteUser } from "./action";

// Function for fire API to GET, POST, PATCH, DELETE
export const fetchUser = () => {
  return (dispatch) => {
    dispatch(RequestData());

    setTimeout(async () => {
      try {
        const req = await axios.get(URL + "member/", { withCredentials: true });
        dispatch(UserSuccess(req.data));
      } catch (e) {
        dispatch(FailRequest());
      }
    }, 500);
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(URL + `member/${id}`, { withCredentials: true });
      dispatch(DeleteUser());
    } catch (e) {
      dispatch(FailRequest());
    }
  };
};

// End of function
