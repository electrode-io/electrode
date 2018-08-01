"use strict";

module.exports = () => {
  return {
    name: "non-render-error",
    beforeRender: () => {
      throw new Error("error from test/fixtures/non-render-error");
    },
    tokens: {}
  };
};
