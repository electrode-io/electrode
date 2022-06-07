import { reduxLoadSubApp } from "subapp-redux";
import { React } from "subapp-react";
import { connect } from "react-redux";

import reduxReducers, { decNumber, incNumber } from "./reducers";

const mapStateToProps = state => state;

const Demo2 = props => {
  return (
    <div className="container-fluid text-center">
      <h2>Demo 2</h2>
      <div>
        <span style={{ fontSize: "large" }}>
          <h4>Redux State Demo</h4>
          <br />
          <button onClick={() => props.dispatch(decNumber())}>&#8810;</button>
          <span style={{ color: "black", fontWeight: "bold", padding: "0 1rem 0 1rem" }}>
            {props.number}
          </span>
          <button onClick={() => props.dispatch(incNumber())}>&#8811;</button>
        </span>
      </div>
    </div>
  );
};
const Component = connect(mapStateToProps, dispatch => ({ dispatch }))(Demo2);

export default reduxLoadSubApp({
  name: "Demo2",
  Component,
  prepare: async () => {},
  reduxShareStore: true,
  reduxReducers
});
