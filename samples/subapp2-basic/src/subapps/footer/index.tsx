//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//

import { React, ReactSubApp } from "@xarc/react";
import { reactQueryFeature, useQuery } from "@xarc/react-query";
import { demo3QueryFn } from "./react-query-fetch";
import { DisplayInfo } from "./display-info";

const Footer = () => {
  const { data } = useQuery("demo3", demo3QueryFn, { staleTime: 2000 });

  return (
    <div>
      <div
        style={{
          padding: "5px",
          marginTop: "15px",
          border: "solid",
          marginLeft: "15%",
          marginRight: "15%",
          textAlign: "center",
        }}
      >
        <h2>Footer subApp with react-query</h2>
        data: <pre>{JSON.stringify(data)}</pre>
        <DisplayInfo />
      </div>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Footer,
  wantFeatures: [
    reactQueryFeature({
      React,
      serverModule: require.resolve("./react-query-fetch"),
    }),
  ],
};
