import React from "react";
import { Route, IndexRoute} from "react-router";
import { Home } from "./components/home";
import { CSRF } from "./components/csrf";
import { AboveFold } from "./components/above-the-fold";

export const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="csrf" component={CSRF} />
    <Route path="above-the-fold" component={AboveFold} />
  </Route>
);
