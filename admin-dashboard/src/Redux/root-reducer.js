import { combineReducers } from "redux";
import { UserReducer } from "./User/reducer";
import { LaptopReducer } from "./laptop/reduce";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Type_Reducer } from "./laptop-tipe/reducer";

const persistConfig = {
  key: "data",
  storage,
  whitelist: ["user"],
};

const reducers = combineReducers({
  user: UserReducer,
  laptop: LaptopReducer,
  type_laptop: Type_Reducer,
});

export default persistReducer(persistConfig, reducers);
