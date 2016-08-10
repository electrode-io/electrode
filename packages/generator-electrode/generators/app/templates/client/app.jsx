import React from "react";
import { routes } from "./routes";
import { Router } from "react-router";
import { Resolver } from "react-resolver";
import { createHistory } from "history";

window.webappStart = () => {
  Resolver.render(
    () => <Router history={createHistory()}>{routes}</Router>,
    document.querySelector(".js-content")
  );
};

