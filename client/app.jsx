import React from "react";
import { routes } from "./routes";
import { Router, browserHistory } from "react-router";
import { createStore, compose } from "redux";
import { Resolver } from "react-resolver";
import { Provider } from "react-redux";
import "styles/base.css";
import rootReducer from "./reducers/index";

import DevTools from "../client/devtools";

const initialState = window.__PRELOADED_STATE__;

// const rootReducer = (s, a) => s; // eslint-disable-line no-unused-vars

const enhancer = compose(
  // Add middlewares you want to use in development:
  // applyMiddleware(d1, d2, d3),
  DevTools.instrument()
);

const store = createStore(rootReducer, initialState, enhancer);

window.webappStart = () => {
  Resolver.render(
    () =>
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools />
        </div>
      </Provider>,
    document.querySelector(".js-content")
  );
};
