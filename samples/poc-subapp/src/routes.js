const Path = require("path");

const subAppOptions = {
  serverSideRendering: false,
};

const tokenHandlers = [Path.join(__dirname, "./server/token-handler")];

const commonRouteOptions = {
  tokenHandlers,
};

export default {
  "/*": {
    pageTitle: "Demo subapp",
    subApps: [["./demo", subAppOptions]],
    templateFile: "./server/templates/demo",
    ...commonRouteOptions,
  },
};
