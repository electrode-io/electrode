import { React, ReactSubApp } from "@xarc/react";

const Demo1 = (props) => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo1</p>
      <p>.css module demo blue color</p>
      props: {JSON.stringify(props)}
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo1,
};
