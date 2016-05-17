"use strict";
// NO JSX because this is running from `/node_modules`

//
// Must use static require since this file gets bundled by webpack statically.
//

const React = require("react");
const ReactRouter = require("react-router");
const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;

const Page = (props) => {
  return React.createElement(
    "div",
    null,
    props.children
  );
};

Page.propTypes = {
  children: React.PropTypes.any
};

module.exports = (Demo) => {
  return React.createElement(
    Route,
    { path: "/", component: Page },
    React.createElement(IndexRoute, { component: Demo })
  );
};
