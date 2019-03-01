import React from "react";
import { Component } from "./subapp-footer";
import Promise from "bluebird";

module.exports = {
  initialize: () => {
    console.log("subapp footer server initialize");
  },
  prepare: a => {
    return Promise.delay(50 + Math.random() * 1000).return({});
  },
  content: a => {},
  render: a => {},
  StartComponent: Component
};
