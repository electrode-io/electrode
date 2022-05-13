import { ReactSubApp, createDynamicComponent, staticPropsFeature } from "@xarc/react";
import React, { Suspense, lazy } from "react";
import electrodePng from "../../static/electrode.png";
import { message } from "./message";

const Comments = lazy(() => import("./comments" /* webpackPrefetch: true */));

let data;

const Demo1 = (props) => {
  if (!data) {
    throw new Promise((resolve) => {
      setTimeout(() => {
        data = "demo data received from async call";
        resolve(data);
      }, 2500);
    });
  }
  return <div>{data}</div>;
};

const Home = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        <a href="https://www.electrode.io">
          Electrode <img src={electrodePng} />
        </a>
      </h1>
      <p>{message}</p>
      <p>props: {JSON.stringify(props)}</p>
      <h1>Demo1 subapp as a dynamic component in Home</h1>
      <Suspense fallback={<div>Comments are loading...</div>}>
        <Comments />
      </Suspense>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Home,
  wantFeatures: [
    staticPropsFeature({
      serverModule: require.resolve("./static-props"),
    }),
  ],
};
