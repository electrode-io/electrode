const path = require("path");
const { cspNonceValue } = require("./server/utils");
const subAppOptions = {
  serverSideRendering: false,
};

const tokenHandlers = [path.join(__dirname, "./server/token-handler")];

const commonRouteOptions = {
  tokenHandlers,
};
/**
 * 
 * @param {*} param0 
 * @returns CSP header value as string
 */
const setCSPHeaderValues = ({styleNonce, scriptNonce}) => {
  const cspHeader = `
                script-src 'self' 'nonce-${scriptNonce}' 'strict-dynamic' 'unsafe-eval';
                style-src 'self' 'nonce-${styleNonce}' 'strict-dynamic' 'unsafe-eval';
                font-src 'self';
                object-src 'none';
                form-action 'self';
              `;
      return cspHeader;
};

/**
 * To set CSP header
 * Option 1 - App can generate and pass a nonce value to cspNonce
 * 
 * Option 2 - set a boolean to `cspNonce`.  if cspNonce is true, electrode will generate nonce and
 * sets CSP header
 * 
 * Option 3 - Selectively set boolean flag for `cspNonce`. { style: true } will add nonce only 
 * for styles
 * 
 * Option 4 - write a function which would return list of CSP directives and values as string
 * and pass that "function" to getCSPHeader
 */

export default {
  "/*": {
    pageTitle: "Home",
    subApps: [["./products", subAppOptions]],
    templateFile: "./server/templates/products",
    // Enable one of these to use CSP header
    cspNonce: true,
    // cspNonce: { style: true }, // { script: true }
    //  cspNonce: cspNonceValue,
    getCSPHeader: setCSPHeaderValues,
    criticalCSS: path.join(__dirname, "./server/critical.css"),
    ...commonRouteOptions
  }
};
