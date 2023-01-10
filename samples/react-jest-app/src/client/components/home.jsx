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
import "./test1.styl";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import electrodePng from "../images/electrode.png";
import Notifications from "react-notify-toast";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  /*eslint-disable */
  render() {
    return (
      <div styleName="custom.container">
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
      </div>
    );
  }
  /*eslint-enable */
}

Home.propTypes = {};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, (dispatch) => ({ dispatch }))(Home);
