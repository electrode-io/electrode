import React from "react";
import { dynamicLoadSubApp } from "subapp-web";

const DealSubApp = props => {
  const { id } = props;

  dynamicLoadSubApp({ name: "Deal", id });

  return (
    <div className="col-sm-4">
      <div className="panel panel-primary">
        <div className="panel-body">
          <div id={id} />
        </div>
      </div>
    </div>
  );
};

export const Deals = props => {
  return (
    <div>
      <DealSubApp {...props} id="deal_1" />
      <DealSubApp {...props} id="deal_2" />
      <DealSubApp {...props} id="deal_3" />
    </div>
  );
};
