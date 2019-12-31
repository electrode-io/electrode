"use strict";

/*
 * subapp start for SSR
 * Nothing needs to be done to start subapp for SSR
 */
module.exports = function setup() {
  return {
    process: () => {
      return "\n<!-- subapp start -->\n";
    }
  };
};
