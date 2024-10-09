import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root-saga";
import { reducers } from "./reducers/root-reducer";
import logger from "redux-logger";
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure Redux store
const store = configureStore({
  reducer: reducers,
  middleware: () => [sagaMiddleware, logger],
  // devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

export default store;
