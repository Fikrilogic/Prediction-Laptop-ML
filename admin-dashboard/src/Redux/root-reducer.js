import { combineReducers } from "redux";
import { UserReducer } from "./User/reducer";
import { DatasetReducer } from "./Dataset/reducer";
import { DataReducer } from "./Data/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AnalyticReducer } from "./Analytics/reducer";

// persistance configuration
const persistConfig = {
  key: "data",
  storage,
  whitelist: ["user"],
};

// Group of Reducer
const reducers = combineReducers({
  user: UserReducer,
  dataset: DatasetReducer,
  data: DataReducer,
  analytic: AnalyticReducer,
});

export default persistReducer(persistConfig, reducers);
