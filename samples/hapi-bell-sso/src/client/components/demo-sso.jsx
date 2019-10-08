import React, { Component } from "react";
import { Nav } from "./nav";
import { connect } from "react-redux";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import demoStyle from "../styles/demo2.css"; // eslint-disable-line no-unused-vars
import electrodeCookies from "electrode-cookies";

class DemoSSO extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ssoCred = electrodeCookies.get("SSO_CRED", {});
    const obj = JSON.parse(ssoCred);
    console.log(obj);

    return (
      <div styleName="custom.container">
        <Nav {...this.props} />
        <section styleName="custom.header">
          <h2>SSO Demo</h2>
          <div styleName="demoStyle.main">
            <h2>User credentials were passed from server to client using cookies.</h2>
            <h4>Name: {obj.profile.displayName}</h4>
            <h4>Username: {obj.profile.username}</h4>
            <h4>ID: {obj.profile.id}</h4>
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
