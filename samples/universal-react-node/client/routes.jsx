import React from "react";
import { Route, IndexRoute} from "react-router";
import { Home } from "./components/home";

export const routes = (
  <Route path="/" component={Home} />
);
