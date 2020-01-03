import { React, loadSubApp } from "subapp-react";

const Deal = props => {
  return <div>SPECIAL DEAL - SPECIAL DEAL - {props.deal}</div>;
};

export default loadSubApp({ name: "Deal", Component: Deal });
