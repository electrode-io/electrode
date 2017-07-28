"use strict";
/* eslint-disable no-var */

var React = require("react");
var PropTypes = require("prop-types");
var createReactClass = require("create-react-class");

// This function is called both during SSR (from server/app.js) and CSR (client/app.jsx). The
// request arg will be undefined when called during CSR.
var contextProvider = function(Component, appContext) {
  var ContextProvider = createReactClass({
    childContextTypes: {
      app: PropTypes.object
    },
    getChildContext: function() {
      return {app: appContext};
    },
    render: function() {
      return React.createElement(Component, this.props);
    }
  });

  return ContextProvider;
};

module.exports = contextProvider;
