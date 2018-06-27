/*
 * This is the exact same component as in demo-states.jsx except implemented
 * with a pure functional component.
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleCheck, incNumber, decNumber } from "../actions";
import custom from "../styles/custom.css";

const DemoPureStates = props => {
  const { checked, value, dispatch } = props;
  return (
    <div>
      <h6 className={custom["docs-header"]}>Demo Managing States in Pure Functional Component</h6>
      <label
        style={{ display: "inline-block", textAlign: "center" }}
        onChange={() => dispatch(toggleCheck())}
        checked={checked}
      >
        <input type="checkbox" checked={checked} onChange={() => null} />
        <span className={custom["label-body"]}> checkbox </span>
      </label>
      <div style={{ width: "10rem", display: "inline-block", textAlign: "center" }}>
        {checked ? "checked" : "unchecked"}
      </div>
      <div>
        <button onClick={() => dispatch(decNumber())}>&#8810;</button>
        <div style={{ width: "6rem", display: "inline-block", textAlign: "center" }}>{value}</div>
        <button onClick={() => dispatch(incNumber())}>&#8811;</button>
      </div>
    </div>
  );
};

DemoPureStates.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
    value: state.number.value
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(DemoPureStates);
