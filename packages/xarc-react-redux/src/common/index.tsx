/* eslint-disable max-statements */

import { SubAppDef, SubAppFeatureFactory, SubAppFeature } from "@xarc/subapp";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore, Reducer, Store } from "redux";

//
// re-export redux as Redux etc
//
export * as Redux from "redux";
export { combineReducers, createStore, Reducer, bindActionCreators, applyMiddleware } from "redux";

//
// re-export react-redux as ReactRedux etc
//

export * as ReactRedux from "react-redux";
export { connect, Provider, batch, useSelector, useDispatch, useStore } from "react-redux";

export type FeatureDecorator = {
  /**
   * decorator function for redux observable or saga
   */
  decor: (options: any) => Store;

  /**
   * if redux observable is selected then we need a rootEpic
   */
  rootEpic?: any;

  /**
   * if saga is selected then we need a rootEpic
   */
  rootSaga?: any;
};

export type ReduxFeatureOptions = {
  /**
   * This is needed for injecting the middlewares through sub apps. e.g: [@xarc-react-redux-observable]
   */
  decorators?: FeatureDecorator[];
  /**
   * The React module.
   *
   * This is needed for the redux feature to wrap subapp's component inside
   * the Redux Provider component.
   */
  React: Partial<{ createElement: unknown }>;

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
  reducers?: Reducer<unknown, any> | Record<string, Reducer<unknown, any>> | boolean;

  /**
   * prepare redux initial state
   *
   * @param initialState - when SSR sent initialState used, it will be passed.  The client
   *    `prepare` can just return `{initialState}` as is.
   *
   * @returns Promise<{initialState: any}>
   */
  prepare(initialState: any): Promise<any>;
};

export type ReduxFeature = SubAppFeature & {
  options: ReduxFeatureOptions;
  wrap: (_: any) => any;
  Provider: typeof Provider;
  createStore: typeof createStore;
  prepare: any;
  _store: any;
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
    redux.createStore = (reducer, initialState) => {
      return createStore(reducer || (x => x), initialState);
    };
    redux.prepare = options.prepare;

    redux.execute = async function ({ input, csrData, reload }) {
      let initialState: any;

      let reducers = options.reducers;
      const decorators = options.decorators;

      if (reload) {
        //
        // reload is only for the client side, and store would be created already, so
        // we don't need initialState and we just assign it to {}
        //
        initialState = {};
        // replace the reducers maybe have been udpated.
        if (reducers === true) {
          reducers = subapp._module.reduxReducers;
          if (typeof reducers === "object") {
            reducers = combineReducers(reducers) as Reducer<unknown, any>;
          }
          redux._store.replaceReducer(reducers);
        }
      } else {
        const props = csrData && (await csrData.getInitialState());
        if (reducers === true) {
          reducers = subapp._module.reduxReducers;
        }

        if (typeof reducers === "object") {
          reducers = combineReducers(reducers) as Reducer<unknown, any>;
        }
        initialState = (await options.prepare(props)).initialState;
        if (decorators) {
          decorators.forEach(d => {
            redux._store = d.decor({
              rootEpic: d.rootEpic,
              rootSaga: d.rootSaga,
              applyMiddleware: applyMiddleware,
              createStore: createStore,
              reducers: reducers,
              initialState: initialState
            });
          });
        } else {
          redux._store = createStore((reducers as Reducer<unknown, any>) || (x => x), initialState);
        }
      }

      return {
        Component: () =>
          this.wrap({
            Component: input.Component || subapp._getExport()?.Component,
            store: redux._store
          }),
        props: initialState
      };
    };
    return subapp;
  };

  return { id, subId, add };
}
