"use strict";

const assert = require("assert");
const { createElement } = require("preact");
const { default: AppContext } = require("../dist/node/app-context");
const prts = require("preact-render-to-string");
const { Provider } = require("redux-bundler-preact");

class FrameworkLib {
  constructor(ref) {
    this.ref = ref;
    this._prepared = false;
  }

  async handlePrepare() {
    this._prepared = true;
    const { subApp, subAppServer, options } = this.ref;

    assert(!subApp.useReactRouter, "react router is not yet supported for preact");

    this.StartComponent = subAppServer.StartComponent || subApp.Component;

    if (this.StartComponent && options.serverSideRendering === true) {
      if (subApp.__redux) {
        return await this.prepareReduxData();
      } else {
        return await this.prepareData();
      }
    }

    return false;
  }

  async handleSSR() {
    if (!this._prepared) {
      await this.handlePrepare();
      await this.realizeReduxStore();
    }

    return this.handleSSRSync();
  }

  handleSSRSync() {
    const { subApp, options } = this.ref;

    assert(this._prepared, "subapp's data must've been prepared to run handleSSRSync");

    if (!this.StartComponent) {
      return `<!-- serverSideRendering ${subApp.name} has no StartComponent -->`;
    } else if (options.serverSideRendering === true) {
      if (subApp.__redux) {
        // we can't realize the store here because signaling store ready is async
        assert(!this.store.realize, "BUG: redux store is not yet realized");
        assert(Provider, "subapp-pbundle: redux-bundler-preact Provider not available");
        // finally render the element with Redux Provider and the store created
        return this.renderTo(
          createElement(Provider, { store: this.store }, this.createTopComponent()),
          this.ref.options
        );
      } else {
        return this.doSSR();
      }
    }

    return "";
  }

  renderTo(element, options) {
    assert(!options.useStream, "render to stream is not yet supported for preact");

    assert(!options.suspenseSsr, "suspense is not yet supported for preact");

    if (options.hydrateServerData) {
      return prts.render(element);
    } else {
      return prts.render(element);
    }
  }

  createTopComponent(initialProps) {
    const { request } = this.ref.context.user;
    const { subApp } = this.ref;
    const TopComponent = createElement(this.StartComponent, {
      request,
      ...initialProps
    });

    return createElement(
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
      this._initialProps = await prepare({ request, context });
    }

    return this._initialProps;
  }

  doSSR() {
    return this.renderTo(this.createTopComponent(this._initialProps), this.ref.options);
  }

  async prepareReduxData() {
    const { subApp, subAppServer, context } = this.ref;
    const { request } = context.user;

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

    if (!reduxData) {
      reduxData = { initialState: {} };
    } else {
      this.store = reduxData.store;
    }

    this.initialState = reduxData.initialState || reduxData;
    const packReduxData = subAppServer.packReduxData || subApp.packReduxData;

    // if subapp didn't request to skip sending initial state and packReduxData was not specified,
    //  then stringify the initial store state and attach it to the index html.
    if (!packReduxData && subAppServer.attachInitialState !== false) {
      this.initialStateStr = JSON.stringify(this.initialState);
    } else {
      this.initialStateStr = "";
    }

    return await this.prepareReduxStore();
  }

  async prepareReduxStore() {
    const { subApp, context } = this.ref;

    // next we take the initial state and create redux store from it
    if (!this.store && subApp.reduxCreateStore) {
      const storeContainer =
        context.user.xarcReduxStoreContainer || (context.user.xarcReduxStoreContainer = {});

      this.store = await subApp.reduxCreateStore(this.initialState, storeContainer);
    }

    assert(
      this.store,
      `redux subapp ${subApp.name} didn't provide store, reduxCreateStore, or redux bundles`
    );

    if (!this.store.realize) {
      await this.signalStoreReady();
    }

    return this.store;
  }

  async realizeReduxStore() {
    const { subApp, subAppServer } = this.ref;

    if (this.store && this.store.realize) {
      this.store = this.store.realize();
      await this.signalStoreReady();
    }

    const packReduxData = subAppServer.packReduxData || subApp.packReduxData;
    // if subapp didn't request to skip sending initial state and packReduxData was specified,
    //  then stringify packReduxData's return value and attach it to the index html.
    if (packReduxData && !subAppServer.attachInitialState) {
      this.initialStateStr = JSON.stringify(packReduxData(this.store, this.ref.context));
    }
  }

  async signalStoreReady() {
    const reduxStoreReady =
      this.ref.subAppServer.reduxStoreReady || this.ref.subApp.reduxStoreReady;

    if (reduxStoreReady) {
      const { request } = this.ref.context.user;
      await reduxStoreReady({
        request,
        store: this.store,
        context: this.ref.context
      });
    }
  }
}

module.exports = FrameworkLib;
