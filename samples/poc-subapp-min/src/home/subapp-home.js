import React from "react";
import { loadSubApp } from "subapp-web";

const Home = () => {
  return (
    <div>
      <h1>Home Page - test hello world</h1>
    </div>
  );
};

export default loadSubApp({
  name: "Home",
  Component: Home
  // TBD: one time props/state initializing hook
  // bootstrap() {},
  // TBD: each instance props/state initializing hook
  // initialize() {},
});
