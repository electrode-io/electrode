import { React } from "@xarc/react";

export const Demo2 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>abc subapp demo2</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="https://www.electrode.io/electrode/">Electrode Docs</a>
      </p>
    </div>
  );
};
