import { React, ReactSubApp } from "@xarc/react";
import { SingleProductProps } from "./type";

const Product: React.FunctionComponent<SingleProductProps> = ({ heading, imageUrl }) => (
  <div>
    <h3>{heading}</h3>
    <img src={imageUrl} alt={heading} />
  </div>
);

export const subapp: ReactSubApp = {
  Component: Product,
};
