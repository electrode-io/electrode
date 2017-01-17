import ReduxRouterEngine from 'electrode-redux-router-engine';
import React from 'react';
import fs from 'fs';
import path from 'path';

import { routes } from "../../client/routes";
const Promise = require("bluebird");
import { createStore } from "redux";
import rootReducer from "../../client/reducers";

function storeInitializer(req, items) {
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
    } else if (req.path === "/above-the-fold") {
      initialState = {
        skip: req.query.skip === "true"
      };
    } else if (req.path === "/todo-app"){
      if(items){
        initialState = items;
      }
    } else {
      initialState = {};
    }

    return createStore(rootReducer, initialState);
}

function createReduxStore(req, match) {
  return Promise.all([
      // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
      Promise.resolve({}),
      new Promise((resolve, reject) => {
        fs.readFile(path.join(process.cwd(),"/server/storage.json") , (err, data)=> {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
      .then(JSON.parse)
      .catch(() => {
        return {};
      })
    ]).then(([resulta, resultb]) => {
      const store = storeInitializer(req, resultb);
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
