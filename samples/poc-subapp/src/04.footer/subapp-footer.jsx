import React from "react";
import { reduxLoadSubApp } from "subapp-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Footer = props => {
  return (
    <footer className="container-fluid text-center">
      <p>{props.title}</p>
      <form className="form-inline">
        Get deals:
        <input type="email" className="form-control" size="50" placeholder="Email Address" />
        <button type="button" className="btn btn-danger">
          Sign Up
        </button>
      </form>
    </footer>
  );
};

Footer.propTypes = {
  title: PropTypes.string
};

const Component = connect(
  state => state,
  dispatch => ({ dispatch })
)(Footer);

export default reduxLoadSubApp({
  name: "Footer",
  Component,
  prepare: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: "Online Store Copyright"
        });
      }, 2000);
    });
  }
});
