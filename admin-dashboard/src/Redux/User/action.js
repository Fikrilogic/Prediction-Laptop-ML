export const REQUEST_USER = "REQUEST_USER";
export const GET_USER = "GET_USER";
export const FAILED_REQUEST = "FAILED_REQUEST";
export const POST_USER = "POST_USER";
export const DELETE_USER = "DELETE_USER";
export const PATCH_USER = "PATCH_USER";

export const RequestData = () => ({
  type: REQUEST_USER,
});

export const UserSuccess = (user) => ({
  type: GET_USER,
  payload: user,
});

export const FailRequest = () => ({
  type: FAILED_REQUEST,
});

export const DeleteUser = () => ({
  type: DELETE_USER,
});
