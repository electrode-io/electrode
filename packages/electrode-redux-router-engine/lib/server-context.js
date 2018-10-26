"use strict";

const React = require("react");
const PropTypes = require("prop-types");

class ServerContext extends React.Component {
  getChildContext() {
    return {
      // Electrode Platform context app object
      // - Should contain request object
      // - On client side this is not necessary exist so React code should never
      //   access this.context.ssr.request unless it checks this.context.ssr first.
      ssr: {
        request: this.props.request
      }
    };
  }

  render() {
    return this.props.children;
  }
}

ServerContext.childContextTypes = {
  ssr: PropTypes.object
};

module.exports = ServerContext;
