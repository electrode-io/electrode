"use strict";

module.exports = function setup() {
  const UI_CONFIG_MARKER = "UI_CONFIG";

  return {
    [UI_CONFIG_MARKER]: (context) => {
      const routeOptions = context.user.routeOptions;
      const request = context.user.request;

      const config = {
        ui: routeOptions.uiConfig || request.app.config.ui,
      };

      return `<script>window._wml.config = ${JSON.stringify(config)};</script>`;
    },
  };
};
