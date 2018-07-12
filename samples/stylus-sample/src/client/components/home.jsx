/*
 * This is a demo component the Eletrode app generator included
 * to show using Skeleton CSS lib (named base.css) and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import electrodePng from "../images/electrode.png";
import DemoStates from "./demo-states";
import DemoPureStates from "./demo-pure-states";
import { DemoButtons } from "./demo-buttons";

/**/

export default () => (
  <div className="container">
    {/**/}

    <section className="header">
      <h2>
        Hello from{" "}
        <a href="https://github.com/electrode-io">
          {"Electrode"} <img src={electrodePng} />
        </a>
      </h2>
    </section>

    <div className="docs-section">
      <DemoStates />
    </div>

    <div className="docs-section">
      <DemoPureStates />
    </div>

    <div className="docs-section">
      <DemoButtons />
    </div>
  </div>
);
