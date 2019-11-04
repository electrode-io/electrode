import React from "react";
import { loadSubApp } from "subapp-web";

const Demo1 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo1</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="http://docs.electrode.io">Electrode Docs</a>
      </p>
    </div>
  );
};

export default loadSubApp({
  Component: Demo1,
  name: "Demo1",
  prepare: () => {
    return { data: "hello from demo1" };
  }
});
