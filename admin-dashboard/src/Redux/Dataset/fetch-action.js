import {getDataset, uploadFile} from './action'
import axios from "axios";
import { URL } from "../../Context/action";
import { FailRequest} from "../User/action";

// Function for fire API to GET, POST, PATCH, DELETE
export const FetchDataset = () => {
    return async (dispatch) => {
        try {
            const req = await axios.get(URL + "kebutuhan", { withCredentials: true });
            dispatch(getDataset(req.data));
          } catch (e) {
            dispatch(FailRequest());
        }
  };
}

export const uploadDataset = ({name, path}) => {
    return async (dispatch) => {
        try {
            const req = await  axios.get(`${URL}kebutuhan`, {name, path}, {credentials:true}, )
            dispatch(uploadFile())
        } catch(e){
            dispatch(FailRequest())
        }
    }
}

// End for function



