import React from "react";
import Home from "./components/home";
import SSRCachingTemplateType from "./components/ssr-caching-template-type";
import SSRCachingSimpleType from "./components/ssr-caching-simple-type";
import { CSRF } from "./components/csrf";
import AboveFold from "./components/above-the-fold";
import PushNotifications from "./components/push-notifications";
import TodoApp from "./components/todo-app";
import RecordStore from "./components/record-store";
import PropTypes from "prop-types";

import { renderRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";

const Page = ({ route, children }) => (
  <div>
    {renderRoutes(route.routes)}
    {children}
  </div>
);

Page.propTypes = {
  route: PropTypes.object,
  children: PropTypes.object
};

const routes = [
  {
    path: "/",
    init: "./init-top",
    // top component need to be wrapped withRouter to work with Redux
    component: withRouter(Page),
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/ssrcachingtemplatetype",
        component: SSRCachingTemplateType,
        init: true
      },
      {
        path: "/ssrcachingsimpletype",
        component: SSRCachingSimpleType,
        init: true
      },
      {
        path: "/csrf",
        component: CSRF
      },
      {
        path: "/push-notifications",
        component: PushNotifications
      },
      {
        path: "/todo-app",
        component: TodoApp,
        init: true
      },
      {
        path: "/record-store",
        component: RecordStore
      },
      {
        path: "/above-the-fold",
        component: AboveFold,
        init: true
      }
    ]
  }
];

export { routes as default };
