/*
 * This is a demo component the Eletrode app generator included
 * to show using Milligram CSS lib and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - demo-sugarss.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import { connect } from "react-redux";
import "../styles/raleway.css";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import DemoStates from "./demo-states";
import DemoPureStates from "./demo-pure-states";
// import { DemoButtons } from "./demo-buttons";
import DemoSugarss from "./demo-sugarss";
import { Nav } from "./nav";

import { declareSubApp, createDynamicComponent } from "@xarc/react";

const HelloComponent = createDynamicComponent(
  {
    name: "hello",
    getModule: () => import("./hello")
  },
  { ssr: true }
);

const DemoButtons = createDynamicComponent(
  declareSubApp({ name: "demo-buttons", getModule: () => import("./demo-buttons") }),
  { ssr: true }
);

//
import DemoCookies from "./demo-cookies";
//

import config from "electrode-ui-config";

//
import Notifications from "react-notify-toast";

//

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="custom.container">
        <Nav {...this.props} />

        {/**/}
        <Notifications />
        {/**/}

        <section styleName="custom.header">
          <HelloComponent />
        </section>

        <div styleName="custom.docs-section">
          <DemoStates />
        </div>

        <div styleName="custom.docs-section">
          <DemoPureStates />
        </div>

        {/* */}
        <div styleName="custom.docs-section">
          <DemoCookies />
        </div>
        {/**/}

        <div styleName="custom.docs-section">
          <h6 styleName="custom.docs-header">Demo Isomorphic UI Config</h6>
          <div>config.ui.demo: {config.ui.demo}</div>
        </div>

        <div styleName="custom.docs-section">
          <h6 styleName="custom.docs-header">Demo dynamic import component with SSR</h6>
          <DemoButtons />
        </div>

        <div styleName={"custom.docs-section"}>
          <DemoSugarss />
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(Home);
