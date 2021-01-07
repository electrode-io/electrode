/* eslint-disable no-console, max-statements, global-require, @typescript-eslint/no-var-requires */

import { InitProps } from "./types";
import { generateNonce } from "./utils";

/**
 * Initialize all the up front code required for running subapps in the browser.
 *
 * @param setupContext - context for setup
 * @param setupToken - token for setup
 * @returns data with template process callback
 */
export function initContext(setupContext: any, setupToken: Partial<{ props: InitProps }>) {
  return {
    process(context) {
      const { attr: scriptNonceAttr, nonce: scriptNonce } = generateNonce(
        setupToken,
        null,
        "script"
      );

      const { attr: styleNonceAttr, nonce: styleNonce } = generateNonce(
        setupToken,
        scriptNonce,
        "style"
      );

      if (!context.user) {
        context.user = {};
      }

      const { request } = context.options;

      context.user.request = request;
      context.user.scriptNonce = scriptNonce;
      context.user.scriptNonceAttr = scriptNonceAttr;
      context.user.styleNonce = styleNonce;
      context.user.styleNonceAttr = styleNonceAttr;

      const cspValues = [];
      const setCspNonce = (nonce, tag) => {
        if (nonce) {
          const { tokens } = nonce;
          const token = tokens[tag] || tokens.all;
          // strict-dynamic is required for webpack to load dynamic import bundles
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic_2
          cspValues.push(`${tag}-src-elem 'strict-dynamic' 'nonce-${token}';`);
        }
      };

      setCspNonce(context.user.scriptNonce, "script");
      setCspNonce(context.user.styleNonce, "style");

      if (cspValues.length > 0) {
        context.user.cspHeader = cspValues.join(" ");
      }
    }
  };
}
