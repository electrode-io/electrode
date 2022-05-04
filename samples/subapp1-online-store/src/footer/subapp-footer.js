/* eslint-disable no-magic-numbers */

import { React, loadSubApp } from "subapp-react";

let data;

const Data1 = () => {
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

const Footer = () => {
  return (
    <div className="container-fluid text-center">
      <h2>SubApp Footer</h2>
      <React.Suspense fallback={<div>suspense demo waiting for data...</div>}>
        Suspense Demo Received Data
        <Data1 />
      </React.Suspense>
    </div>
  );
};

export default loadSubApp({
  name: "Footer",
  Component: Footer,
});
