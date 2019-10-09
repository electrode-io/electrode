import React, { Component } from "react";
import { Nav } from "./nav";
import { connect } from "react-redux";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import demoStyle from "../styles/demo2.css"; // eslint-disable-line no-unused-vars

class DemoSignin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href="/auth/twitter/callback">
          <img src="https://developer.twitter.com/content/dam/developer-twitter/images/sign-in-with-twitter-link.png" />
        </a>
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
)(DemoSignin);
