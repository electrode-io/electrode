import React from "react";
import PropTypes from "prop-types";
import Home from "./components/home";
import Demo1 from "./components/demo1";
import Demo2 from "./components/demo2";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import DemoSso from "./components/demo-sso";
import demoSignin from "./components/demo-signin";

const Root = ({ route, children }) => {
  return (
    <div>
      {renderRoutes(route.routes)}
      {children}
    </div>
  );
};

Root.propTypes = {
  route: PropTypes.object,
  children: PropTypes.object
};

const routes = [
  {
    path: "/",
    component: withRouter(Root),
    init: "./init-top",
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/demo1",
        exact: true,
        component: Demo1
      },
      {
        path: "/demo2",
        exact: true,
        component: Demo2
      },
      {
        path: "/demosso",
        exact: true,
        component: DemoSso
      },
      {
        path: "/demosignin",
        exact: true,
        component: demoSignin
      }
    ]
  }
];

export { routes };
