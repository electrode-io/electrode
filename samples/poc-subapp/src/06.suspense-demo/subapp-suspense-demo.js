import React from "react";
import { loadSubApp } from "subapp-web";
import PropTypes from "prop-types";

let data;

class Data1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!data) {
      throw new Promise(resolve => {
        setTimeout(() => {
          data = "demo data received from async call";
          resolve(data);
        }, 2500);
      });
    }
    return <div>{data}</div>;
  }
}

class SuspenseDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Suspense fallback={<div>suspense demo waiting for data...</div>}>
        <div>
          Suspense Demo Received Data
          <Data1 />
        </div>
      </React.Suspense>
    );
  }
}

export default loadSubApp({
  name: "SuspenseDemo",
  Component: SuspenseDemo
});
