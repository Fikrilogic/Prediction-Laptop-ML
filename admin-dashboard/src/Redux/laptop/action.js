export const LAPTOP_REQUEST = "LAPTOP_REQUEST";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const GET_LAPTOP = "GET_LAPTOP";
export const POST_LAPTOP = "POST_LAPTOP";
export const UPDATE_LAPTOP = "UPDATE_LAPTOP";
export const DELETE_LAPTOP = "DELETE_LAPTOP";

export const RequestData = () => ({
  type: LAPTOP_REQUEST,
});

export const GetData = (data) => ({
  type: GET_LAPTOP,
  payload: data,
});

export const failedRequest = () => ({
  type: REQUEST_FAILED,
});
