import React from "react";
import { Route, IndexRoute } from "react-router";
import Page from "./components/page";
import Home from "./components/home";
import SSRCachingTemplateType from "./components/ssr-caching-template-type";
import SSRCachingSimpleType from "./components/ssr-caching-simple-type";
import { CSRF } from "./components/csrf";
import AboveFold from "./components/above-the-fold";
import PushNotifications from "./components/push-notifications";
import TodoApp from "./components/todo-app";
import RecordStore from "./components/record-store";
import AppContext from "./components/app-context";

import electrodeContext from "electrode-react-context";

export const createRoutes = (request) => {
  return (
    <Route path="/" component={electrodeContext(Page, {request})}>
      <IndexRoute component={Home} />
      <Route path="ssrcachingtemplatetype" component={SSRCachingTemplateType} />
      <Route path="ssrcachingsimpletype" component={SSRCachingSimpleType} />
      <Route path="csrf" component={CSRF} />
      <Route path="above-the-fold" component={AboveFold} />
      <Route path="push-notifications" component={PushNotifications} />
      <Route path="todo-app" component={TodoApp} />
      <Route path="record-store" component={RecordStore} />
      <Route path="app-context" component={AppContext} />
    </Route>
  );
};
