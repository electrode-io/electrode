import { React, ReactSubApp } from "@xarc/react";
import { reactQueryFeature, useQuery } from "@xarc/react-query";
import { demo4QueryFn } from "./demo4-react-query";

const Demo4 = () => {
  const { data } = useQuery("demo4", demo4QueryFn, { staleTime: 2000 });

  return (
    <div style={{ padding: "5px", border: "solid", marginLeft: "15%", marginRight: "15%" }}>
      <p>subapp demo4</p>
      data: <pre>{JSON.stringify(data)}</pre>
      <p>
        <a href="https://www.electrode.io/electrode/">Electrode Docs</a>
      </p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Demo4,
  wantFeatures: [
    // https://react-query.tanstack.com/docs/overview
    reactQueryFeature({
      React,
      serverModule: require.resolve("./demo4-react-query")
    })
  ]
};
