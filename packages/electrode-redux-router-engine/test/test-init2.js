"use strict";

module.exports = function(options) {
  const name = options.route.name || "foo";
  return {
    reducer: {
      [name]: x => x || []
    },
    initialState: {
      [name]: ["test-init2"]
    }
  };
};
