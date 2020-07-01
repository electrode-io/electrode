"use strict";

module.exports = () => {
  return {
    process: function(context) {
      context.output.add("\nfrom wants next module");
    }
  };
};
