import ReduxRouterEngine from 'electrode-redux-router-engine';
import React from 'react';
import ReactDOM from 'react-dom/server';

import { routes } from "../../client/routes";
const Promise = require("bluebird");
import { createStore } from "redux";
let rootReducer = (s, a) => s;

function storeInitializer(req) {
    let initialState;
    if(req.path === "/") {
      initialState = {
        data: "This data is obtained from Redux store"
      };
    } else if(req.path === "/ssrcachingtemplatetype") {
      initialState = {
        count: 100
      };
    } else if(req.path === "/ssrcachingsimpletype") {
      initialState = {
        count: 100
      };
    } else {
      let initialState = {};
    }

    const store = createStore(rootReducer, initialState);
    return store;
}

function createReduxStore(req, match) {
  const store = storeInitializer(req);
  return Promise.all([
      // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
      Promise.resolve({})
    ]).then(() => {
      return store;
  });
}

module.exports = (req) => {

  if (!req.server.app.routesEngine) {
    req.server.app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
  }

  return req.server.app.routesEngine.render(req);
};
