// @flow
import React from "react";
import { render, hydrate } from "react-dom";
import routes from "./rr4-routes";
import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { notify } from "react-notify-toast";
import "./styles/base.css";
import rootReducer from "./reducers";
import DevTools from "./devtools";
import updateStorage from "./middleware";

import { renderRoutes } from "react-router-config";

require.ensure(
  ["./sw-registration"],
  require => {
    require("./sw-registration")(notify);
  },
  "sw-registration"
);

const enhancer = compose(
  // Add middlewares you want to use in development:
  // applyMiddleware(d1, d2, d3),
  applyMiddleware(updateStorage),
  DevTools.instrument()
);

window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const jsContent: any = document.querySelector(".js-content");

  const store = createStore(rootReducer, initialState, enhancer);
  const reactStart = initialState && jsContent.innerHTML ? hydrate : render;
  reactStart(
    <Provider store={store}>
      <div>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
        <DevTools />
      </div>
    </Provider>,
    jsContent
  );
};
