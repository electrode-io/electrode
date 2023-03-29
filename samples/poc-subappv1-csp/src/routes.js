const path = require("path");
// const { cspNonceValue } = require("./server/utils");

const subAppOptions = {
  serverSideRendering: false,
};

const tokenHandlers = [path.join(__dirname, "./server/token-handler")];

const commonRouteOptions = {
  tokenHandlers,
};

// App can pass a generated cspNonceValue
// Another option is to set `cspHeader`. This would be boolean. By deafault cspHeader flag is 
// set `false`. Electrode will generate once and set CSP header.
export default {
  "/*": {
    pageTitle: "Home",
    subApps: [["./products", subAppOptions]],
    templateFile: "./server/templates/products",
    // cspNonceValue,
    cspHeader: true,
    criticalCSS: path.join(__dirname, "./server/critical.css"),
    ...commonRouteOptions
  }
};
