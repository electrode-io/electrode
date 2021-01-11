import { React, ReactSubApp, xarcV2, AppContext } from "@xarc/react";
import { connect, reduxFeature } from "@xarc/react-redux";
import { reactRouterFeature, Route, Switch, ReactRouter } from "@xarc/react-router";
import PropTypes from "prop-types";
import { Large } from "../components/large";
import classNames from "classnames";
import custom from "../styles/bootstrap.css";
// import AdvGridList from "../components/adv-grid";

const { withRouter } = ReactRouter;

const MoreProducts = props => {
  return (
    <div className={custom.container}>
      <h1 className={custom["display-4"]}>More Products</h1>
      <Large breadth={14} depth={5} {...props} />
      <p className={custom.lead}>
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
    <div className={classNames(custom["jumbotron"], custom["jumbotron-fluid"])}>
      <div className={custom.container}>
        <h1 className={custom["display-4"]}>More Deals</h1>
        <p className={custom.lead}>
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

const Component = withRouter(
  connect(
    state => state,
    dispatch => ({ dispatch })
  )(Bottom)
);

export const subapp: ReactSubApp = {
  Component,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true,
      // provider({ Component, props }) {}
      prepare: async initialState => {
        xarcV2.debug("Bottom (bottom.tsx) subapp redux prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return { initialState: { title: { value: "Bottom Title" } } };
        }
      }
    }),
    reactRouterFeature({ React })
  ]
};
