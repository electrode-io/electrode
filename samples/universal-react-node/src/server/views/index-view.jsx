import ReduxRouterEngine from "electrode-redux-router-engine";
import React from "react";
import fs from "fs";
import path from "path";
import {createRoutes} from "../../client/routes";
import Promise from "bluebird";
import {createStore} from "redux";
import rootReducer from "../../client/reducers";

const readFileAsync = Promise.promisify(fs.readFile);

function storeInitializer(req, storage) {
  let initialState;
  if (req.path === "/") {
    initialState = {
      data: "This data is obtained from Redux store"
    };
  } else if (req.path === "/ssrcachingtemplatetype") {
    initialState = {
      count: 100
    };
  } else if (req.path === "/ssrcachingsimpletype") {
    initialState = {
      count: 100
    };
  } else if (req.path === "/above-the-fold") {
    initialState = {
      skip: req.query.skip === "true"
    };
  } else if (req.path === "/todo-app") {
    initialState = {
      visibilityFilter: storage.visibilityFilter,
      todos: storage.todos
    };
  } else {
    initialState = {};
  }

  return createStore(rootReducer, initialState);
}

function createReduxStore(req, match) {
  return Promise.all([
    // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
    Promise.resolve({}),
    readFileAsync(path.resolve("data", "storage.json"))
      .then(JSON.parse)
      .catch(() => {
        return {};
      })
  ])
    .then(([resulta, storage]) => storeInitializer(req, storage));
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
    app.routesEngine = new ReduxRouterEngine({
      routes: createRoutes(req),
      createReduxStore
    });
  }

  return app.routesEngine.render(req);
};
