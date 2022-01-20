// Action type
export const GET_ANALYTIC_RESULTS = "GET_ANALYTIC_RESULTS";
export const GET_ANALYTIC_GRAPH = "GET_ANALYTIC_GRAPH";
export const GET_CROSS_VALIDATION = "GET_CROSS_VALIDATION";

// action function for fetch action

export const getAnalyticResults = (Dataset) => ({
  type: GET_ANALYTIC_RESULTS,
  payload: Dataset,
});

export const getAnalyticGraph = (Dataset) => ({
  type: GET_ANALYTIC_GRAPH,
  payload: Dataset,
});
export const getCrossValidation = (Dataset) => ({
  type: GET_CROSS_VALIDATION,
  payload: Dataset,
});
