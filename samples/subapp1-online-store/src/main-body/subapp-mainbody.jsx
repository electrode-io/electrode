import { reduxLoadSubApp } from "subapp-redux";
import { React } from "subapp-react";
import { connect } from "react-redux";

import reduxReducers, { decNumber, incNumber } from "./reducers";

const mapStateToProps = state => state;

const MainBody = props => {
  return (
    <div className="container-fluid text-center">
      <h2>SubApp Main Body</h2>
      <div>
        <span style={{ fontSize: "large" }}>
          Redux State Demo
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
const Component = connect(mapStateToProps, dispatch => ({ dispatch }))(MainBody);

export default reduxLoadSubApp({
  name: "MainBody",
  Component,
  useReactRouter: true,
  StartComponent: props => {
    return <Component {...props} />;
  },
  prepare: async () => {},
  reduxShareStore: true,
  reduxReducers
});
