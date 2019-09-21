import { Component } from "./subapp-footer";
import Promise from "bluebird";

module.exports = {
  initialize: () => {
    // console.log("subapp footer server initialize");
  },
  prepare: () => {
    // console.log("subapp footer server prepare");
    return Promise.delay(50 + Math.random() * 1000).return({
      title: "Your Online Store Copyright"
    });
  },
  StartComponent: Component
};
