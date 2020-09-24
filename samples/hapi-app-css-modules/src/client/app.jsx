//
// This is the client side entry point for the React app.
//

import React from "react";
import { render, hydrate } from "react-dom";
import { routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import uiConfig from "electrode-ui-config";

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

const start = App => {
  const jsContent = document.querySelector(".js-content");
  const reactStart = render;

  reactStart(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    jsContent
  );
};

window.hapiSampleWebappStart = () => {
  uiConfig.reload(window.hapiSample_config || {});
  return start(() => renderRoutes(routes));
};

//
// Hot Module Reload setup
//
if (module.hot) {
  module.hot.accept("./routes", () => {
    const r = require("./routes");
    start(() => renderRoutes(r.routes));
  });
}
