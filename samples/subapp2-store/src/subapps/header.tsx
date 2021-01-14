import { React, ReactSubApp } from "@xarc/react";
import custom from "../styles/bootstrap.css";

const Header = props => {
  return (
    <div className={custom["text-center"]} style={{ backgroundColor: "cyan" }}>
      <h1>Online Store</h1>
      <p>Mission, Vision & Values</p>
      <p>{props.value}</p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Header
};
