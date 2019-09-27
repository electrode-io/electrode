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

const getHost = () => {
  return process.env.HOST || "localhost";
};

const getNotFoundPage = (data) => {
  const { actualHost, expectedHost, port } = data;
  /* eslint-disable max-len */
  const invalidHostMessage = `
    <p>
      <span style="color: red;">ERROR:</span> You used a hostname that the development proxy doesn't recognize.<br />
      The proxy is using the hostname <span style="color: green;">${expectedHost}</span>.<br />
      The hostname in your URL is <span style="color: red;">${actualHost}</span>.<br />
      To change the hostname that the proxy uses, set the HOST env variable.<br />
      For example:<br /><br />
      In unix bash: <code style="color: white;background-color: black;padding: 5px;">
        HOST=${actualHost} clap dev
      </code><br /><br />
      In Windows PowerShell: <code style="color: white;background-color: #012456;padding: 5px;">
        $Env:HOST="${actualHost}"; clap dev
      </code>
    </p>
  `;
  return `
    <html>
      <body>
        <div style="text-align:center;">
          <div>
            <svg version="1.0" viewBox="100 0 202.3 65.1" width="250px" height="250px">
              <g transform="scale(5,5) translate(-94, -10)">
                <path id="Fill-1" class="st0" d="M134.6,8.9c-0.2,0-0.3-0.1-0.4-0.2l-1.1-1.9l-0.9,1.8c-0.1,0.2-0.4,0.3-0.6,0.2 c-0.1-0.1-0.2-0.2-0.2-0.3l-0.8-4.6l-0.9,2.7c-0.1,0.2-0.2,0.3-0.4,0.3h-2.2c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4 h1.9l1.3-4.1c0.1-0.2,0.3-0.3,0.5-0.3c0.1,0,0.3,0.2,0.3,0.3l0.9,5.1l0.7-1.3c0.1-0.2,0.4-0.3,0.6-0.2c0.1,0,0.1,0.1,0.2,0.2 l1,1.6l1.6-7c0.1-0.2,0.3-0.4,0.5-0.3c0.2,0,0.3,0.2,0.3,0.3l1,5.7l3.4,0.2c0.2,0,0.4,0.2,0.4,0.4c0,0.2-0.2,0.4-0.4,0.4l0,0 l-3.7-0.2c-0.2,0-0.4-0.2-0.4-0.3l-0.8-4L135,8.6C135,8.7,134.8,8.9,134.6,8.9L134.6,8.9"></path>
                <path d="M134.3,31.9 c-4.9,0 -8.8,-3.9 -8.8,-8.8 s3.9,-8.8 8.8,-8.8 s8.8,3.9 8.8,8.8 S139.2,31.9 134.3,31.9 L134.3,31.9 M145.1,18.5 h-0.3 l-0.1,-0.3 c-0.6,-1.3 -1.5,-2.4 -2.5,-3.4 l-0.4,-0.3 l3.4,-5.8 h0.3 c1,-0.2 1.6,-1.1 1.5,-2 s-1.1,-1.6 -2,-1.5 s-1.6,1.1 -1.5,2 c0,0.2 0.1,0.4 0.2,0.6 l0.2,0.3 l-3.3,5.4 l-0.5,-0.3 c-1.7,-0.9 -3.6,-1.5 -5.6,-1.5 l0,0 c-1.9,0 -3.9,0.5 -5.6,1.5 l-0.5,0.3 L124.9,8 l0.1,-0.3 c0.1,-0.2 0.2,-0.5 0.2,-0.8 c0,-1 -0.8,-1.8 -1.8,-1.8 s-1.8,0.8 -1.8,1.8 c0,0.9 0.7,1.6 1.5,1.7 h0.3 l3.4,5.8 l-0.4,0.3 c-1,0.9 -1.9,2.1 -2.5,3.3 l-0.2,0.3 h-0.3 c-2.4,0.2 -4.2,2.4 -4,4.8 c0.2,2 1.7,3.7 3.8,4 h0.3 l0.1,0.3 c1.8,4.2 5.9,7 10.5,7 l0,0 c4.6,0 8.7,-2.8 10.5,-7 l0.1,-0.3 h0.3 c2.4,-0.4 4.1,-2.6 3.7,-5 C148.7,20.2 147.1,18.6 145.1,18.5 " id="Fill-4" class="st0"></path>
                <path id="Fill-7" class="st0" d="M138.9,21.1c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3 S138.9,20.4,138.9,21.1C138.9,21.1,138.9,21.1,138.9,21.1"></path>
                <path id="Fill-9" class="st0" d="M132.2,21.1c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3c0,0,0,0,0,0 C131.7,19.8,132.3,20.4,132.2,21.1C132.3,21.1,132.3,21.1,132.2,21.1"></path>
              </g>
            </svg>
            <p>
              Electrode development reverse proxy is unable to forward your URL.<br />
              Check <a href="http://${expectedHost}:${port}/__proxy_admin/status">
                http://${expectedHost}:${port}/__proxy_admin/status
              </a> to see a list of forward rules.
            </p>
            ${actualHost !== expectedHost ? invalidHostMessage : ""}
          </div>
        </div>
      </body>
    </html>
  `;
  /* eslint-enable max-len */
};

const startProxy = options => {
  options = Object.assign(
    {
      host: getHost(),
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
    res.setHeader("Content-Type", "text/html");
    res.write(getNotFoundPage({
      actualHost: req.headers.host.split(":")[0],
      expectedHost: getHost(),
      port: getIntFromEnv("PORT", "3000")
    }));
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
