import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import electrodeLogo from "../images/electrode.svg";
import Notifications from "react-notify-toast";

import i18n from "electrode-archetype-react-app/i18next";

class HomeWrapper extends React.Component {
  render() {
    return <Home data={this.props.data} />;
  }
}

HomeWrapper.propTypes = {
  data: PropTypes.string
};

/* eslint-disable max-len */
export class Home extends React.Component {
  render() {
    // force the use of spread operator for testing
    const data = { logo: "Electrode Logo", electrodeLogo, ...this.props.data };
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
            {" "}
            <img
              style={{
                width: "100%"
              }}
              alt={data.logo}
              src={data.electrodeLogo}
            />
          </a>
        </div>
        <h2>{i18n.t("title")}</h2>
        <ul>
          <li>
            <a href="/csrf">
              {i18n.t("CSRF protection using electrode-csrf-jwt")}
            </a>
          </li>
          <li>
            <a href="/above-the-fold?skip=true">
              {i18n.t("Above the Fold Render with skip=true")}
            </a>
          </li>
          <li>
            <a href="/above-the-fold?skip=false">
              {i18n.t("Above the Fold Render with skip=false")}
            </a>
          </li>
          <li>
            <a href="/ssrcachingsimpletype">
              {i18n.t("SSR Caching Simple Type Example")}
            </a>
          </li>
          <li>
            <a href="/ssrcachingtemplatetype">
              {i18n.t("SSR Caching Template Type Example")}
            </a>
          </li>
          <li>
            <a href="/push-notifications">
              {i18n.t("Push Notifications Example")}
            </a>
          </li>
          <li>
            <a href="/todo-app">{i18n.t("Todo List Example")}</a>
          </li>
          <li>
            <a href="/record-store">{i18n.t("MongoDB Example")}</a>
          </li>
        </ul>
        <p>{this.props.data}</p>
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
