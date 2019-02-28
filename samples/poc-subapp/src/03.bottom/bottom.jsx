import React from "react";
import { getBrowserHistory } from "subapp-web";
import { withRouter } from "react-router";
import { Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { connect } from "react-redux";

const MoreProducts = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">More Products</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  );
};

const MoreDeals = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">More Deals</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  );
};

const Bottom = props => {
  return (
    <Switch>
      <Route path="/products" component={MoreProducts} {...props} />
      <Route path="/deals" component={MoreDeals} {...props} />
    </Switch>
  );
};

const name = "Bottom";

const Component = withRouter(
  connect(
    state => state,
    dispatch => ({ dispatch })
  )(Bottom)
);

const subApp = {
  name,
  useReactRouter: true,
  Component,
  StartComponent: props => {
    return (
      <Router history={getBrowserHistory()}>
        <Component {...props} />
      </Router>
    );
  },
  reduxCreateStore: () => {
    return createStore(s => s, {});
  }
};

export { name, subApp as default, Component };
