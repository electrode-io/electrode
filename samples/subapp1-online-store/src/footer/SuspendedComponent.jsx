import React from "react";
let data;
const SuspendedComponent = () => {
  if (!data) {
    throw new Promise((resolve) => {
      setTimeout(() => {
        data = "demo data received from async call";
        resolve(data);
      }, 2500);
    });
  }
  return <div>{data}</div>;
};

export default SuspendedComponent;
