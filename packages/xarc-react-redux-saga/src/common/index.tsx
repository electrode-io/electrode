import createSagaMiddleware from "redux-saga";

import {
  applyMiddleware,
  Reducer,
  createStore,
  ReduxFeature,
  ReduxDecoratorParams,
  ReduxFeatureDecorator
} from "@xarc/react-redux";

export type ReduxSagaOption = {
  /**
   * rootSaga must be provided from the App for initializing Redux Saga Middleware
   */
  rootSaga: any;
};

/**
 * @param options
 */
export function reduxSagaDecor(options: ReduxSagaOption): ReduxFeatureDecorator {
  const { rootSaga } = options;

  return {
    decorate(_reduxFeat: ReduxFeature, params: ReduxDecoratorParams) {
      const sagaMiddleware = createSagaMiddleware();
      const store = createStore(
        (params.reducers as Reducer<unknown, any>) || (x => x),
        params.initialState,
        applyMiddleware(sagaMiddleware)
      );
      sagaMiddleware.run(rootSaga);
      return { store };
    }
  }
}
