import { React, loadSubApp } from "subapp-react";
import electrodePng from "../../static/electrode.png";
import "../styles/index.styl";
import { DemoButtons } from "../components/demo-buttons";

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Hello from{" "}
        <a href="https://www.electrode.io">
          Electrode <img src={electrodePng} />
        </a>
      </h1>
      <div style={{ textAlign: "center" }}>
        <DemoButtons />
      </div>
    </div>
  );
};

export default loadSubApp({ Component: Home, name: "Home" });
