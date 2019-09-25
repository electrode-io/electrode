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
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import { connect } from "react-redux";
import "../styles/raleway.css";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import electrodePng from "../images/electrode.png";
import DemoStates from "./demo-states";
import DemoPureStates from "./demo-pure-states";
import { DemoButtons } from "./demo-buttons";
import { Nav } from "./nav";

//
import DemoCookies from "./demo-cookies";
//

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
          <h2>
            <span>Hello from </span>
            <a href="https://github.com/electrode-io">
              {"Electrode"}
              <img src={electrodePng} />
            </a>
          </h2>
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
          <DemoButtons />
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Home);
