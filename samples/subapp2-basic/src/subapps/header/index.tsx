import { React, ReactSubApp, createDynamicComponent, staticPropsFeature } from "@xarc/react";
import electrodePng from "../../../static/electrode.png";
import { message } from "./message";
import { StaticRouter } from "react-router-dom/server";

export const Demo1 = createDynamicComponent(
  {
    name: "demo1",
    getModule: () => import("../demo1"),
  },
  { ssr: true }
);

const Header = (props) => {
  return (
    <div
      style={{
        padding: "5px",
        border: "solid",
        marginLeft: "15%",
        marginRight: "15%",
        textAlign: "center",
      }}
    >
      <h1>
        <a href="https://www.electrode.io">
          Electrode <img src={electrodePng} />
        </a>
      </h1>
      <p>{message}</p>
      <p>props: {JSON.stringify(props)}</p>
      <h1>Demo1 subapp as a dynamic component in Home</h1>
      <Demo1 />
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Header,
  wantFeatures: [
    staticPropsFeature({
      serverModule: require.resolve("./static-props"),
    }),
  ],
};
