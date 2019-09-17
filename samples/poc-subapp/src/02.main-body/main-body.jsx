import React from "react";
import { getBrowserHistory } from "subapp-web";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Router, Route, Switch } from "react-router-dom";
import { Products } from "../components/products";
import { Navigation } from "../components/navigation";
import { Deals } from "../components/deals";
import { createStore } from "redux";
import reducers from "./reducers";
import { reduxLoadSubApp } from "subapp-redux";

const Home = () => `Home`;
const Stores = () => `Stores`;
const Contact = () => `Contact`;

const MainBody = props => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} {...props} />
        <Route path="/products" component={Products} {...props} />
        <Route path="/deals" component={Deals} {...props} />
        <Route path="/stores" component={Stores} {...props} />
        <Route path="/contact" component={Contact} {...props} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => state;

const Component = withRouter(
  connect(
    mapStateToProps,
    dispatch => ({ dispatch })
  )(MainBody)
);

export default reduxLoadSubApp({
  name: "MainBody",
  Component,
  useReactRouter: true,

  StartComponent: props => {
    return (
      <Router history={getBrowserHistory()}>
        <Component {...props} />
      </Router>
    );
  },

  prepare: async () => {},

  reduxReducers: "./reducers",

  reduxCreateStore: initialState => {
    const store = createStore(reducers, initialState);

    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(require("./reducers").default);
      });
    }

    return store;
  }
});
