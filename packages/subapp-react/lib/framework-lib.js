"use strict";

/* eslint-disable max-statements */

const assert = require("assert");
const optionalRequire = require("optional-require")(require);
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const AsyncReactDOMServer = optionalRequire("react-async-ssr");
const { default: AppContext } = require("../dist/node/app-context");
const ReactRedux = optionalRequire("react-redux", { default: {} });
const { Provider } = ReactRedux;
const ReactRouterDom = optionalRequire("react-router-dom");

class FrameworkLib {
  constructor(ref) {
    this.ref = ref;
    this._prepared = false;
  }

  async handlePrepare() {
    this._prepared = true;
    const { subApp, subAppServer, options } = this.ref;
    // If subapp wants to use react router and server didn't specify a StartComponent,
    // then create a wrap StartComponent that uses react router's StaticRouter
    if (subApp.useReactRouter && !subAppServer.StartComponent) {
      this.StartComponent = this.wrapReactRouter(subApp);
    } else {
      this.StartComponent = subAppServer.StartComponent || subApp.Component;
    }

    if (this.StartComponent) {
      if (subApp.__redux) {
        return await this.prepareReduxData();
      } else if (options.serverSideRendering === true) {
        return await this.prepareData();
      }
    }

    return false;
  }

  async handleSSR() {
    const { subApp, options } = this.ref;

    if (!this._prepared) {
      await this.handlePrepare();
    }

    if (!this.StartComponent) {
      return `<!-- serverSideRendering ${subApp.name} has no StartComponent -->`;
    } else if (subApp.__redux) {
      return await this.doReduxSSR();
    } else if (options.serverSideRendering === true) {
      return await this.doSSR();
    }

    return "";
  }

  renderTo(element, options) {
    const { subAppServer } = this.ref;

    if (typeof subAppServer.renderer === "function") {
      return subAppServer.renderer(element, options);
    }

    if (options.useStream) {
      assert(!options.suspenseSsr, "useStream and suspense SSR together are not supported");
      if (options.hydrateServerData) {
        return ReactDOMServer.renderToNodeStream(element);
      } else {
        return ReactDOMServer.renderToStaticNodeStream(element);
      }
    }
    if (options.suspenseSsr) {
      assert(AsyncReactDOMServer, "You must install react-async-ssr for suspense SSR support");
      if (options.hydrateServerData) {
        return AsyncReactDOMServer.renderToStringAsync(element);
      } else {
        return AsyncReactDOMServer.renderToStaticMarkupAsync(element);
      }
    }
    if (options.hydrateServerData) {
      return ReactDOMServer.renderToString(element);
    } else {
      return ReactDOMServer.renderToStaticMarkup(element);
    }
  }

  createTopComponent(initialProps) {
    const { request } = this.ref.context.user;
    const { subApp } = this.ref;

    let TopComponent;
    if (subApp.useReactRouter) {
      const rrContext = {};
      const rrProps = Object.assign(
        { location: request.path || request.url.pathname, context: rrContext },
        initialProps
      );
      // console.log("rendering", name, "for react router", rrProps);
      TopComponent = React.createElement(this.StartComponent, rrProps);
    } else {
      // console.log("rendering without react router", name);
      TopComponent = React.createElement(this.StartComponent, initialProps);
    }
    return React.createElement(
      AppContext.Provider,
      { value: { isSsr: true, subApp, ssr: { request } } },
      TopComponent
    );
  }

  async prepareData() {
    const { subApp, subAppServer, context } = this.ref;
    const { request } = context.user;

    // even though we don't know what data model the component is using, but if it
    // has a prepare callback, we will just call it to get initial props to pass
    // to the component when rendering it
    const prepare = subAppServer.prepare || subApp.prepare;
    if (prepare) {
      this.initialState = this._initialProps = await prepare({ request, context });

      // if subapp didn't request to skip sending initial state, then stringify it
      // and attach it to the index html.
      if (subAppServer.attachInitialState !== false) {
        this.initialStateStr = JSON.stringify(this.initialState);
      }
    }

    return this._initialProps;
  }

  async doSSR() {
    return await this.renderTo(this.createTopComponent(this._initialProps), this.ref.options);
  }

  async prepareReduxData() {
    const { subApp, subAppServer, context } = this.ref;
    const { request } = context.user;
    // subApp.reduxReducers || subApp.reduxCreateStore) {
    // if sub app has reduxReducers or reduxCreateStore then assume it's using
    // redux data model.  prepare initial state and store to render it.
    let reduxData;

    // see if app has a prepare callback, on the server side first, and then the
    // app itself, and call it.  assume the object it returns would contain the
    // initial redux state data.
    const prepare = subAppServer.prepare || subApp.prepare;
    if (prepare) {
      reduxData = await prepare({ request, context });
    }

    let storeContainer = context.user.storeContainer;

    if (!storeContainer) {
      storeContainer = context.user.storeContainer = {};
    }

    if (!reduxData) {
      reduxData = { initialState: {} };
    }

    this.initialState = reduxData.initialState || reduxData;
    // if subapp didn't request to skip sending initial state, then stringify it
    // and attach it to the index html.
    if (subAppServer.attachInitialState !== false) {
      this.initialStateStr = JSON.stringify(this.initialState);
    }
    // next we take the initial state and create redux store from it
    this.store =
      reduxData.store ||
      (subApp.reduxCreateStore &&
        (await subApp.reduxCreateStore(this.initialState, storeContainer)));
    assert(
      this.store,
      `redux subapp ${subApp.name} didn't provide store, reduxCreateStore, or reducers`
    );

    const reduxStoreReady = subAppServer.reduxStoreReady || subApp.reduxStoreReady;
    if (reduxStoreReady) {
      await reduxStoreReady({ store: this.store });
    }
  }

  async doReduxSSR() {
    const { options } = this.ref;

    if (options.serverSideRendering === true) {
      assert(Provider, "subapp-web: react-redux Provider not available");
      // finally render the element with Redux Provider and the store created
      return await this.renderTo(
        React.createElement(Provider, { store: this.store }, this.createTopComponent()),
        options
      );
    }
    return "";
  }

  wrapReactRouter() {
    assert(
      ReactRouterDom && ReactRouterDom.StaticRouter,
      `subapp ${this.ref.subApp.name} specified useReactRouter without a StartComponent, \
and can't generate it because module react-router-dom with StaticRouter is not found`
    );
    return props2 =>
      React.createElement(
        ReactRouterDom.StaticRouter,
        props2,
        React.createElement(this.ref.subApp.Component)
      );
  }
}

module.exports = FrameworkLib;
