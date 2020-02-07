/** @jsx h */

import { h, reduxBundlerLoadSubApp } from "subapp-pbundle";
import { connect } from "redux-bundler-preact";
import bundleA from "./bundle-a";

const Group1A = ({ valueA }) => {
  return (
    <div>
      <h1>group 1 {valueA}</h1>
    </div>
  );
};

export default reduxBundlerLoadSubApp({
  name: "Group1A",
  Component: connect("selectValueA", Group1A),
  // using redux-bundler, everything related to redux come from the bundles
  // this can also be named bundles (compatible with discovery PoC)
  reduxBundles: [bundleA]
});
