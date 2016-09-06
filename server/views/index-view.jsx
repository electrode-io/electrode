import RouterResolverEngine from "electrode-router-resolver-engine";
import { routes } from "../../client/routes";

module.exports = (req) => {
  if (!req.server.app.routesEngine) {
    req.server.app.routesEngine = RouterResolverEngine(routes);
  }

  return req.server.app.routesEngine(req);
};
