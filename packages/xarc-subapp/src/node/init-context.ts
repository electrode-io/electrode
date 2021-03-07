/* eslint-disable no-console, max-statements, global-require, @typescript-eslint/no-var-requires */

import { InitProps } from "./types";
import { generateNonce } from "./utils";

const isWebpackDev = Boolean(process.env.WEBPACK_DEV);

/**
 * Initialize all the up front code required for running subapps in the browser.
 *
 * @param _setupContext - context for setup
 * @param setupToken - token for setup
 * @returns data with template process callback
 */
export function initContext(_setupContext: any, setupToken: Partial<{ props: InitProps }>): any {
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

      const { request, namespace } = context.options;

      context.user.request = request;
      context.user.scriptNonce = scriptNonce;
      context.user.scriptNonceAttr = scriptNonceAttr;
      context.user.styleNonce = styleNonce;
      context.user.styleNonceAttr = styleNonceAttr;
      context.user.namespace = namespace || setupToken.props.namespace || "ns0";

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
      //
      // TODO: with Webpack 5 and mini-css-extract-plugin 1.x style HMR breaks when there's
      //       nonce enforcement so don't set style CSP nonce header.
      //
      if (!isWebpackDev) {
        setCspNonce(context.user.styleNonce, "style");
      }

      if (cspValues.length > 0) {
        context.user.cspHeader = cspValues.join(" ");
      }
    }
  };
}
