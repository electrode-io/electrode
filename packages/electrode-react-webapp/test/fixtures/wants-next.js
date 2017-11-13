"use strict";

module.exports = () => {
  return {
    process: function(context, next) {
      context.output.add("\nfrom wants next module");
      setTimeout(next, 0);
    }
  };
};
