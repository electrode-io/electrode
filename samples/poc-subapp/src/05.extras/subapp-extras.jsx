import React from "react";
import { reduxLoadSubApp } from "subapp-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Extras = props => {
  return (
    <div className="container-fluid text-center">
      <p>Extras Extras Extras</p>
      <div>{props.message}</div>
    </div>
  );
};

Extras.propTypes = {
  message: PropTypes.string
};

const Component = connect(
  state => state,
  dispatch => ({ dispatch })
)(Extras);

export default reduxLoadSubApp({
  name: "Extras",
  Component,
  prepare: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          message: "what other buyers are looking at"
        });
      }, 1000);
    });
  }
});
