"use strict";

function setup() {
  return {
    name: "custom-call",
    process: function() {
      return `_call`;
    }
  };
}

module.exports = {
  setup
};
