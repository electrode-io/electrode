import { React, ReactSubApp } from "@xarc/react";

const Demo1 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo1</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="https://www.electrode.io/electrode/">Electrode Docs</a>
      </p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo1
};
