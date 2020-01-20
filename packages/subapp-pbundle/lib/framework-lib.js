"use strict";

/* eslint-disable max-statements */

const preact = require("preact");
const { default: AppContext } = require("../dist/node/app-context");
const prts = require("preact-render-to-string");

class FrameworkLib {
  constructor(ref) {
    this.ref = ref;
  }

  async handleSSR() {
    const { subApp, subAppServer, options } = this.ref;
    // If subapp wants to use react router and server didn't specify a StartComponent,
    // then create a wrap StartComponent that uses react router's StaticRouter
    if (subApp.useReactRouter && !subAppServer.StartComponent) {
      throw new Error("react router is not yet supported for preact");
    } else {
      this.StartComponent = subAppServer.StartComponent || subApp.Component;
    }

    if (!this.StartComponent) {
      return `<!-- serverSideRendering ${subApp.name} has no StartComponent -->`;
    } else if (subApp.__redux) {
      // return await this.doReduxSSR();
    } else if (options.serverSideRendering === true) {
      return await this.doSSR();
    }

    return "";
  }

  renderTo(element, options) {
    if (options.streaming) {
      throw new Error("render to stream is not yet supported for preact");
    }

    if (options.suspenseSsr) {
      throw new Error("suspense is not yet supported for preact");
    }

    if (options.hydrateServerData) {
      return prts.render(element);
    } else {
      return prts.render(element);
    }
  }

  createTopComponent(initialProps) {
    const { request } = this.ref.context.user;
    const { subApp } = this.ref;

    let TopComponent;
    if (subApp.useReactRouter) {
      const rrContext = {};
      const rrProps = Object.assign(
        { location: request.url.pathname, context: rrContext },
        initialProps
      );
      // console.log("rendering", name, "for react router", rrProps);
      TopComponent = preact.createElement(this.StartComponent, rrProps);
    } else {
      // console.log("rendering without react router", name);
      TopComponent = preact.createElement(this.StartComponent, initialProps);
    }
    return preact.createElement(
      AppContext.Provider,
      { value: { isSsr: true, subApp, ssr: { request } } },
      TopComponent
    );
  }

  async doSSR() {
    const { subApp, subAppServer, context } = this.ref;
    const { request } = context.user;

    let initialProps;

    // even though we don't know what data model the component is using, but if it
    // has a prepare callback, we will just call it to get initial props to pass
    // to the component when rendering it
    const prepare = subAppServer.prepare || subApp.prepare;
    if (prepare) {
      initialProps = await prepare({ request, context });
    }

    return await this.renderTo(this.createTopComponent(initialProps), this.ref.options);
  }

  // TODO for redux-bundler

  // async doReduxSSR() {
  //   const { subApp, subAppServer, context, options } = this.ref;
  //   const { request } = context.user;
  //   // subApp.reduxReducers || subApp.reduxCreateStore) {
  //   // if sub app has reduxReducers or reduxCreateStore then assume it's using
  //   // redux data model.  prepare initial state and store to render it.
  //   let reduxData;

  //   // see if app has a prepare callback, on the server side first, and then the
  //   // app itself, and call it.  assume the object it returns would contain the
  //   // initial redux state data.
  //   const prepare = subAppServer.prepare || subApp.prepare;
  //   if (prepare) {
  //     reduxData = await prepare({ request, context });
  //   }

  //   if (!reduxData) {
  //     reduxData = { initialState: {} };
  //   }

  //   this.initialState = reduxData.initialState || reduxData;
  //   // if subapp didn't request to skip sending initial state, then stringify it
  //   // and attach it to the index html.
  //   if (subAppServer.attachInitialState !== false) {
  //     this.initialStateStr = JSON.stringify(this.initialState);
  //   }
  //   // next we take the initial state and create redux store from it
  //   this.store =
  //     reduxData.store ||
  //     (subApp.reduxCreateStore && (await subApp.reduxCreateStore(this.initialState)));
  //   assert(
  //     this.store,
  //     `redux subapp ${subApp.name} didn't provide store, reduxCreateStore, or reducers`
  //   );
  //   if (options.serverSideRendering === true) {
  //     assert(Provider, "subapp-web: react-redux Provider not available");
  //     // finally render the element with Redux Provider and the store created
  //     return await this.renderTo(
  //       preact.createElement(Provider, { store: this.store }, this.createTopComponent()),
  //       options
  //     );
  //   }
  //   return "";
  // }
}

module.exports = FrameworkLib;
