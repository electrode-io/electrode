"use strict";

function setup() {
  return {
    name: "custom-call",
    process: function() {
      return Promise.resolve(`_call process from custom-call token fixture`);
    }
  };
}

module.exports = {
  setup
};
