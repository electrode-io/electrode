import { React, ReactSubApp } from "@xarc/react";

const Deal = props => {
  return <div>SPECIAL DEAL - SPECIAL DEAL - {props.deal}</div>;
};

export { Deal as Component };

export const subapp: ReactSubApp = {
  Component: Deal
};
