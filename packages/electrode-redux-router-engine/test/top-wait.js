"use strict";

module.exports = async function(options) {
  await options.awaitInits();
  const name = options.route.name || "top-wait";
  return {
    reducer: {
      [name]: x => x || []
    },
    initialState: {
      [name]: ["top-wait"]
    }
  };
};
