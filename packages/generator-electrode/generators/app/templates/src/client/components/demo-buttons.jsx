import React from "react";
import custom from "../styles/custom.css";
import milligram from "milligram";

/*
 * Demostrates a simple pure functional component
 */

export const DemoButtons = () => (
  <div>
    <h6 className={custom["docs-header"]}>
      demo CSS modules with buttons from <a href="https://milligram.io/">milligram</a>
    </h6>
    <div className={custom["docs-example"]}>
      <a className={milligram.button} href="#">
        Anchor button
      </a>
      <button>Button element</button>
      <input type="submit" value="submit input" />
      <input type="button" value="button input" />
    </div>
    <div className={custom["docs-example"]}>
      <a className={`${milligram.button} ${milligram["button-outline"]}`} href="#">
        Anchor button
      </a>
      <button className={milligram["button-outline"]}>Button element</button>
      <input className={milligram["button-outline"]} type="submit" value="submit input" />
      <input className={milligram["button-outline"]} type="button" value="button input" />
    </div>
  </div>
);
