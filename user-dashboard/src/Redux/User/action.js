// Action type
export const REQUEST_USER = "REQUEST_USER";
export const GET_USER = "GET_USER";
export const FAILED_REQUEST = "FAILED_REQUEST";
export const CONSULT_RESULT = "CONSULT_RESULT";

// Function for Fetch action
export const RequestData = () => ({
  type: REQUEST_USER,
});

export const FailRequest = () => ({
  type: FAILED_REQUEST,
});

export const UserSuccess = (user) => ({
  type: GET_USER,
  payload: user,
});

export const ConsultResult = (results) => ({
  type: CONSULT_RESULT,
  payload: results,
});
