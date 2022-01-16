// Action type
export const GET_DATASET = "GET_DATASET";
export const POST_DATASET = "POST_DATASET";
export const GET_DATASET_PAGE = "GET_DATASET_PAGE";
export const DELETE_ALL_DATASET = "DELETE_ALL_DATA";
export const UPLOAD_EXCEL = "UPLOAD_DATASET_EXCEL";
export const GET_ANALYTIC_RESULTS = "GET_ANALYTIC_RESULTS";

// action function for fetch action
export const getDataset = (Dataset) => ({
  type: GET_DATASET,
  payload: Dataset,
});

export const getDatasetPage = (Dataset) => ({
  type: GET_DATASET_PAGE,
  payload: Dataset,
});

export const uploadFile = (Dataset) => ({
  type: UPLOAD_EXCEL,
});

export const getAnalyticResults = (Dataset) => ({
  type: GET_ANALYTIC_RESULTS,
  payload: Dataset,
});
