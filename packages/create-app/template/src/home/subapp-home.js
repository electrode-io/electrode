import React from "react";
import { loadSubApp } from "subapp-web";

const Home = () => {
  return <h1>React Web Home</h1>;
};

export default loadSubApp({ Component: Home, name: "Home" });
