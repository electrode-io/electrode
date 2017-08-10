/*
 * This is a demo component the Eletrode app generator included
 * to show using Skeleton CSS lib (named base.css) and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-code-splitting.jsx
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import "../styles/normalize.css";
import "../styles/raleway.css";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import electrodePng from "../images/electrode.png";
import DemoStates from "./demo-states";
import DemoPureStates from "./demo-pure-states";
import { DemoButtons } from "./demo-buttons";
/*<% if (pwa) { %>*/
import Notifications from "react-notify-toast";
/*<% } %>*/

const Home = props => {
  const {children} = props;

  return (
    <div className={custom.container}>
      {/*<% if (pwa) { %>*/}
        <Notifications />
      {/*<% } %>*/}

      <section className={custom.header}>
        <h2 className={skeleton.title}>
          Hello from {" "}
          <a href="https://github.com/electrode-io">{"Electrode"} <img
            src={electrodePng}/></a>
        </h2>
      </section>

      <div className={custom["docs-section"]}>
        <DemoStates/>
      </div>

      <div className={custom["docs-section"]}>
        <DemoPureStates/>
      </div>

      <div className={custom["docs-section"]}>
        <DemoButtons/>
      </div>

      <div className={custom["docs-section"]}>
        <h6 className={custom["docs-header"]}>
          Demo Code Splitting <Link to="/splitting">Load Here</Link>
        </h6>

        {children}
      </div>
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.node
};

export default Home;