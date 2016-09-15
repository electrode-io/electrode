import React from "react";
import {routes} from "./routes";
import {Router} from "react-router";
import {Resolver} from "react-resolver";
import {createHistory} from "history";
import "./styles/base.css";

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

window.webappStart = () => {
  Resolver.render(
    () => <Router history={createHistory()}>{routes}</Router>,
    document.querySelector(".js-content")
  );
};
