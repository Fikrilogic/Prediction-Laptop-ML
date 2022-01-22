import axios from "axios";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FALSE";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FALSE";
export const LOGOUT = "LOGOUT";
export const SERVER_BREAK = "SERVER_BREAK";

export const URL = "http://localhost:8000/api/";

// Login Action
export const login = async (dispatch, { data }) => {
  const { password, email } = data;
  try {
    dispatch({ type: LOGIN_LOADING });
    const req = await axios.post(
      URL + "login",
      {
        password,
        email,
      },
      {
        withCredentials: true,
      }
    );
    if (req.data) {
      dispatch({ type: LOGIN_SUCCESS, payload: req.data });
      return req.data;
    }
    dispatch({ type: LOGIN_FAIL });
    return;
  } catch (e) {
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout action
export const logout = (dispatch) => {
  return axios
    .get(URL + "logout", { withCredentials: true })
    .then((resolve) => {
      dispatch({ type: LOGOUT });
      localStorage.removeItem("auth");
      return resolve.status;
    });
};

export const register = async (dispatch, { data }) => {
  const { username, email, password, profile } = data;
  try {
    dispatch({ type: REGISTER_LOADING });
    const req = await axios.post(
      URL + "register",
      {
        username,
        email,
        password,
        profile,
      },
      {
        withCredentials: true,
      }
    );
    if (req.data) {
      dispatch({ type: REGISTER_SUCCESS });
      return req.data;
    }
    dispatch({ type: REGISTER_FAIL });
    return;
  } catch (e) {
    dispatch({ type: REGISTER_FAIL });
  }
};
