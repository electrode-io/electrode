import React from "react";
import { Route } from "react-router";

class Error extends React.Component {
  render () {
    throw {
      status: 404
    };
  }
}

export default (
  <Route path="/" component={Error} />
);

class RedirectError extends React.Component {
  render () {
    const error = new Error();
    error.status = 302;
    error.path = "/new/location";
    throw error;
  }
}

const RedirectRoute = (
  <Route path="/redirect" component={RedirectError} />
);

export {RedirectRoute};
