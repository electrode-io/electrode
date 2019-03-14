import React from "react";
import loadable from "@loadable/component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setShowFakeComp } from "../actions";
import Promise from "bluebird";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars

let Demo = loadable(() => import(/* webpackChunkName: "fake" */ "./demo-fake"));
const timeout = 1000;
const load = dispatch => {
  dispatch(setShowFakeComp(false));
  Promise.try(() => loadable(() => import("./demo-fake")))
    .delay(timeout)
    .then(x => (Demo = x))
    .then(() => {
      dispatch(setShowFakeComp(true));
    });
};

const DynamicImportDemo = ({ showFakeComp, dispatch }) => {
  return (
    <div>
      <h6 styleName={"custom.docs-header"}>
        Demo Dynamic Import with&nbsp;
        <a href="https://www.smooth-code.com/open-source/loadable-components/">
          Loadable Components
        </a>
      </h6>
      {Demo && showFakeComp.value ? (
        <Demo />
      ) : (
        <div styleName={"custom.dynamic-demo-box"}>Dynamic Imported Component is loading ...</div>
      )}
      <button onClick={() => load(dispatch)}>Refresh Comp</button>
    </div>
  );
};
DynamicImportDemo.propTypes = {
  showFakeComp: PropTypes.object,
  dispatch: PropTypes.func
};
export default connect(
  state => state,
  dispatch => ({ dispatch })
)(DynamicImportDemo);
