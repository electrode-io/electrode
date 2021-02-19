import { React, ReactSubApp } from "@xarc/react";
import { docsLink } from "../info";

const Demo1 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo1</p>
      props: {JSON.stringify(props)}
      <p>
        <a href={docsLink}>Electrode Docs</a>
      </p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo1
};
