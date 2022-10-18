import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleCheck, incNumber, decNumber } from "../actions";

class DemoStates extends React.Component {
  render() {
    const { checked, value, dispatch } = this.props;
    /*eslint-disable */
    return (
      <div>
        <h6 className="docs-header">Demo Managing States with Redux</h6>
        <label
          style={{ display: "inline-block", textAlign: "center" }}
          onChange={() => dispatch(toggleCheck())}
          checked={checked}
        >
          <input type="checkbox" checked={checked} />
          <span className="label-body"> checkbox </span>
        </label>
        <div style={{ width: "10rem", display: "inline-block", textAlign: "center" }}>
          {checked ? "checked" : "unchecked"}
        </div>
        <div>
          <button onClick={() => dispatch(decNumber())}>&#8810;</button>
          <div style={{ width: "6rem", display: "inline-block", textAlign: "center" }}>
            {value}
          </div>
          <button onClick={() => dispatch(incNumber())}>&#8811;</button>
        </div>
      </div>
    );
    /*eslint-enable */
  }
}

DemoStates.propTypes = {
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

export default connect(mapStateToProps, dispatch => ({ dispatch }))(DemoStates);
