import React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import { loadSubApp } from "subapp-web";

export { hotReloadSubApp } from "subapp-web";

//
// client side function to start a subapp with redux support
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

//
// Load a subapp with redux support
// info - the subapp's information
// onLoadStartElement - the HTML element to render into upon loaded by the browser
//
export function reduxLoadSubApp(info) {
  const renderStart = function(instance, element) {
    const store = reduxRenderStart({
      _store: instance._store,
      reduxCreateStore: instance.reduxCreateStore || this.info.reduxCreateStore,
      initialState: instance.initialState,
      Component: this.info.StartComponent || this.info.Component,
      serverSideRendering: instance.serverSideRendering,
      element
    });
    instance._store = store;
    return store;
  };

  return loadSubApp(info, renderStart);
}
