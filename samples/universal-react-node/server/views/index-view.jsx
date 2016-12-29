import ReduxRouterEngine from 'electrode-redux-router-engine';
import React from 'react';

import { routes } from "../../client/routes";
const Promise = require("bluebird");
import { createStore } from "redux";
import rootReducer from "../../client/reducers";

function storeInitializer(req) {
    let initialState;
    let todo = {
      id:1,
      text: "hi"
    };
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
    } else if (req.path === "/above-the-fold") {
      initialState = {
        skip: req.query.skip === "true"
      }
    } else if (req.path === "todo-app"){
      initialState = {
        todos: todo,
        visibilityFilter: "SHOW_ALL"
      }
    } else {
      initialState = {};
    }

    return createStore(rootReducer, initialState);
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

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};
