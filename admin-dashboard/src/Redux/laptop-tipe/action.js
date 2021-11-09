export const REQUEST = "TYPE_REQUEST";
export const FAILED_REQ = "FAILED_REQ_TYPE";
export const GET_TYPE = "GET_TYPE";
export const POST_TYPE = "POST_TYPE";
export const PATCH_TYPE = "PATCH_TYPE";
export const DELETE_TYPE = "DELETE_TYPE";

export const Request = () => ({
  type: REQUEST,
});

export const GetType = (data) => ({
  type: GET_TYPE,
  payload: data,
});

export const failedReq = () => ({
  type: FAILED_REQ,
});

export const postType = () => ({
  type: POST_TYPE,
});

export const updateType = () => ({
  type: PATCH_TYPE,
});

export const deleteType = () => ({
  type: DELETE_TYPE,
});
