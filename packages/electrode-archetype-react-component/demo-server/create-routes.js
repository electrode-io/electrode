"use strict";
// NO JSX/ES6 because this is running from `/node_modules` and needs to be able to run on IE9 as is

//
// Must use static require since this file gets bundled by webpack statically.
//

var React = require("react");
var ReactRouter = require("react-router");
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var Page = function (props) {
  return React.createElement(
    "div",
    null,
    props.children
  );
};

Page.propTypes = {
  children: React.PropTypes.any
};

module.exports = function (Demo) {
  return React.createElement(
    Route,
    { path: "/", component: Page },
    React.createElement(IndexRoute, { component: Demo })
  );
};
