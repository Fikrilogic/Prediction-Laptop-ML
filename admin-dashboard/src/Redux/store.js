import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducers from "./root-reducer";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const middlewares = [logger, thunk];

export const store = createStore(reducers, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
