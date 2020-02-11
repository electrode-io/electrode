/** @jsx h */

import { h, reduxBundlerLoadSubApp } from "subapp-pbundle";
import { connect } from "redux-bundler-preact";
import bundleLabel from "./bundle-label";

const Demo2 = ({ doNext, doPrev, label }) => {
  return (
    <div>
      <h1>
        Demo2 Page label&nbsp;
        <button onClick={doPrev}>&#8810;</button>
        &nbsp;{label}&nbsp;
        <button onClick={doNext}>&#8811;</button>
      </h1>
    </div>
  );
};

export default reduxBundlerLoadSubApp({
  name: "Demo2",
  Component: connect("doNext", "doPrev", "selectLabel", Demo2),
  // using redux-bundler, everything related to redux come from the bundles
  // this can also be named bundles (compatible with discovery PoC)
  reduxBundles: [bundleLabel]
});
