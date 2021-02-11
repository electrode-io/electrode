import { StoreEnhancer } from "redux";
import { Reducer, Store, StoreCreator } from "redux";
import { createEpicMiddleware, Epic } from "redux-observable";

export type ReduxObservableOption = {
  /**
   * rootEpic must be provided from the App for initializing Redux Observable Middleware
   */
  rootEpic: Epic;
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
export function reduxObservableDecor(options: ReduxObservableOption): Store {
  const { rootEpic, applyMiddleware, createStore, reducers, initialState } = options;

  if (!rootEpic) {
    throw new Error("[REDUX-OBSERVABLE] must provide a root epic if redux-observable selected!");
  }
  const epicMiddleware = createEpicMiddleware();
  const observerMiddleware = applyMiddleware(epicMiddleware);
  const reduxObservableStore = createStore(
    (reducers as Reducer<unknown, any>) || (x => x),
    initialState,
    observerMiddleware
  );
  epicMiddleware.run(rootEpic);
  return reduxObservableStore;
}
