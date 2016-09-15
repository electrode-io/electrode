import React from "react";
import { Route, IndexRoute} from "react-router";
import Home from "./components/home";
import SSRCachingTemplateType from "./components/SSRCachingTemplateType";
import SSRCachingSimpleType from "./components/SSRCachingSimpleType";
import { CSRF } from "./components/csrf";
import { AboveFold } from "./components/above-the-fold";

export const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="ssrcachingtemplatetype" component={SSRCachingTemplateType} />
    <Route path="ssrcachingsimpletype" component={SSRCachingSimpleType} />
    <Route path="csrf" component={CSRF} />
    <Route path="above-the-fold" component={AboveFold} />
  </Route>
);
