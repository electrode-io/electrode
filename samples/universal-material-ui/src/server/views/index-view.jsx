import RouterResolverEngine from "electrode-router-resolver-engine";
import injectTapEventPlugin from 'react-tap-event-plugin';
import {routes} from "../../client/routes";

module.exports = (req) => {
  // For Warning: Material UI: userAgent should be supplied in the muiTheme context for server-side rendering
  global.navigator = global.navigator || {};
  global.navigator.userAgent = req.headers['user-agent'] || 'all';

  if (!req.server.app.routesEngine) {
    // For Warning: Unknown prop `onTouchTap` on <button> tag.
    injectTapEventPlugin();
    req.server.app.routesEngine = RouterResolverEngine(routes);
  }

  return req.server.app.routesEngine(req);
};
