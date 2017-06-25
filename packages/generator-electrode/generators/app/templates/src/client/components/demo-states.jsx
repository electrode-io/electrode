import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleCheck, incNumber, decNumber } from "../actions";
import "../styles/raleway.css";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";

class DemoStates extends React.Component {
  render() {
    const props = this.props;
    const { checked, value } = props;
    return (
      <div>
        <h6 className={custom["docs-header"]}>Demo Managing States with Redux</h6>
        <label
          style={{ display: "inline-block", textAlign: "center" }}
          onChange={props.onChangeCheck}
          checked={checked}
        >
          <input type="checkbox" />
          <span className={custom["label-body"]}> checkbox </span>
        </label>
        <div>
          <button onClick={props.onDecrease}>&lt;</button>
          <div style={{ width: "6rem", display: "inline-block", textAlign: "center" }}>
            {value}
          </div>
          <button onClick={props.onIncrease}>&gt;</button>
        </div>
      </div>
    );
  }
}

DemoStates.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
    value: state.number.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeCheck: () => {
      dispatch(toggleCheck());
    },
    onIncrease: () => {
      dispatch(incNumber());
    },
    onDecrease: () => {
      dispatch(decNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoStates);
