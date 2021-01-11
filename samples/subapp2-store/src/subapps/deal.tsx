import { React, ReactSubApp } from "@xarc/react";

const Deal = props => {
  return <div>SPECIAL DEAL - SPECIAL DEAL - {props.deal}</div>;
};

export const subapp: ReactSubApp = {
  Component: Deal
};
