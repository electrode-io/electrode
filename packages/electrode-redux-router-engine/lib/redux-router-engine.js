"use strict";

const Promise = require("bluebird");
const assert = require("assert");
const React = require("react");
const ReactDomServer = require("react-dom/server");
const ReactRouter = require("react-router");
const Provider = require("react-redux").Provider;

class ReduxRouterEngine {
  constructor(options) {
    assert(options.routes, "Must provide react-router routes for redux-router-engine");
    assert(options.createReduxStore, "Must provide createReduxStore for redux-router-engine");

    this.options = options;

    this.options.withIds = !!options.withIds;

    if (!options.stringifyPreloadedState) {
      this.options.stringifyPreloadedState =
        (state) => `window.__PRELOADED_STATE__ = ${JSON.stringify(state)};`;
    }

    if (!this.options.logError) {
      this.options.logError = (req, err) =>
        console.log("Electrode ReduxRouterEngine Error:", err); //eslint-disable-line
    }

    if (this.options.renderToString) {
      this._renderToString = this.options.renderToString;
    }
  }

  render(req, options) {
    const location = req.path || (req.url && req.url.path);

    return this._matchRoute({routes: this.options.routes, location})
      .then((match) => {
        if (match.redirectLocation) {
          return {
            status: 302,
            path: `${match.redirectLocation.pathname}${match.redirectLocation.search}`
          };
        }

        if (!match.renderProps) {
          return {
            status: 404,
            message: `redux-router-engine: Path ${location} not found`
          };
        }
        const routes = match.renderProps.routes;
        const methods = routes[routes.length - 1].methods || "get";

        if (methods.toLowerCase().indexOf(req.method.toLowerCase()) < 0) {
          throw new Error(
            `redux-router-engine: ${location} doesn't allow request method ${req.method}`);
        }

        return this._handleRender(req, match, options || {});
      })
      .catch((err) => {
        this.options.logError.call(this, req, err);
        return {
          status: err.status || 500, // eslint-disable-line
          message: err.message,
          path: err.path,
          _err: err
        };
      });
  }

  //
  // options: { routes, location: url_path }
  //
  _matchRoute(options) {
    return new Promise((resolve, reject) => {
      ReactRouter.match(options, (err, redirectLocation, renderProps) => {
        if (err) {
          reject(err);
        } else {
          resolve({redirectLocation, renderProps});
        }
      });
    });
  }

  _handleRender(req, match, options) {
    const withIds = options.withIds !== undefined ? options.withIds : this.options.withIds;
    const stringifyPreloadedState =
      options.stringifyPreloadedState || this.options.stringifyPreloadedState;

    return (options.createReduxStore || this.options.createReduxStore).call(this, req, match)
      .then((store) => {
        return {
          status: 200,
          html: this._renderToString(req, store, match, withIds),
          prefetch: stringifyPreloadedState(store.getState())
        };
      });

  }

  _renderToString(req, store, match, withIds) { // eslint-disable-line
    if (req.app && req.app.disableSSR) {
      return "";
    } else {
      return (withIds ? ReactDomServer.renderToString : ReactDomServer.renderToStaticMarkup)(
        React.createElement(
          Provider, {store},
          React.createElement(ReactRouter.RouterContext, match.renderProps)
        )
      );
    }
  }
}

module.exports = ReduxRouterEngine;
