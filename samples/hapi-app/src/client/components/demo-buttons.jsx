import React from "react";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import milligram from "milligram/dist/milligram.css"; // eslint-disable-line no-unused-vars

/*
 * Demostrates a simple pure functional component
 */

import { createDynamicComponent } from "@xarc/react";

const DemoButtonsOutline = createDynamicComponent({
  name: "demo-buttons-outline",
  getModule: () => import("./demo-buttons-outline")
});

const DemoButtons = () => (
  <div>
    <h6 styleName="custom.docs-header">
      demo CSS modules with buttons from <a href="https://milligram.io/">milligram</a>
    </h6>
    <div styleName="custom.docs-example">
      <a styleName="milligram.button" href="#">
        Anchor button
      </a>
      <button>Button element</button>
      <input type="submit" value="submit input" />
      <input type="button" value="button input" />
    </div>
    <h6 styleName="custom.docs-header">demo dynamic import component without SSR</h6>
    <DemoButtonsOutline />
  </div>
);

export const subapp = {
  Component: DemoButtons
};
