import React from "react";
import { Component, default as subApp } from "./bottom";
import { StaticRouter } from "react-router-dom";
import Promise from "bluebird";

export default {
  initialize: () => {
    console.log("bottom subapp server initialize");
  },
  prepare: (request, context) => {
    return Promise.delay(50 + Math.random() * 1000).return({
      initialState: {},
      store: subApp.reduxCreateStore()
    });
  },
  StartComponent: props => {
    return (
      <StaticRouter {...props}>
        <Component />
      </StaticRouter>
    );
  }
};
