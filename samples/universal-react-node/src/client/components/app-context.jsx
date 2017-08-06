import React from "react";
import PropTypes from "prop-types";
import Log from "electrode-ui-logger";
import Config from "electrode-ui-config";
import Cookies from "electrode-cookies";

/* eslint-disable max-len */

class AppContext extends React.Component {
  constructor() {
    super();
    this.handleLogClick = this.handleLogClick.bind(this);
    this.handleSetCookie = this.handleSetCookie.bind(this);
    this.state = {};
  }

  componentWillMount() {
    // This is called on both server and client
    this.setState({cookieValue: Cookies.get("testCookie", this.context.app)});
  }

  handleLogClick() {
    Log.info("This is a log message from the client", this.context.app);
  }

  handleSetCookie() {
    const newValue = Date.now().toString();
    Cookies.set("testCookie", newValue, this.context.app);
    this.setState({cookieValue: newValue});
  }

  render() {
    // This will log both on the server and client
    Log.info(Config.ui, this.context.app);
    return (
      <div>
        <div style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "98%",
          border: "2px solid",
          padding: "5pt"
        }}>
          <h3>App context.</h3>
          <p>This page demonstrates UI config, logging, and cookie access using the app object in React context.</p>
        </div>
        <div style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
          marginBottom: "10px",
          color: "blue",
          border: "2px solid",
          width: "98%",
          height: "90vh",
          padding: "5pt"
        }}>
          <button onClick={this.handleLogClick}>Click event that logs</button>
          <div>
            <strong>UI Config settings</strong>
            <pre>uiSetting1={Config.ui.uiSetting1}, uiSetting2={Config.ui.uiSetting2}</pre>
          </div>
          <div>
            Cookie value: {this.state.cookieValue}
            <button onClick={this.handleSetCookie}>Update cookie</button>
          </div>
      </div>
    </div>
    );
  }
}

AppContext.contextTypes = {
  app: PropTypes.object
};

export default AppContext;
