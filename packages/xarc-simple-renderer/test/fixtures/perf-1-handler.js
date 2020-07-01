"use strict";

module.exports = () => {
  return {
    "user-token-1": () => {
      return "<div>user-token-1</div>";
    },

    "user-token-2": context => {
      context.output.add("<div>user-token-2</div>");
    },

    "user-spot-token": context => {
      const spot = context.output.reserve();
      process.nextTick(() => {
        spot.add("<div>user-spot-1;");
        spot.add("user-spot-2;");
        spot.add("user-spot-3</div>");
        spot.close();
      });
    },

    "user-promise-token": context => {
      context.output.add("<div>user-promise-token</div>");
    },

    PAGE_TITLE: () => {
      return "<title>user-handler-title</title>";
    }
  };
};
