"use strict";

module.exports = function setup() {
  return {
    name: "custom-1",
    process: function(context) {
      context.output.add("<div>from custom-1</div>");
    }
  };
};
