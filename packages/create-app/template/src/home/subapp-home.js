import React from "react";
import { loadSubApp } from "subapp-web";
import electrodePng from "../../static/electrode.png";

const Home = () => {
  return (
    <h1 style={{ textAlign: "center" }}>
      Hello from{" "}
      <a href="https://www.electrode.io">
        Electrode <img src={electrodePng} />
      </a>
    </h1>
  );
};

export default loadSubApp({ Component: Home, name: "Home" });
