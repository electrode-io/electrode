import React from "react";
import { Component } from "./footer-app";
import Promise from "bluebird";

module.exports = {
  initialize: () => {
    console.log("header server initialize");
  },
  prepare: a => {
    return Promise.delay(50 + Math.random() * 1000).return({});
  },
  content: a => {},
  render: a => {},
  StartComponent: Component
};
