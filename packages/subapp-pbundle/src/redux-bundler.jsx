/** @jsx h */
import { h, render, hydrate } from "preact";
import { loadSubApp } from "subapp-web";
import { Provider } from "redux-bundler-preact";
import { setStoreContainer, getReduxCreateStore } from "./shared";

setStoreContainer(typeof window === "undefined" ? global : window);

//
// client side function to start a subapp with redux-bundler support
//
export function reduxRenderStart(options) {
  const store = options._store || options.reduxCreateStore(options.initialState);
  const { Component } = options;
  let component = undefined;

  if (options.element) {
    render(
      <Provider store={store}>
        <Component />
      </Provider>,
      options.element
    );
  } else {
    component = (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  }

  return {store, component};
}

//
// Load a subapp with redux-bundler support
// info - the subapp's information
//
export function reduxBundlerLoadSubApp(info) {
  const renderStart = function(instance, element) {
    const initialState = instance._prepared || instance.initialState;
    const reduxCreateStore = instance.reduxCreateStore || this.info.reduxCreateStore;
    const Component = this.info.StartComponent || this.info.Component;

    const {store, component} = reduxRenderStart({
      _store: instance._store,
      initialState,
      reduxCreateStore,
      Component,
      serverSideRendering: instance.serverSideRendering,
      element
    });

    instance._store = store;
    return component;
  };

  // allow subApp to specify redux bundles as reduxBundles or bundles
  const reduxBundles = info.reduxBundles || info.bundles;

  const extras = {
    reduxBundles,
    __redux: true
  };

  if (!info.reduxCreateStore) {
    extras._genReduxCreateStore = "subapp";
    extras.reduxCreateStore = getReduxCreateStore(info);
  }

  return loadSubApp(Object.assign(extras, info), renderStart);
}
