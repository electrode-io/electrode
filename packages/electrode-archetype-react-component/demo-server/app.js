/*global document:false*/
"use strict";
// NO JSX/ES6 because this is running from `/node_modules` and needs to be able to run on IE9 as is

//
// Must use static require since this file gets bundled by webpack statically.
//

var React = require("react");
var Resolver = require("react-resolver").Resolver;
var Router = require("react-router").Router;

var browserHistory = require("react-router").browserHistory;

require("./demo.styl");

var routes = require("./client-routes");

var content = document.querySelector(".js-content");

Resolver.render(function () {
  return React.createElement(
    Router,
    { history: browserHistory },
    routes
  );
}, content);
