"use strict";

module.exports = function setup() {
  return {
    process: function(context) {
      context.output.add("<div>from custom-1</div>");
    }
  };
};
