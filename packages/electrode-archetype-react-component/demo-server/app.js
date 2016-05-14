/*global document:false*/
"use strict";
// NO JSX because this is running from `/node_modules`
const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const React = archDevRequire("react");
const Resolver = archDevRequire("react-resolver").Resolver;
const Router = archDevRequire("react-router").Router;
const createHistory = archDevRequire("history").createHistory;

require("./demo.styl");

const routes = require("./client-routes");

const content = document.querySelector(".js-content");

Resolver.render(() => {
  return React.createElement(
    Router,
    { history: createHistory() },
    routes
  );
}, content);
