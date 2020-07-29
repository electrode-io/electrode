"use strict";
//
// relay message between the webpack dev server and app server in dev mode
//

const _ = require("lodash");

const isomorphicConfig = require("isomorphic-loader/lib/config");

const WEBPACK_DEV_MESSAGES = [
  // received config from isomorphic-loader webpack plugin
  isomorphicConfig.configName,
  // received webpack compile report, for refresh assets in SSR
  "webpack-report",
  // received webpack compile stats
  "webpack-stats"
];

class WebpackDevRelay {
  constructor() {
    this._webpackData = {};
    this._servers = {};
  }

  //
  // When webpack is in dev server mode, all the compiled assets are written to
  // an in-memory filesystem and served through a http server at the default port
  // 2992 (env.WEBPACK_DEV_PORT).  App server needs these information:
  // - webpack's stats output to determine the assets to load for its web pages.
  // - isormophic assets config to determine assets to load during SSR
  // - webpack's incremental compile report to determine assets to refresh for SSR
  //
  // When the app server first starts up, it must wait for webpack dev server
  // to get the initial webpack stats and isomorphic config.
  // - If app server restarts, the admin server must send existing webpack result to it.
  // - If webpack dev server restarts, it will send new stats to the appserver
  //
  // - stats is written to a temp file on disk currently.
  //
  receiveWebpackDevMessage(data) {
    if (WEBPACK_DEV_MESSAGES.indexOf(data.name) >= 0) {
      this._webpackData[data.name] = data;
      if (this._servers.app) {
        this._servers.app.child.send(data);
      }
    } else {
      console.log("Unknown message received from webpack dev server", data.name); // eslint-disable-line
    }
  }

  receiveAppServerMessage() {}

  _setServer(name, child, handlers) {
    const info = this._servers[name];
    if (info) {
      for (const event in info.handlers) {
        info.child.removeListener(event, info.handlers[event]);
      }
      this._servers[name] = undefined;
    }

    if (!child) return undefined;
    this._servers[name] = { child, handlers };

    for (const event in handlers) {
      child.on(event, handlers[event]);
    }

    return info;
  }

  setWebpackServer(child) {
    this._setServer("wds", child, {
      message: data => this.receiveWebpackDevMessage(data),
      exit: () => {
        this._webpackData = {};
        this._setServer("wds", null);
      }
    });
  }

  setAppServer(child) {
    this._setServer("app", child, {
      message: data => this.receiveAppServerMessage(data),
      exit: () => this._setServer("app", null)
    });
    if (child) {
      setTimeout(() => {
        _.each(this._webpackData, data => {
          child.send(data);
        });
      }, 1);
    }
  }
}

module.exports = WebpackDevRelay;
