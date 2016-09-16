import React from "react";
import { routes } from "./routes";
import { Router } from "react-router";
import { createStore } from "redux";
import { Resolver } from "react-resolver";
import { createHistory } from "history";
import { Provider } from "react-redux";
import "styles/base.css";

const initialState = window.__PRELOADED_STATE__;

let rootReducer = (s, a) => s
const store = createStore(rootReducer, initialState);

window.webappStart = () => {
  Resolver.render(
    () =>
      <Provider store={store}>
        <Router history={createHistory()}>{routes}</Router>
      </Provider>,
    document.querySelector(".js-content")
  );
};
