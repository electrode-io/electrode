import { React, ReactSubApp, createDynamicComponent, staticPropsFeature } from "@xarc/react";
import { reactRouterFeature } from "@xarc/react-router";
import electrodePng from "../../../static/electrode.png";
import Navigation from "../../components/Navigation";

const Header = () => {
  return (
    <div
      style={{        
        border: "solid",
        marginLeft: "15%",
        marginRight: "15%",
        textAlign: "center",
      }}
    >
      <h2>
        <a href="https://www.electrode.io">
          Electrode <img src={electrodePng} /> - Subapp Version 2 <span style={{fontSize: "15px"}}>(with React 18)</span>
        </a>
      </h2>
      <Navigation />
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Header,
  wantFeatures: [
    reactRouterFeature({ React })
  ],
};
