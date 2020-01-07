import { h, render, hydrate } from "preact";
import { loadSubApp } from "subapp-web";
import { Provider } from 'redux-bundler-preact';
import { setStoreContainer, getReduxCreateStore } from "./shared";

setStoreContainer(typeof window === 'undefined' ? global : window);

//
// client side function to start a subapp with redux-bundler support
//
export function reduxRenderStart(options) {
  const store = options._store || options.reduxCreateStore(options.initialState);
  const { Component } = options;

  if (options.serverSideRendering) {
    hydrate(
      <Provider store={store}>
        <Component />
      </Provider>,
      options.element
    );
  } else {
    render(
      <Provider store={store}>
        <Component />
      </Provider>,
      options.element
    );
  }

  return store;
}

let store;

//
// Load a subapp with redux-bundler support
// info - the subapp's information
//
export function reduxBundlerLoadSubApp(info) {
  const renderStart = function(instance, element) {
    const initialState = instance._prepared || instance.initialState;
    const reduxCreateStore = instance.reduxCreateStore || this.info.reduxCreateStore;
    const Component = this.info.StartComponent || this.info.Component;

    const store = reduxRenderStart({
      _store: instance._store,
      initialState,
      reduxCreateStore,
      Component,
      serverSideRendering: instance.serverSideRendering,
      element
    });

    instance._store = store;
    return store;
  };

  const extras = {
    __redux: true
  };

  if (!info.reduxCreateStore) {
    extras._genReduxCreateStore = "subapp";
  }

  return loadSubApp(
    Object.assign(extras, info, {
      reduxCreateStore: getReduxCreateStore(info)
    }),
    renderStart
  );
}
