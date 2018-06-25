import React from "react";
import { Route } from "react-router";

const renderFlatRoutes = (routes, extraProps = {}) =>
  routes
    ? routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))
    : null;

export { renderFlatRoutes };
