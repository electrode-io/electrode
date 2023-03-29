const path = require("path");
// const { cspNonceValue, nonceGenerator } = require("./server/utils");

const subAppOptions = {
  serverSideRendering: false,
};

const tokenHandlers = [path.join(__dirname, "./server/token-handler")];

const commonRouteOptions = {
  tokenHandlers,
};

// App can pass a generated cspNonceValue
// Another option is to set `cspHeader`. This can be a function that generates nonce or a boolean. 
// In case of boolean, electrode will generate once and set CSP header.
export default {
  "/*": {
    pageTitle: "Home",
    subApps: [["./products", subAppOptions]],
    templateFile: "./server/templates/products",
    // cspNonceValue,
    cspHeader: true, // nonceGenerator
    criticalCSS: path.join(__dirname, "./server/critical.css"),
    ...commonRouteOptions
  }
};
