import { h, reduxBundlerLoadSubApp } from "subapp-pbundle"; /** @jsx h */
import { connect } from "redux-bundler-preact";
import bundleCount from "./bundle-count";

const Demo1 = ({ doIncCount, doDecCount, count }) => {
  return (
    <div>
      <h1>
        Demo1 Page count&nbsp;
        <button onClick={doDecCount}>&#8810;</button>
        &nbsp;{count}&nbsp;
        <button onClick={doIncCount}>&#8811;</button>
      </h1>
    </div>
  );
};

export default reduxBundlerLoadSubApp({
  name: "Demo1",
  Component: connect("doIncCount", "doDecCount", "selectCount", Demo1),
  // using redux-bundler, everything related to redux come from the bundles
  // this can also be named bundles (compatible with discovery PoC)
  reduxBundles: [bundleCount]
});
