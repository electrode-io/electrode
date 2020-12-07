/* eslint-disable no-magic-numbers */

import { React, loadSubApp, AppContext } from "subapp-react";

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
      <AppContext.Consumer>
        {({ isSsr, ssr, subApp }) => {
          return (
            <div>
              <div>SubApp name: {subApp ? subApp.name : "Not Available from context"}</div>
              <div>
                IS_SSR: {`${Boolean(isSsr)}`} HAS_REQUEST: {ssr && ssr.request ? "yes" : "no"}
              </div>
              <React.Suspense fallback={<div>suspense demo waiting for data...</div>}>
                <div>
                  Suspense Demo Received Data
                  <Data1 />
                </div>
              </React.Suspense>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default loadSubApp({
  name: "SuspenseDemo",
  Component: SuspenseDemo
});
