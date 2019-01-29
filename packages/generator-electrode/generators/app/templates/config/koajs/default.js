"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

module.exports = {
  port: portFromEnv() || "3000",
  webapp: {
    module: "electrode-react-webapp/lib/koa",
    options: {
      pageTitle: "electrode-koa-app",
      insertTokenIds: false,
      paths: {
        "*": {
          content: {
            module: "./{{env.APP_SRC_DIR}}/server/views/index-view"
          }
        }
      }
    }
  }
};
