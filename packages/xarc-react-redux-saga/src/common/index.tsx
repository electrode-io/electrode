import { StoreEnhancer } from "redux";
import { Reducer, Store, StoreCreator } from "redux";
import createSagaMiddleware from "redux-saga";

export type ReduxSagaOption = {
  /**
   * rootSaga must be provided from the App for initializing Redux Saga Middleware
   */
  rootSaga: any;
  /**
   * applyMiddlware provided from @xarc-react-redux
   */
  applyMiddleware: (e: any) => StoreEnhancer;

  /**
   * createStore provided from @xarc-react-redux
   */
  createStore: StoreCreator;

  /**
   * reducers provided from @xarc-react-redux
   */
  reducers: Reducer<unknown, any>;

  /**
   * initialState provided from @xarc-react-redux
   */
  initialState: any;
};

/**
 * @param options
 */
export function reduxSagaDecor(options: ReduxSagaOption): Store {
  const { rootSaga, applyMiddleware, createStore, reducers, initialState } = options;

  if (!rootSaga) {
    throw new Error("[REDUX-SAGA] must provide a root epic if redux-saga selected!");
  }
  const sagaMiddleware = createSagaMiddleware();
  const reduxSagaStore = createStore(
    (reducers as Reducer<unknown, any>) || (x => x),
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return reduxSagaStore;
}
