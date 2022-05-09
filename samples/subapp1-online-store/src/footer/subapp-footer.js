import { React, loadSubApp } from "subapp-react";
import { lazy } from "react";

const SuspendedComponent = lazy(() => import("./SuspendedComponent"));

const Footer = () => {
  return (
    <div className="container-fluid text-center">
      <h2>SubApp Footer</h2>
      <React.Suspense fallback={<div>suspense demo waiting for data...</div>}>
        Suspense Demo Received Data
        <SuspendedComponent />
      </React.Suspense>
    </div>
  );
};

export default loadSubApp({
  name: "Footer",
  Component: Footer,
});
