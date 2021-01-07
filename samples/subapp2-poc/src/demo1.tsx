import { React, ReactSubApp, AppContext } from "@xarc/react";
import { message } from "./message";

const Demo1 = props => {
  return (
    <AppContext.Consumer>
      {({ isSsr, ssr }) => {
        return (
          <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
            <p>abc subapp demo1: {message}</p>
            <p>props: {JSON.stringify(props)}</p>
            <h4>
              isSSR: {"" + isSsr} | Has request: {ssr.request ? "yes" : "no"}
            </h4>
            <p>
              <a href="https://www.electrode.io/electrode/">Electrode Docs</a>
            </p>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo1
};
