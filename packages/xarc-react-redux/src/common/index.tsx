/* eslint-disable max-statements, complexity */

import { configureStore, combineReducers, Reducer, UnknownAction, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SubAppDef, SubAppFeatureFactory, SubAppFeature, FeatureDecorator } from "@xarc/subapp";

// Re-export necessary modules

export * as Redux from "@reduxjs/toolkit";
export { combineReducers, configureStore, Reducer, bindActionCreators } from "@reduxjs/toolkit";

// Re-export react-redux
export * as ReactRedux from "react-redux";
export { connect, Provider, batch, useSelector, useDispatch, useStore } from "react-redux";

/**
 * Redux decorator params
 */
export type ReduxDecoratorParams = {
  /** initial state */
  initialState: unknown;
  /** reducers */
  reducers: unknown;
};

/**
 * Redux decorator result
 */
export type ReduxDecoratorResult = {
  /** store if the decorator created one */
  store: EnhancedStore<any, UnknownAction>;
};

/**
 * Redux feature decorator
 */
export type ReduxFeatureDecorator = FeatureDecorator<
  ReduxFeature, // eslint-disable-line no-use-before-define
  ReduxDecoratorParams,
  ReduxDecoratorResult
>;

/**
 * Options for redux feature
 */
export type ReduxFeatureOptions = {
  /**
   * add redux decorators to the redux feature.
   *
   * decorators: `@xarc/react-redux-observable`
   */
  decorators?: ReduxFeatureDecorator[];
  /**
   * The React module.
   *
   * This is needed for the redux feature to wrap subapp's component inside
   * the Redux Provider component.
   */
  React: Partial<{ createElement: any }>;
  /**
   * Configure the redux store to use
   *
   * - `true` - share with an automatically provided global store
   * - `false` - internal private store available to the subapp instance only
   * - string - name a store for sharing - other subapps can share the same store
   *            using the name
   */
  shareStore?: string | boolean;

  /**
   * specify redux reducer or object of named reducers
   *
   * - If it's an object, then it should be an object of named reducers
   * - If it's `true`, then the subapp module should export the named reducers as `reduxReducers`
   * - If it's a function, then it's used as the reducer
   */
  reducers?: Reducer<any, UnknownAction> | Record<string, Reducer<any, UnknownAction>> | boolean;
  /**
   * prepare redux initial state
   *
   * @param initialState - when SSR sent initialState used, it will be passed.  The client
   *    `prepare` can just return `{initialState}` as is.
   *
   * @returns Promise<{initialState: any}>
   */
  prepare(initialState: any): Promise<{ initialState: any }>;
};

/**
 * Redux support for a subapp
 */
export type ReduxFeature = SubAppFeature & {
  options: ReduxFeatureOptions;
  wrap: (_: any) => any;
  Provider: typeof Provider;
  configureStore: (reducer: Reducer<any, UnknownAction>, initialState: any) => EnhancedStore<any, UnknownAction>;
  prepare: any;
  _store?: EnhancedStore<any, UnknownAction>;
};

/**
 * Add support for Redux to a subapp
 *
 * @param options - redux feature options
 * @returns unknown
 */
export function reduxFeature(options: ReduxFeatureOptions): SubAppFeatureFactory {
  const { createElement } = options.React; // eslint-disable-line
  const id = "state-provider";
  const subId = "react-redux";
  const add = (subapp: SubAppDef) => {
    const redux: Partial<ReduxFeature> = { id, subId };
    subapp._features.redux = redux as SubAppFeature;
    // _store: the shared store for redux
    // createStore: callback to create store
    // wrap: callback to wrap component with redux
    redux.options = options;
    redux.wrap = ({ Component, store }) => {
      return (
        <Provider store={store}>
          <Component />
        </Provider>
      );
    };
    redux.Provider = Provider;

    // Configure the Redux store
    redux.configureStore = (reducer, initialState) => {
      return configureStore({
        reducer: reducer || ((state) => state),
        preloadedState: initialState,
      });
    };
    redux.prepare = options.prepare;

    // Execute the redux feature
    redux.execute = async function ({ input, csrData, reload }) {
      let initialState: any;

      let reducers = options.reducers;
      const decorators = options.decorators;

      // Reload case (CSR)
      if (reload) {
        //
        // reload is only for the client side, and store would be created already, so
        // we don't need initialState and we just assign it to {}
        //
        initialState = {};
        // replace the reducers maybe have been updated.
        if (reducers === true) {
          reducers = subapp._module.reduxReducers;
        }
        // Ensure reducers is valid when replacing
        if (typeof reducers === "object") {
          reducers = combineReducers(reducers) as Reducer<any, UnknownAction>;
        }
        const validReducer = typeof reducers === "function" ? reducers : (state => state);
        redux._store?.replaceReducer(validReducer as Reducer<any, UnknownAction>);
      } else {
        // Normal execution (SSR or initial CSR)
        const props = csrData && (await csrData.getInitialState());

        if (reducers === true) {
          reducers = subapp._module.reduxReducers;
        }

        if (typeof reducers === "object") {
          reducers = combineReducers(reducers) as Reducer<any, UnknownAction>;
        }

        initialState = (await options.prepare(props)).initialState;

        if (decorators) {
          for (const decor of decorators) {
            const { store } = decor.decorate(redux as ReduxFeature, {
              reducers,
              initialState,
            });
            if (store) {
              redux._store = store;
            }
          }
        }

        if (!redux._store) {
          const validReducer = (typeof reducers === "function" || typeof reducers === "object")
            ? reducers
            : (state => state);

          redux._store = redux.configureStore(validReducer as Reducer<any, UnknownAction>, initialState);
        }
      }

      return {
        Component: () =>
          this.wrap({
            Component: input.Component || subapp._getExport()?.Component,
            store: redux._store!,
          }),
        props: initialState,
      };
    };

    return subapp;
  };

  return { id, subId, add };
}
