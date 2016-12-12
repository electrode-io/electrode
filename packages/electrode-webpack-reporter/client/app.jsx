import React from "react";
// import {routes} from "./routes";
// import {Router, browserHistory} from "react-router";
import {render, unmountComponentAtNode} from "react-dom";
import "./styles/base.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers";
import Home from "./components/home";
//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

window.webappStart = () => {
  if (!injectTapEventPlugin) {
    injectTapEventPlugin(); // https://github.com/callemall/material-ui/issues/4670
  }
  const headers = new Headers(); // eslint-disable-line no-undef
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  fetch(new Request("/reporter", { // eslint-disable-line no-undef
    method: "GET",
    headers
  })).then((response) => {
    // for developing with electrode server <Router history={browserHistory}>{routes}</Router>
    return response.json().then((initialState) => {
      const store = createStore(rootReducer, initialState);
      const appContainer = document.querySelector(".js-content");
      unmountComponentAtNode(appContainer);
      render(
        <Provider store={store}>
          <Home />
        </Provider>,
        appContainer
      );
    });
  });
};
