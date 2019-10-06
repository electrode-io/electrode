import React from "react";
import { connect } from "react-redux";
import { reduxLoadSubApp } from "subapp-redux";
import reduxReducers from "./reducers";

const incNumber = () => {
  return {
    type: "INC_NUMBER"
  };
};

const decNumber = () => {
  return {
    type: "DEC_NUMBER"
  };
};

const Demo2 = props => {
  const { value, dispatch } = props;

  return (
    <div>
      Redux State Demo: <button onClick={() => dispatch(decNumber())}>&#8810;</button>
      &nbsp;{value}&nbsp;
      <button onClick={() => dispatch(incNumber())}>&#8811;</button>
    </div>
  );
};

const mapStateToProps = state => state;

export default reduxLoadSubApp({
  Component: connect(
    mapStateToProps,
    dispatch => ({ dispatch })
  )(Demo2),
  name: "Demo2",
  reduxReducers,
  prepare: ({ initialData }) => {
    return Promise.resolve(initialData || { value: 999 });
  }
});
