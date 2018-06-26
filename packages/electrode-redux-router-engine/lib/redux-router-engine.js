"use strict";

/* eslint-disable  max-statements, max-params, prefer-spread, global-require, complexity */

const Path = require("path");
const assert = require("assert");
const optionalRequire = require("optional-require")(require);
const React = optionalRequire("react");
const ReactDomServer = optionalRequire("react-dom/server");
const Provider = require("react-redux").Provider;
const { StaticRouter } = require("react-router-dom");
const { matchRoutes, renderRoutes } = require("react-router-config");
const { combineReducers, createStore } = require("redux");
const pkg = require("../package.json");
const util = require("./util");

const BAD_CHARS_REGEXP = /[<\u2028\u2029]/g;
const REPLACEMENTS_FOR_BAD_CHARS = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};

function escapeBadChars(sourceString) {
  return sourceString.replace(BAD_CHARS_REGEXP, match => REPLACEMENTS_FOR_BAD_CHARS[match]);
}

const ROUTE_HANDLER = Symbol("route handler");

class ReduxRouterEngine {
  constructor(options) {
    assert(options.routes, "Must provide react-router routes for redux-router-engine");

    this.options = options;

    this.options.withIds = !!options.withIds;

    if (!options.stringifyPreloadedState) {
      this.options.stringifyPreloadedState = state =>
        `window.__PRELOADED_STATE__ = ${escapeBadChars(JSON.stringify(state))};`;
    }

    if (!this.options.logError) {
      this.options.logError = (req, err) => console.log(`${pkg.name} Error:`, err); //eslint-disable-line
    }

    if (this.options.renderToString) {
      this._renderToString = this.options.renderToString;
    }

    // if options.routes is a string, then treat it as a path to the routes source for require
    if (typeof options.routes === "string") {
      const x = util.resolveModulePath(options.routes);
      this._routes = util.es6Default(require(x));
    } else {
      this._routes = options.routes;
    }

    this._routesDir = options.routesHandlerPath
      ? Path.resolve(options.routesHandlerPath)
      : Path.resolve(process.env.APP_SRC_DIR || "", "server/routes");

    this._routesComponent = renderRoutes(this._routes);
  }

  async render(req, options) {
    const location = req.path || (req.url && req.url.path);

    try {
      const match = this._matchRoute(req, this._routes, location);

      if (match.length === 0) {
        return {
          status: 404,
          message: `${pkg.name}: Path ${location} not found`
        };
      }

      // TODO: support redirect
      // const redirect = match.find(x => x.redirect);
      // if (redirect) {
      //   return {
      //     status: 302,
      //     path: `${redirect.redirect}`
      //   };
      // }

      const methods = match[0].methods || "get";

      if (methods.toLowerCase().indexOf(req.method.toLowerCase()) < 0) {
        throw new Error(`${pkg.name}: ${location} doesn't allow request method ${req.method}`);
      }

      return await this._handleRender(req, location, match, options || {});
    } catch (err) {
      this.options.logError.call(this, req, err);
      return {
        status: err.status || 500, // eslint-disable-line
        message: err.message,
        path: err.path || location,
        _err: err
      };
    }
  }

  //
  _matchRoute(req, routes, location) {
    return matchRoutes(routes, location);
  }

  async _handleRender(req, location, match, options) {
    const withIds = options.withIds !== undefined ? options.withIds : this.options.withIds;
    const stringifyPreloadedState =
      options.stringifyPreloadedState || this.options.stringifyPreloadedState;

    const inits = [];

    for (let ri = 1; ri < match.length; ri++) {
      const route = match[ri].route;
      const init = this._getRouteInit(route);
      if (init) inits.push(init({ req, location, match, route, inits }));
    }

    let awaited = false;
    const awaitInits = async () => {
      if (awaited) return;
      awaited = true;
      for (let x = 0; x < inits.length; x++) {
        if (inits[x].then) inits[x] = await inits[x];
      }
    };

    let topInit = this._getRouteInit(match[0].route);
    if (topInit) {
      topInit = topInit({ req, location, match, route: match[0].route, inits, awaitInits });
    }

    if (topInit.then) {
      await awaitInits();
      topInit = await topInit;
    }

    let store;
    if (topInit.store) {
      // top route provided a ready made store, just use it
      store = topInit.store;
    } else {
      if (!awaited) await awaitInits();

      let reducer;
      let initialState;

      if (topInit.initialState || inits.length > 0) {
        initialState = Object.assign.apply(
          null,
          [{}, topInit.initialState].concat(inits.map(x => x.initialState))
        );
      } else {
        // no route provided any initialState
        initialState = {};
      }

      if (typeof topInit.reducer === "function") {
        // top route provided a ready made reducer
        reducer = topInit.reducer;
      } else if (topInit.reducer || inits.length > 0) {
        // top route only provide its own reducer and initialState
        const allReducers = Object.assign.apply(
          null,
          [{}, topInit.reducer].concat(inits.map(x => x.reducer))
        );

        reducer = combineReducers(allReducers);
      } else {
        // no route provided any reducer
        reducer = x => x;
      }

      store = createStore(reducer, initialState);
    }

    let html = this._renderToString(req, location, store, match, withIds);
    if (html.then !== undefined) {
      // a Promise?
      html = await html;
    }

    return { status: 200, html, prefetch: stringifyPreloadedState(store.getState()) };
  }

  _renderToString(req, location, store, match, withIds) {
    if (req.app && req.app.disableSSR) {
      return "<!-- SSR disabled by request -->";
    } else {
      assert(React, `${pkg.name}: can't do SSR because react not found`);
      assert(ReactDomServer, `${pkg.name}: can't do SSR because react-dom not found`);
      const context = {};
      return (withIds ? ReactDomServer.renderToString : ReactDomServer.renderToStaticMarkup)(
        React.createElement(
          Provider,
          { store },
          React.createElement(StaticRouter, { location, context }, this._routesComponent)
        )
      );
    }
  }

  _getRouteInit(route) {
    let h = route[ROUTE_HANDLER];

    if (h !== undefined) return h;

    if (!route.init) {
      h = false;
    } else if (route.init === true) {
      h = Path.join(this._routesDir, route.path);
    } else {
      assert(typeof route.init === "string", `${pkg.name}: route init prop must be a string`);
      h = util.resolveModulePath(route.init, this._routesDir);
    }

    if (h) {
      h = util.es6Default(require(h));
    }

    route[ROUTE_HANDLER] = h;

    return h;
  }
}

module.exports = ReduxRouterEngine;
