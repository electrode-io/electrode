import React from "react";
import { loadSubApp } from "subapp-web";

const Demo1 = props => {
  return (
    <div>
      demo1: {props.data}
      <p>
        <a href="http://docs.walmart.com/@electrode">Electrode Docs</a>
      </p>
    </div>
  );
};

export default loadSubApp({
  Component: Demo1,
  name: "Demo1",
  prepare: () => {
    return { data: "hello from demo1" };
  }
});
