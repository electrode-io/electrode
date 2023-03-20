const path = require("path")
const { cspNonceValue } = require('./server/utils');

const subAppOptions = {
  serverSideRendering: false,
}

const tokenHandlers = [path.join(__dirname, "./server/token-handler")]

const commonRouteOptions = {
  tokenHandlers,
}

export default {
  "/*": {
    pageTitle: "Home",
    subApps: [["./products", subAppOptions]],
    templateFile: "./server/templates/products",
    cspNonceValue,
    criticalCSS: path.join(__dirname, "./server/critical.css"),
    ...commonRouteOptions
  }
}
