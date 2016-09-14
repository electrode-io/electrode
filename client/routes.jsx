import React from "react";
import { Route, IndexRoute} from "react-router";
import { Home } from "./components/home";
import { CSRF } from "./components/csrf";
import { AboveFold } from "./components/above-fold-simple";
import { ContextKey } from "./components/above-fold-context-key";

export const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="csrf" component={CSRF} />
    <Route path="above-fold-simple" component={AboveFold} />
    <Route path="above-fold-context-key" component={ContextKey} />
  </Route>
);
