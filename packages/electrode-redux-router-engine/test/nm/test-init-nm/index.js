"use strict";

module.exports = async function(options) {
  const name = options.route.name || "foo";
  return {
    reducer: {
      [name]: x => x || []
    },
    initialState: {
      [name]: ["test-init-nm"]
    }
  };
};
