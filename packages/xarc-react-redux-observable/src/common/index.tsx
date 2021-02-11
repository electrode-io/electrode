import { createEpicMiddleware, Epic } from "redux-observable";
import {
  applyMiddleware,
  Reducer,
  createStore,
  ReduxFeature,
  ReduxDecoratorParams,
  ReduxFeatureDecorator
} from "@xarc/react-redux";

/**
 * Options for creating a redux observable for use with redux feature
 */
export type ReduxObservableOptions = {
  /**
   * rootEpic must be provided from the App for initializing Redux Observable Middleware
   */
  rootEpic: Epic;
};

/**
 * adds decorator for redux observable support to the redux feature
 *
 * @param options redux observable options
 * @returns redux decorator result
 */
export function reduxObservableDecor(options: ReduxObservableOptions): ReduxFeatureDecorator {
  const { rootEpic } = options;

  return {
    decorate(_reduxFeat: ReduxFeature, params: ReduxDecoratorParams) {
      const epicMiddleware = createEpicMiddleware();
      const observerMiddleware = applyMiddleware(epicMiddleware);

      const store = createStore(
        (params.reducers as Reducer<unknown, any>) || (x => x),
        params.initialState,
        observerMiddleware
      );

      epicMiddleware.run(rootEpic);

      return { store };
    }
  };
}
