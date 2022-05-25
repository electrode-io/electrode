import { React } from "@xarc/react";

export const Product = ({ heading, imageUrl }) => (
  <div>
    <h3>{heading}</h3>
    <img src={imageUrl} alt={heading} />
  </div>
);