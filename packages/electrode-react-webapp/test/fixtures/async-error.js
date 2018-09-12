"use strict";

module.exports = () => {
  return {
    process: function(context) {
      context.output.add("\nfrom async error module");
      return Promise.reject("error from test/fixtures/async-error");
    }
  };
};
