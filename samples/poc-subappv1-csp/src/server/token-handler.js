"use strict";
const { cspNonceValue }  = require('./utils');

module.exports = function setup() {
  const CUSTOM_TOKEN_HANDLER = "CUSTOM_TOKEN_HANDLER";

  return {
    [CUSTOM_TOKEN_HANDLER]: (context) => {
      const nonce = context?.user?.routeOptions?.cspNonceValue ? ` nonce="${context.user.routeOptions.cspNonceValue}"` : "";
      return `<script${nonce}>console.log('custom token handler');</script>`
    }
  };
};
