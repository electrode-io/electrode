"use strict";

const Cookies = require("electrode-cookies");

const dynamicDataTags = {
  ccm: request => request.app.uiCCM || request.server.app.uiCCM,
  uiConfig: (request, routeOptions) => routeOptions.uiConfig,
  expoCookies: (request, routeOptions) => {
    const ep = routeOptions.expoPrefix;
    return ep ? Cookies.get(ep, { matchSubStr: true, request }) : {};
  }
};

module.exports = function setup() {
  const WML_DYNAMIC_DATA_MARKER = "WML_DYNAMIC_DATA";

  return {
    [WML_DYNAMIC_DATA_MARKER]: (context, token) => {
      if (!token.props.data) return "";

      const routeOptions = context.user.routeOptions;
      const request = context.user.request;

      const data = {};
      let empty = true;

      for (const dtag of token.props.data) {
        if (!dynamicDataTags.hasOwnProperty(dtag)) {
          console.error(`${token.id} - unknown data tag`, dtag);
        } else {
          empty = false;
          data[dtag] = dynamicDataTags[dtag](request, routeOptions);
        }
      }

      if (empty) return "";

      const config = {
        ccm: data.ccm,
        ui: data.uiConfig,
        expoCookies: data.expoCookies
      };

      return `<script>window._wml.config = ${JSON.stringify(config)};</script>`;
    }
  };
};
