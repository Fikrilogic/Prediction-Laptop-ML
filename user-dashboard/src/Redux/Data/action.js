// Action type
export const GET_CPU_DATA = "GET_CPU_DATA";
export const GET_GPU_DATA = "GET_GPU_DATA";
export const GET_STORAGE_DATA = "GET_STORAGE_DATA";
export const GET_TYPE_DATA = "GET_LAPTOP_TYPE_DATA";
export const GET_SCREEN_DATA = "GET_SCREEN_DATA";
export const GET_RESOLUTION_DATA = "GET_RESOLUTION_DATA";
export const GET_COMPANY_DATA = "GET_COMPANY_DATA";
export const GET_KEBUTUHAN_DATA = "GET_KEBUTUHAN_DATA";
export const FAILED_REQUEST = "FAILED_REQUEST";

// action function for fetch action

export const getCpuData = (Dataset) => ({
  type: GET_CPU_DATA,
  payload: Dataset,
});

export const getGpuData = (Dataset) => ({
  type: GET_GPU_DATA,
  payload: Dataset,
});

export const getStorageData = (Dataset) => ({
  type: GET_STORAGE_DATA,
  payload: Dataset,
});

export const getTypeData = (Dataset) => ({
  type: GET_TYPE_DATA,
  payload: Dataset,
});

export const getScreenData = (Dataset) => ({
  type: GET_SCREEN_DATA,
  payload: Dataset,
});

export const getResolutionData = (Dataset) => ({
  type: GET_RESOLUTION_DATA,
  payload: Dataset,
});

export const getCompanyData = (Dataset) => ({
  type: GET_COMPANY_DATA,
  payload: Dataset,
});

export const getKebutuhanData = (Dataset) => ({
  type: GET_KEBUTUHAN_DATA,
  payload: Dataset,
});

export const FailRequest = () => ({
  type: FAILED_REQUEST,
});
