import React from "react";
import { getBrowserHistory } from "subapp-web";
import { withRouter } from "react-router";
import { Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Large from "../components/large";
// import AdvGridList from "../components/adv-grid";

const MoreProducts = props => {
  return (
    <div className="container">
      <h1 className="display-4">More Products</h1>
      <Large breadth={14} depth={5} {...props} />
      <p className="lead">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
};

MoreProducts.propTypes = {
  imagesData: PropTypes.array.isRequired
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
      <Route path="/products" component={() => <MoreProducts {...props} imagesData={[]} />} />
      <Route path="/deals" component={MoreDeals} />
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
  reduxCreateStore: initialState => {
    return createStore(s => s, initialState);
  }
};

export { name, subApp as default, Component };
