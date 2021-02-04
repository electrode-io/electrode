/* eslint-disable max-statements */

import { SubAppDef, SubAppFeatureFactory, SubAppFeature } from "@xarc/subapp";
import { Provider } from "react-redux";
import { combineReducers, createStore, Reducer, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import createSagaMiddleware from "redux-saga";

//
// re-export redux as Redux etc
//
export * as Redux from "redux";
export { combineReducers, createStore, Reducer, bindActionCreators } from "redux";

//
// re-export react-redux as ReactRedux etc
//

export * as ReactRedux from "react-redux";
export { connect, Provider, batch, useSelector, useDispatch, useStore } from "react-redux";

export type ReduxFeatureOptions = {
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

  /*
   * if selected then redux observable will be injected
   */
  reduxObservable?: boolean;

  /**
   * if redux observable is selected then we need a rootEpic
   */
  rootEpic?: any;

  /**
   * if selected then redux saga will be injected
   */
  reduxSaga?: boolean;

  /**
   * if saga is selected then we need a rootEpic
   */
  rootSaga?: any;
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
 * @param meta
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
      const reduxObservable = options.reduxObservable;
      const rootEpic = options.rootEpic;
      const reduxSaga = options.reduxSaga;
      const rootSaga = options.rootSaga;

      let reducers = options.reducers;

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
        if (reduxObservable === true) {
          if (!rootEpic) { throw new Error("[REDUX-OBSERVABLE] must provide a root epic if redux-observable selected!"); }
          const epicMiddleware = createEpicMiddleware();
          const observerMiddleware = applyMiddleware(epicMiddleware);
          redux._store = createStore((reducers as Reducer<unknown, any>) || (x => x), initialState, observerMiddleware);
          epicMiddleware.run(rootEpic);

        } else if (reduxSaga === true) {
          if (!rootSaga) { throw new Error("[REDUX-SAGA] must provide a root saga if redux-saga selected!"); }
          const sagaMiddleware = createSagaMiddleware();
          redux._store = createStore((reducers as Reducer<unknown, any>) || (x => x), initialState, applyMiddleware(sagaMiddleware));
          sagaMiddleware.run(rootSaga);

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
