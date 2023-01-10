"use strict";

module.exports = async function (options) {
  const name = options.route.name || "foo";
  return {
    reducer: {
      [name]: (x) => x || []
    },
    initialState: await Promise.resolve({
      [name]: ["test-init"]
    })
  };
};
