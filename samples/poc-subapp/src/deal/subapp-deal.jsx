import React from "react";
import { loadSubApp } from "subapp-web";

const Deal = props => {
  return <div>SPECIAL DEAL - SPECIAL DEAL - {props.deal}</div>;
};

export default loadSubApp({ name: "Deal", Component: Deal });
