/** @jsx h */

import { h, render } from "preact";
import { loadSubApp } from "subapp-web";
import { Provider } from "redux-bundler-preact";
import { setStoreContainer, getReduxCreateStore } from "./shared";

setStoreContainer(typeof window === "undefined" ? global : window);

//
// client side function to start a subapp with redux-bundler support
//
export function reduxRenderStart({ store, Component, element }) {
  let component;

  if (element) {
    render(
      <Provider store={store}>
        <Component />
      </Provider>,
      element
    );
  } else {
    component = (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  }

  return { store, component };
}

//
// Load a subapp with redux-bundler support
// info - the subapp's information
//
export function reduxBundlerLoadSubApp(info) {
  const renderStart = function(instance, element) {
    const Component = this.info.StartComponent || this.info.Component;

    const { component } = reduxRenderStart({
      store: instance._store,
      Component,
      // serverSideRendering: instance.serverSideRendering,
      element
    });

    return component;
  };

  const preRender = function(instance) {
    const initialState = instance._prepared || instance.initialState;
    const reduxCreateStore = instance.reduxCreateStore || this.info.reduxCreateStore;
    instance._store = instance._store || reduxCreateStore(initialState);

    return instance;
  };

  const signalReady = function(instance) {
    const store = instance._store;

    if (store.realize) {
      instance._store = store.realize();
    }

    return Promise.resolve()
      .then(() => {
        if (this.info.reduxStoreReady) {
          return this.info.reduxStoreReady({ store: instance._store });
        }
      })
      .then(() => instance);
  };

  // allow subApp to specify redux bundles as reduxBundles or bundles
  const reduxBundles = info.reduxBundles || info.bundles;

  const extras = {
    reduxBundles,
    __preRender: preRender,
    __signalReady: signalReady,
    __redux: true
  };

  if (!info.reduxCreateStore) {
    extras._genReduxCreateStore = "subapp";
    extras.reduxCreateStore = getReduxCreateStore(info);
  }

  return loadSubApp(Object.assign(extras, info), renderStart);
}
