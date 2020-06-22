"use strict";

module.exports = () => {
  return {
    process: function(context) {
      context.output.add("\nfrom async ok module");
      return Promise.resolve();
    }
  };
};
