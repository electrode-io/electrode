import React, { Component } from "react";
import { Nav } from "./nav";
import { connect } from "react-redux";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import demoStyle from "../styles/demo2.css"; // eslint-disable-line no-unused-vars

class DemoSSO extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="custom.container">
        <Nav {...this.props} />
        <section styleName="custom.header">
          <h2>SSO Demo</h2>
          <div styleName="demoStyle.main">
            <h2>User credentials were passed from server to client using cookies.</h2>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(DemoSSO);
