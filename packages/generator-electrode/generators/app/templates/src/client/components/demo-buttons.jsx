import React from "react";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";

/*
 * Demostrates a simple pure functional component
 */

export const DemoButtons = () => (
  <div>
    <h6 className={custom["docs-header"]}>
      demo CSS modules with buttons from <a href="http://getskeleton.com/">skeleton</a>
    </h6>
    <div className={custom["docs-example"]}>
      <a className={skeleton.button} href="#">
        Anchor button
      </a>
      <button>Button element</button>
      <input type="submit" value="submit input" />
      <input type="button" value="button input" />
    </div>
    <div className={custom["docs-example"]}>
      <a className={`${skeleton.button} ${skeleton["button-primary"]}`} href="#">
        Anchor button
      </a>
      <button className={skeleton["button-primary"]}>Button element</button>
      <input className={skeleton["button-primary"]} type="submit" value="submit input" />
      <input className={skeleton["button-primary"]} type="button" value="button input" />
    </div>
  </div>
);
