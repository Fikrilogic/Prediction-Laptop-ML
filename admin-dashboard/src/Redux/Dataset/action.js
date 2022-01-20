// Action type
export const GET_DATASET = "GET_DATASET";
export const POST_DATASET = "POST_DATASET";
export const GET_DATASET_PAGE = "GET_DATASET_PAGE";
export const DELETE_DATASET_ID = "DELETE_DATASET_ID";

// action function for fetch action
export const getDataset = (Dataset) => ({
  type: GET_DATASET,
  payload: Dataset,
});

export const getDatasetPage = (Dataset) => ({
  type: GET_DATASET_PAGE,
  payload: Dataset,
});

export const deleteDatasetById = () => ({
  type: DELETE_DATASET_ID,
});
