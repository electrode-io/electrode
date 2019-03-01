// @subapp@ {name: "Header"}
import React from "react";
import { loadSubApp } from "subapp-web";

const Header = () => {
  return (
    <div className="text-center">
      <h1>Online Store</h1>
      <p>Mission, Vision & Values</p>
    </div>
  );
};

const name = "Header";

const subApp = {
  name,
  Component: Header
};

loadSubApp(subApp);
