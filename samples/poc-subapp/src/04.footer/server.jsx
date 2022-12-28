import { Component } from "./subapp-footer";

module.exports = {
  initialize: () => {
    // console.log("subapp footer server initialize");
  },
  prepare: () => {
    // console.log("subapp footer server prepare");
    
    return new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 1000)).then({
      title: "Your Online Store Copyright"
    });
  },
  StartComponent: Component
};
