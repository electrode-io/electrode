import RouterResolverEngine from "electrode-router-resolver-engine";
import { routes } from "../../client/routes";
const Promise = require("bluebird");
import { createStore } from "redux";
let rootReducer = (s, a) => s;

function storeInitializer(req) {
    if(req.path === "/") {
      let initialState = {
        data: "This data is obtained from Redux store"
      };

      const store = createStore(rootReducer, initialState);
      return store;
    } else if(req.path === "/ssrcachingtemplatetype") {
      let initialState = {
        count: 100
      };

      const store = createStore(rootReducer, initialState);
      return store;
    } else if(req.path === "/ssrcachingsimpletype") {
      let initialState = {
        count: 100
      };

      const store = createStore(rootReducer, initialState);
      return store;
    } else if(req.path === "/profile/get") {
      let initialState = {
        type: "get"
      };

      const store = createStore(rootReducer, initialState);
      return store;
    } else if(req.path === "/profile/clear") {
      let initialState = {
        type: "clear"
      };

      const store = createStore(rootReducer, initialState);
      return store;
    } else if(req.path === "/profile/enable") {
      let initialState = {
        type: "enable"
      };

      const store = createStore(rootReducer, initialState);
      return store;
    } else if(req.path === "/profile/disable") {
      let initialState = {
        type: "disable"
      };

      const store = createStore(rootReducer, initialState);
      return store;
    }
}

module.exports = (req) => {
  var options = {
    redux: {
      storeInitializer: storeInitializer
    }
  };

  if (!req.server.app.routesEngine) {
    req.server.app.routesEngine = RouterResolverEngine(routes, options);
  }


  return req.server.app.routesEngine(req, options);
};
