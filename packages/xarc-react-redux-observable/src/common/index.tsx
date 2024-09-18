import { configureStore, Reducer, Middleware } from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic, EpicMiddleware } from "redux-observable";
import { ReduxFeature, ReduxDecoratorParams, ReduxFeatureDecorator } from "@xarc/react-redux";

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
 * Adds decorator for redux observable support to the redux feature
 *
 * @param options redux observable options
 * @returns redux decorator result
 */
export function reduxObservableDecor(options: ReduxObservableOptions): ReduxFeatureDecorator {
  const { rootEpic } = options;

  return {
    decorate(_reduxFeat: ReduxFeature, params: ReduxDecoratorParams) {
      // Create the Redux Observable middleware
      const epicMiddleware: EpicMiddleware<any, any, any, any> = createEpicMiddleware();

      // Configure the Redux store using Redux Toolkit's configureStore
      const store = configureStore({
        reducer: (params.reducers as Reducer<unknown, any>) || ((state) => state),
        preloadedState: params.initialState,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware().concat(epicMiddleware as Middleware),
      });

      // Run the root epic
      epicMiddleware.run(rootEpic);

      return { store };
    },
  };
}
