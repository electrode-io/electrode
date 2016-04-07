/*global document:false*/
"use strict";
// NO JSX because this is running from `/node_modules`
const React = require("react");
const Resolver = require("react-resolver").Resolver;
const Router = require("react-router").Router;
const createHistory = require("history").createHistory;

const routes = require("./client-routes");

const content = document.querySelector(".js-content");

require("@walmart/lithe-core");
require("./demo.styl");

Resolver.render(() => {
  return React.createElement(
    Router,
    { history: createHistory() },
    routes
  );
}, content);
