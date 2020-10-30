import { React, declareSubApp, createDynamicComponent, ReactSubApp, xarcV2 } from "@xarc/react";
import { message } from "./message";
import electrodePng from "../static/electrode.png";
import { Component as Demo2 } from "./demo2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import custom from "./styles/custom.module.css"; // eslint-disable-line no-unused-vars
import { reduxFeature } from "@xarc/redux";
import { reactRouterFeature } from "@xarc/react-router";
import { Route, Switch } from "react-router-dom";

export const demo1 = declareSubApp({
  name: "demo1",
  getModule: () => import("./demo1")
});

export const demo1B = declareSubApp({
  name: "demo1b",
  getModule: () => import("./demo1")
});

const Demo1 = createDynamicComponent(demo1, { ssr: true });
const Demo1B = createDynamicComponent(demo1B, { ssr: true });

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

const Home = props => {
  // TODO: Problem with typescript only.  Need this dummy var assign to reference custom
  // import else something drops it.
  const y = custom; // eslint-disable-line
  const { dispatch } = props;
  return (
    <div styleName="custom.container">
      <h1 style={{ textAlign: "center" }}>
        Hello from{" "}
        <a href="https://www.electrode.io">
          Electrode <img src={electrodePng} />
        </a>
      </h1>
      PROPS (Different between server and client): {JSON.stringify(props)}
      <p>
        Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        <input style={{ textAlign: "center" }} readOnly size="6" value={props.value} />
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </p>
      <p>message: {message}</p>
      <Demo1 />
      <Demo1B />
      <Demo2 />
    </div>
  );
};

Home.propTypes = {
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

const Component = connect(mapStateToProps, dispatch => ({ dispatch }))(Home);

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
  Component: HomeRouter,
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
