import ReduxRouterEngine from "electrode-redux-router-engine";
import routes from "../../client/rr4-routes";

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = req => {
  const app = (req.server && req.server.app) || req.app;
  if (!app.routesEngine) {
    //
    // not passing in routesHandlerPath to let the engine figure out
    // default dir by using APP_SRC_DIR/server/routes
    //
    app.routesEngine = new ReduxRouterEngine({ routes });
  }

  return app.routesEngine.render(req);
};
