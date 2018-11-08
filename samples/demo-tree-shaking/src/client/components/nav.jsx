import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import navStyle from "../styles/nav.css"; // eslint-disable-line no-unused-vars

export class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentTab = this.props.location.pathname.replace("/", "");
    return (
      <ul>
        <li styleName={currentTab === "" ? "navStyle.active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li styleName={currentTab === "demo1" ? "navStyle.active" : ""}>
          <Link to="/demo1">Demo1</Link>
        </li>
        <li styleName={currentTab === "demo2" ? "navStyle.active" : ""}>
          <Link to="/demo2">Demo2</Link>
        </li>
        <li styleName={currentTab === "demo3" ? "navStyle.active" : ""}>
          <Link to="/demo3">Demo3</Link>
        </li>
      </ul>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

Nav.defaultProps = {
  location: {
    pathname: ""
  }
};
