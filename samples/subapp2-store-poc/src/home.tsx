import PropTypes from "prop-types";
import { React, declareSubApp, createDynamicComponent, ReactSubApp, xarcV2, AppContext } from "@xarc/react";
import { connect, reduxFeature } from "@xarc/react-redux";
import { reactRouterFeature, Route, Switch } from "@xarc/react-router";
import { Component as Demo2 } from "./demo2";
import { message } from "./message";
import electrodePng from "../static/electrode.png";
import custom from "./styles/custom.module.css"; // eslint-disable-line no-unused-vars
import { withRouter } from "react-router";



export const demo1 = declareSubApp({
  name: "demo1",
  getModule: () => import("./demo1")
});

export const demo1B = declareSubApp({
  name: "demo1b",
  getModule: () => import("./demo1")
});

export const navigation = declareSubApp({
  name: "navigation",
  getModule: () => import("./components/navigation")
})

export const products = declareSubApp({
  name: "products",
  getModule: () => import("./components/products")
})



const Demo1 = createDynamicComponent(demo1, { ssr: true });
const Demo1B = createDynamicComponent(demo1B, { ssr: true });
const Navigation = createDynamicComponent(navigation, { ssr: true });
const Products = createDynamicComponent(products, { ssr: true });



const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Stores = () => `<h1>Stores</h1>`;
const Contact = () => `<h1>Contact</h1>`;

const Home = () => {
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr, subApp }) => {
        return (
          <div className="container-fluid text-center">
            <p>HOME</p>

            <div>SubApp name: {subApp ? subApp.name : "Not Available from context"}</div>
            <div>
              IS_SSR: {`${Boolean(isSsr)}`} HAS_REQUEST: {ssr && ssr.request ? "yes" : "no"}
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

const MainBody = props => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} {...props} />
        <Route path="/products" component={Products} {...props} />
        <Route path="/stores" component={Stores} {...props} />
        <Route path="/contact" component={Contact} {...props} />
      </Switch>
    </div>
  );
};

MainBody.propTypes = {
  value: PropTypes.number,
  dispatch: PropTypes.func
};

export const reload = msg => {
  console.log("reload", msg, message); // eslint-disable-line
};

//
// REDUX
//

const mapStateToProps = state => {
  return { value: state.number.value };
};

const Component = connect(mapStateToProps, dispatch => ({ dispatch }))(MainBody);

//
// ROUTING
//

const HomeRouter = () => {
  return (
    <Switch>
      <Route path="/" exact component={Component} />
      <Route path="/mix" component={Component} />
    </Switch>
  );
};

export const subapp: ReactSubApp = {
  Component: Component,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true,
      // provider({ Component, props }) {}
      prepare: async initialState => {
        xarcV2.debug("Home (home.tsx) subapp redux prepare, initialState:", initialState);
        if (initialState) {
          return { initialState };
        } else {
          return { initialState: { number: { value: -1 } } };
        }
      }
    }),
    // https://reactrouter.com/
    reactRouterFeature({ React })
    // TODO: https://react-query.tanstack.com/docs/overview
    // reactQueryFeature({})
    // TODO: https://recoiljs.org/
    // recoilFeature({})
  ]
};

//
// REDUX reducer
//

export const reduxReducers = {
  number: (store, action) => {
    if (action.type === "INC_NUMBER") {
      return {
        value: store.value + 1
      };
    } else if (action.type === "DEC_NUMBER") {
      return {
        value: store.value - 1
      };
    }

    return store || { value: 999 };
  }
};
