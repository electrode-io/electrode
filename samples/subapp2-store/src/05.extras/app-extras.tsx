import { React, ReactSubApp, xarcV2, AppContext } from "@xarc/react";
import { connect, reduxFeature } from "@xarc/react-redux";
import PropTypes from "prop-types";
import classNames from "classnames"
import custom from "../components/bootstrap.css";

const Extras = props => {
  const { message } = props
  return (
    <div>
      {message && <div className={classNames(custom["container-fluid"], custom["text-center"])}>
        <p>Extras Extras Extras</p>
        <div>{message}</div>
      </div>}
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

const getReduxState = (param) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        initialState: {
          message: `what other buyers are looking at ${param}`
        }
      });
    }, 1000);
  });
}


export const subapp: ReactSubApp = {
  Component: Component,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: true,
      prepare: async initialState => {
        console.log("Extras (extrax.tsx) subapp redux prepare, initialState:", initialState);
        await getReduxState(0);
        return await getReduxState(1);
      }
    })
  ]
};


