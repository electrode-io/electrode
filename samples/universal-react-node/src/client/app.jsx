import React from "react";
import {render, hydrate} from "react-dom";
import {routes} from "./routes";
import {Router, browserHistory} from "react-router";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {notify} from "react-notify-toast";
import "./styles/base.css";
import rootReducer from "./reducers";
import DevTools from "./devtools";
import updateStorage from "./middleware";

require.ensure(["./sw-registration"], (require) => {
  require("./sw-registration")(notify);
}, "sw-registration");

const enhancer = compose(
  // Add middlewares you want to use in development:
  // applyMiddleware(d1, d2, d3),
  applyMiddleware(updateStorage),
  DevTools.instrument()
);

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const jsContent = document.querySelector(".js-content");

  const store = createStore(rootReducer, initialState, enhancer);
  const reactStart = (initialState && jsContent.innerHTML) ? hydrate : render;
  reactStart(
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>{routes}</Router>
          <DevTools />
        </div>
      </Provider>,
    jsContent
  );
};
