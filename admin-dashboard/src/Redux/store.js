import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducers from "./root-reducer";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const middlewares = [logger, thunk];

// redux store
export const store = createStore(reducers, applyMiddleware(...middlewares));

// redux state persistance
export const persistor = persistStore(store);

export default { store, persistor };
