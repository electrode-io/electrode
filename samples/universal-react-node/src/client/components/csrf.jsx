// @flow

import React, { Component } from "react";
const HTTP_OK = 200;

export class CSRF extends Component<{}, { testResult: string }> {
  constructor() {
    super();
    this.state = {
      testResult: ""
    };
    (this: any).handleTestValid = this.handleTestValid.bind(this);
    (this: any).handleTestInvalid = this.handleTestInvalid.bind(this);
  }

  doPost(csrfToken: string) {
    fetch("/2", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-csrf-jwt": csrfToken
      },
      body: JSON.stringify({ message: "hello" })
    })
      .then(resp => {
        if (resp.status === HTTP_OK) {
          this.setState({
            testResult: `POST SUCCEEDED with status ${resp.status}`
          });
        } else {
          this.setState({
            testResult: `POST FAILED with status ${resp.status}`
          });
        }
      })
      .catch(e => {
        this.setState({ testResult: `POST FAILED: ${e.toString()}` });
      });
  }

  handleTestValid() {
    this.setState({ testResult: "valid" });
    fetch("/1", { credentials: "same-origin" }) // eslint-disable-line
      .then(resp => {
        if (resp.status === HTTP_OK) {
          const token = resp.headers.get("x-csrf-jwt");
          if (token !== "") {
            console.log("Got CSRF token OK"); // eslint-disable-line
            this.doPost(token);
          } else {
            this.setState({
              testResult: "Unable to get token from GET request"
            });
          }
        } else {
          this.setState({ testResult: `GET request returned ${resp.status}` });
        }
      })
      .catch(e => {
        this.setState({ testResult: e.toString() });
      });
  }

  handleTestInvalid() {
    this.doPost("fake");
  }

  render() {
    const text = this.state.testResult;
    return (
      <div>
        <h1>Electrode CSRF-JWT Demo</h1>
        <p>
          This component demonstrates usage of the
          <a href="https://github.com/electrode-io/electrode-csrf-jwt"> electrode-csrf-jwt </a>
          module. Two endpoints are declared in <code>server/plugins/demo.js</code>:
        </p>
        <ul>
          <li>
            a GET endpoint, <code>/1</code>, to which the module automatically adds a csrf token
            header
          </li>
          <li>
            a POST endpoint, <code>/2</code>, to which the module automatically ensures the presence
            of a valid token in the request headers
          </li>
        </ul>
        <p>Two simple tests via AJAX (JavaScript must be enabled) are demonstrated below:</p>
        <ul>
          <li>
            <a href="#" onClick={this.handleTestValid}>
              Test Valid POST
            </a>{" "}
            using a token retrieved from <code>/1</code> first (should succeed with a 200 status)
          </li>
          <li>
            <a href="#" onClick={this.handleTestInvalid}>
              Test Invalid POST{" "}
            </a>
            using a forged token (should fail with a 400 status)
          </li>
        </ul>
        <div>{text}</div>
      </div>
    );
  }
}
