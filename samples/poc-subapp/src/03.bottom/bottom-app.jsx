import { default as subApp, Component } from "./bottom";
import { reduxLoadSubApp } from "subapp-redux";

reduxLoadSubApp(subApp);

if (module.hot) {
  module.hot.accept("./bottom", () => {
    const r = require("./bottom");
    const x = require("subapp-redux");
    x.hotReloadSubApp(r.default);
  });
}
