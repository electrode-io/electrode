import { React } from "@xarc/react";
import electrodePng from "../images/electrode.png";

const Hello = () => (
  <h2>
    <span>Hello from </span>
    <a href="https://github.com/electrode-io">
      {"Electrode"}
      <img src={electrodePng} />
    </a>
  </h2>
);

export const subapp = {
  Component: Hello
};
