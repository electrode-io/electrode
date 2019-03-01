import { default as subApp, Component } from "./main-body";
import { reduxLoadSubApp } from "subapp-redux";

reduxLoadSubApp(subApp);

if (module.hot) {
  module.hot.accept("./main-body", () => {
    const r = require("./main-body");
    const x = require("subapp-redux");
    x.hotReloadSubApp(r.default);
  });
}
