import {POST_DATASET, UPLOAD_EXCEL, GET_DATASET, DELETE_ALL_DATASET} from './action'
import {FailRequest, FAILED_REQUEST} from '../User/action'


// initial state for dataset
const DATASET_STATE = {
    data: [],
    method: '',
    status: '',
}

// Reducer for Dataset state
export const DatasetReducer = (state = DATASET_STATE, action) => {
    switch (action.type){
        case GET_DATASET:
            return {
                ...state,
                method: "GET",
                dataset: action.payload.dataset,
                status: 'SUCCESS'
            }
        case UPLOAD_EXCEL:
            return {
                ...state,
                method: "POST upload file",
                status: 'SUCCESS'
            }
        case POST_DATASET:
            return {
                ...state,
                method: "POST add Data",
                status: 'SUCCESS'
            }
        case FAILED_REQUEST:
            return {
                ...state,
                method: 'ERROR',
                status: 'FAILED'
            }
    }

}