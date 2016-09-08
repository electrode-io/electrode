import React from "react";
import { Route, IndexRoute} from "react-router";
import { Home } from "./components/home";
import { CSRF } from "./components/csrf";

export const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="csrf" component={CSRF} />
  </Route>
);
