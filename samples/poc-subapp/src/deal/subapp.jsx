import React from "react";
import { loadSubApp } from "subapp-web";

const Deal = () => {
  return <div>SPECIAL DEAL - SPECIAL DEAL</div>;
};

loadSubApp({ name: "Deal", Component: Deal });
