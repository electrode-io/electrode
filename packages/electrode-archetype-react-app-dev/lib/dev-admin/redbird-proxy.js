"use strict";

/* eslint-disable max-statements, no-process-exit, global-require, no-console */

const Path = require("path");
const _ = require("lodash");
const redbird = require("@jchip/redbird");
const ck = require("chalker");
const optionalRequire = require("optional-require")(require);

const getIntFromEnv = (name, defaultVal) => {
  const envKey = [].concat(name).find(x => process.env[x]);
  return parseInt(process.env[envKey] || (defaultVal && defaultVal.toString()), 10);
};

const startProxy = options => {
  options = Object.assign(
    {
      host: process.env.HOST || "localhost",
      port: getIntFromEnv("PORT", "3000"),
      appPort: getIntFromEnv("APP_SERVER_PORT", "3001"),
      webpackDevPort: getIntFromEnv(["WEBPACK_PORT", "WEBPACK_DEV_PORT"], "2992"),
      xfwd: false,
      bunyan: {
        level: "warn",
        name: "redbird"
      },
      resolvers: []
    },
    options
  );

  const proxyOptions = _.pick(options, ["port", "xfwd", "bunyan", "resolvers"]);
  const { host } = options;

  let proxy = redbird(proxyOptions);

  proxy.notFound((req, res) => {
    res.statusCode = 404;
    res.write("not found");
    res.end();
  });

  const { appPort, webpackDevPort } = options;

  const rules = [
    [host, `http://${host}:${appPort}`],
    [`${host}/js`, `http://${host}:${webpackDevPort}/js`],
    [`${host}/__electrode_dev`, `http://${host}:${webpackDevPort}/__electrode_dev`],
    ["127.0.0.1", `http://${host}:${appPort}`],
    [`127.0.0.1/js`, `http://${host}:${webpackDevPort}/js`],
    [`127.0.0.1/__electrode_dev`, `http://${host}:${webpackDevPort}/__electrode_dev`]
  ];

  rules.forEach(x => proxy.register(...x));

  proxy.register({
    src: `${host}/__proxy_admin/exit`,
    target: `http://localhost:29999/skip`,
    onRequest: (req, res) => {
      res.statusCode = 200;
      res.write(`<!DOCTYPE html>
<html><head></head><body>
<h1>Bye</h1>
</body>
</html>`);

      res.end();
      process.nextTick(() => process.exit(0));

      return false;
    }
  });

  proxy.register({
    src: `${host}/__proxy_admin/status`,
    target: `http://localhost:29999/skip`,
    onRequest: (req, res) => {
      res.statusCode = 200;
      res.write(`<!DOCTYPE html>
<html><head></head><body>
<h1>Electrode Development Reverse Proxy</h1>
<h2>Rules</h2>
<ul>
${rules.map(x => `<li><pre>${x[0]} ===&gt; <a href="${x[1]}">${x[1]}</a></pre></li>`).join("")}
</ul>
</body>
</html>`);
      res.end();

      return false;
    }
  });

  const restart = () => {
    proxy.close();
    proxy = undefined;
    process.nextTick(startProxy);
  };

  const userDevProxyFile = optionalRequire.resolve(Path.resolve("archetype/config/dev-proxy"));

  const userDevProxy = userDevProxyFile && require(userDevProxyFile);

  proxy.register({
    src: `${host}/__proxy_admin/restart`,
    target: `http://localhost:29999/skip`,
    onRequest: (req, res) => {
      res.statusCode = 200;
      res.write(`restarted`);
      res.end();

      // ensure user's proxy rules are refreshed
      delete require.cache[userDevProxyFile];

      process.nextTick(restart);

      return false;
    }
  });

  if (userDevProxy && userDevProxy.setupRules) {
    console.log("Calling proxy setupRules from your archetype/config/dev-proxy");
    userDevProxy.setupRules(proxy, options);
  }

  console.log(
    ck`Electrode dev proxy server running, \
admin portal at <green>http://${host}:${options.port}/__electrode_dev</>`
  );
  console.log(ck`You can access your app at <green>http://${host}:${options.port}</>`);
};

module.exports = startProxy;

startProxy();
