import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "./routes";

let routesEngine;

module.exports = req => {
  if (!routesEngine) {
    routesEngine = new ReduxRouterEngine({ routes, componentRedirect: true });
  }

  return routesEngine.render(req).then(data => {
    return Object.assign({}, data, { verbatim: true, status: 560 });
  });
};
