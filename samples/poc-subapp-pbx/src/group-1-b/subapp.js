/** @jsx h */

import { h, reduxBundlerLoadSubApp } from "subapp-pbundle";
import { connect } from "redux-bundler-preact";
import bundleB from "./bundle-b";

const Group1B = ({ valueB }) => {
  return (
    <div>
      <h1>group 1 {valueB}</h1>
    </div>
  );
};

export default reduxBundlerLoadSubApp({
  name: "Group1B",
  Component: connect("selectValueB", Group1B),
  // using redux-bundler, everything related to redux come from the bundles
  // this can also be named bundles (compatible with discovery PoC)
  reduxBundles: [bundleB]
});
