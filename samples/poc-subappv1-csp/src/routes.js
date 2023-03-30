const path = require("path");
const { cspNonceValue } = require("./server/utils");

const subAppOptions = {
  serverSideRendering: false,
};

const tokenHandlers = [path.join(__dirname, "./server/token-handler")];

const commonRouteOptions = {
  tokenHandlers,
};

// To set CSP header
// Option 1 - App can pass a generated cspNonceValue through cspNonce
// Option 2 - set `cspNonce`. This would be boolean. By deafault cspHeader flag is 
// set `false`. Electrode will generate once and set CSP header.
// Option 3 - Selectively set boolean flag for `cspNonce`. { style: true } will add nonce only for styles
export default {
  "/*": {
    pageTitle: "Home",
    subApps: [["./products", subAppOptions]],
    templateFile: "./server/templates/products",
    // Enable one of these to use CSP header
    cspNonce: true,
    // cspNonce: { style: true },
    // cspNonce: cspNonceValue,
    criticalCSS: path.join(__dirname, "./server/critical.css"),
    ...commonRouteOptions
  }
};
