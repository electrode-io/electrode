// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import electrodeLogo from "../images/electrode.svg";
import Notifications from "react-notify-toast";

type WrapperProps = {
  data: string
};

type Props = {
  data: string
};

class HomeWrapper extends Component<WrapperProps> {
  render() {
    return <Home data={this.props.data} />;
  }
}

HomeWrapper.propTypes = {
  data: PropTypes.string
};

/* eslint-disable max-len */
export class Home extends Component<Props> {
  render() {
    const data = { logo: "Electrode Logo", electrodeLogo };

    return (
      <div>
        <Notifications />
        <div
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <a href="https://github.com/electrode-io">
            <img
              style={{
                width: "100%"
              }}
              alt={data.logo}
              src={data.electrodeLogo}
            />
          </a>
        </div>
        <h2>Demonstration Components</h2>
        <ul>
          <li>
            <a href="/csrf">CSRF protection using electrode-csrf-jwt</a>
          </li>
          <li>
            <a href="/above-the-fold?skip=true">
              Above the Fold Render with skip=true - increase your App's performance by using a skip
              prop
            </a>
          </li>
          <li>
            <a href="/above-the-fold?skip=false">
              Above the Fold Render with skip=false - increase your App's performance by using a
              skip prop
            </a>
          </li>
          <li>
            <a href="/ssrcachingsimpletype">SSR Caching Simple Type Example</a>
          </li>
          <li>
            <a href="/ssrcachingtemplatetype">SSR Caching Template Type Example</a>
          </li>
          <li>
            <a href="/push-notifications">Push Notifications Example</a>
          </li>
          <li>
            <a href="/todo-app">Todo List Example</a>
          </li>
          <li>
            <a href="/record-store">MongoDB Example</a>
          </li>
        </ul>
        <h3>{this.props.data}</h3>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.string
};

const mapStateToProps = state => ({
  data: state && state.data
});

export default connect(mapStateToProps)(HomeWrapper);
