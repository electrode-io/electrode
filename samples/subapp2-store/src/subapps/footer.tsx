import { React, ReactSubApp } from "@xarc/react";
import PropTypes from "prop-types";
import { connect, reduxFeature } from "@xarc/react-redux";
import classNames from "classnames";
import custom from "../styles/bootstrap.css";

const Footer = (props: { title: any }) => {
  return (
    <footer
      className={classNames(custom["container-fluid"], custom["text-center"])}
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <p>{props.title}</p>
      <form className={custom["form-inline"]}>
        Get deals:
        <input
          type="email"
          className={custom["form-control"]}
          size="50"
          placeholder="Email Address"
        />
        <button type="button" className={classNames(custom.btn, custom["btn-danger"])}>
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
  (state: any) => state,
  (dispatch: any) => ({ dispatch })
)(Footer);

export const subapp: ReactSubApp = {
  Component,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: x => x,
      prepare: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              initialState: { title: "Online Store Copyright" }
            });
          }, 50);
        });
      }
    })
  ]
};
