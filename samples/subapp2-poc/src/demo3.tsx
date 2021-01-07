import { React, ReactSubApp, staticPropsFeature } from "@xarc/react";

const Demo3 = props => {
  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>abc subapp demo3</p>
      props: {JSON.stringify(props)}
      <p>
        <a href="https://www.electrode.io/electrode/">Electrode Docs</a>
      </p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo3,
  wantFeatures: [
    staticPropsFeature({
      serverModule: require.resolve("./demo3-static-props")
    })
  ]
};
