import { combineReducers } from "redux";
import { UserReducer } from "./User/reducer";
import { DataReducer } from "./Data/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// persistance configuration
const persistConfig = {
  key: "data",
  storage,
  whitelist: ["user"],
};

// Group of Reducer
const appReducers = combineReducers({
  user: UserReducer,
  data: DataReducer,
});

export default persistReducer(persistConfig, appReducers);
