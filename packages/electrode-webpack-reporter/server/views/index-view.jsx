import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "../../client/routes";
import { createStore } from "redux";

function createReduxStore(req, match) {
  let rootReducer = (s, a) => s;

  const initialState = {
    stats: {}
  };

  createStore(rootReducer, initialState);
}

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};
