/* eslint-disable max-statements, no-process-exit, global-require, no-console */

import assert from "assert";
import Path from "path";
import _ from "lodash";
import redbird from "@jchip/redbird";
import ck from "chalker";
import makeOptionalRequire from "optional-require";
import { devProxy } from "../../config/dev-proxy";
import { cdnMock } from "./cdn-mock";
import { isValidPort, formUrl } from "../utils";
import QS from "querystring";

const { settings, searchSSLCerts, controlPaths } = devProxy;

const optionalRequire = makeOptionalRequire(require);

let APP_RULES = [];

const getNotFoundPage = data => {
  const { protocol, actualHost, expectedHost, port } = data;
  const adminUrl = formUrl({ protocol, host: expectedHost, port, path: controlPaths.status });
  /* eslint-disable max-len */
  const invalidHostMessage = `<p>
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
</p>`;

  return `<html>
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
          Check <a href="${adminUrl}">${adminUrl}</a> to see a list of forward rules.
        </p>
        ${actualHost !== expectedHost ? invalidHostMessage : ""}
      </div>
    </div>
  </body>
</html>`;
  /* eslint-enable max-len */
};

// eslint-disable-next-line max-params
const getLineForTree = (_rotocol, host) => (tree, [envVarName, port], idx, arr) => {
  const boxChar = idx === arr.length - 1 ? "└" : "├";
  const portText = envVarName.replace(/port/gi, "");
  return ck`${tree}  ${boxChar}─<green>${formUrl({
    protocol: "http",
    host,
    port
  })}</> (${portText})\n`;
};

const buildProxyTree = (options, ports) => {
  const { host, port, protocol } = options;

  const lineGen = getLineForTree(protocol, host);
  const portTree = Object.entries(_.pick(options, ports)).reduce(lineGen, "");

  return ck`<orange>${formUrl({ protocol, host, port })}</> (proxy) \n${portTree}`;
};

const onExitRequest = (_req, res) => {
  res.statusCode = 200;
  res.write(`<!DOCTYPE html>
<html><head></head><body>
<h1>Bye</h1>
</body>
</html>`);

  res.end();
  process.nextTick(() => process.exit(0));

  return false;
};

const onStatusRequest = (_req, res) => {
  res.statusCode = 200;
  res.write(`<!DOCTYPE html>
<html><head></head><body>
<h1>Electrode Development Reverse Proxy</h1>
<h2>Rules</h2>
<ul>
${APP_RULES.map(
  x => `<li><pre><a href="${x[0]}">${x[0]}</a> ===&gt; <a href="${x[1]}">${x[1]}</a></pre></li>`
).join("")}
</ul>
</body>
</html>`);
  res.end();

  return false;
};

let regAppPort = 0;
let regWebpackDevPort = 0;

const registerElectrodeDevRules = ({
  proxy,
  ssl,
  protocol,
  host,
  port,
  appPort,
  webpackDevPort,
  restart,
  enableCdnMock,
  noDev
}) => {
  const { dev: devPath, admin: adminPath, hmr: hmrPath, appLog, reporter } = controlPaths;
  const logEventsPath = `${devPath}/log-events`;
  const logStreamsPath = `${devPath}/stream-logs`;
  const appForwards: any[] = [[{}, { port: appPort }]];
  regAppPort = appPort;
  regWebpackDevPort = webpackDevPort;

  if (!noDev) {
    appForwards.push(
      [{ path: `/js` }, { path: `/js`, port: webpackDevPort }],
      [{ path: hmrPath }, { path: hmrPath, port: webpackDevPort }],
      [{ path: appLog }, { path: appLog, port: settings.devAdminPort }],
      [{ path: logEventsPath }, { path: logEventsPath, port: settings.devAdminPort }],
      [{ path: logStreamsPath }, { path: logStreamsPath, port: settings.devAdminPort }],
      [{ path: devPath }, { path: devPath, port: webpackDevPort }],
      [{ path: reporter }, { path: reporter, port: webpackDevPort }],
      [{ path: `${adminPath}/test-google` }, { protocol: "https", host: "www.google.com" }]
    );
  }

  const appRules = appForwards
    .map(([src, target, opts]) => {
      return [
        formUrl({ host, protocol, port, ...src }),
        formUrl({ host, protocol: "http", ...target }),
        opts
      ];
    })
    .concat(
      // repeat all rules for 127.0.0.1
      appForwards.map(([src, target, opts]) => {
        return [
          formUrl({ protocol, port, ...src, host: src.host || "127.0.0.1" }),
          formUrl({
            ...target,
            protocol: target.protocol || "http",
            host: target.host || "127.0.0.1"
          }),
          opts
        ];
      })
    )
    .filter(x => x);

  appRules.forEach(x => proxy.register(...x));

  APP_RULES = APP_RULES.concat(appRules);

  proxy.register({
    ssl,
    src: formUrl({ protocol, host, path: controlPaths.exit }),
    target: `http://localhost:29999/skip`,
    onRequest: onExitRequest
  });

  proxy.register({
    ssl,
    src: formUrl({ protocol, host, path: controlPaths.status }),
    target: `http://localhost:29999/skip`,
    onRequest: onStatusRequest
  });

  proxy.register({
    ssl,
    src: formUrl({ protocol, host, path: controlPaths.restart }),
    target: `http://localhost:29999/skip`,
    onRequest: (req, res) => {
      const restartOpts = QS.parse(req._url.split("?")[1]);

      res.statusCode = 200;
      res.write(`proxy restarted`);
      res.end();

      process.nextTick(() => restart(restartOpts));

      return false;
    }
  });

  // mock-cdn

  if (enableCdnMock) {
    const mockCdnSrc = formUrl({ protocol, host, port, path: `/__mock-cdn` });
    cdnMock.generateMockAssets(mockCdnSrc);
    proxy.register({
      ssl,
      src: mockCdnSrc,
      target: `http://localhost:29999/__mock-cdn`,
      onRequest(req, res) {
        cdnMock.respondAsset(req, res);
        return false;
      }
    });
  }
};

const startProxy = (inOptions = {}) => {
  APP_RULES = [];
  const options = Object.assign(
    {
      xfwd: false,
      pino: {
        level: "warn"
      },
      resolvers: []
    },
    settings,
    inOptions
  );

  const proxyOptions = _.pick(options, ["port", "xfwd", "pino", "resolvers"]);
  const { host, port, protocol } = options;

  const ssl = Boolean(options.httpsPort);
  const enableCdnMock = process.argv.includes("--mock-cdn");

  let listenReportTimer;
  const proxyUrls = {} as any;
  proxyOptions.reportListening = (proto, _port, actualPort) => {
    clearTimeout(listenReportTimer);
    if (!regAppPort) {
      return;
    }
    proxyUrls[proto] = formUrl({ protocol: proto, host, port: actualPort });
    console.log(`Electrode dev proxy listening on ${proto} port`, actualPort);
    listenReportTimer = setTimeout(() => {
      const mockCdnMsg = enableCdnMock
        ? `\nMock CDN is enabled (mapping saved to config/assets.json)\n`
        : "\n";
      console.log(
        ck`${mockCdnMsg}${buildProxyTree(options, ["appPort", "webpackDevPort"])}
View status at <green>${proxyUrls.https || proxyUrls.http}${controlPaths.status}</>`
      );

      const urlsShow = Object.keys(proxyUrls)
        .map(x => {
          return ck`<green>${proxyUrls[x]}</>`;
        })
        .join(" or ");

      console.log(ck`You can access your app at ${urlsShow}`);
    }, 100).unref();
  };

  const enableSsl = ssl && isValidPort(options.httpsPort);

  if (enableSsl) {
    const proxyCerts: any = searchSSLCerts();
    assert(proxyCerts.key && proxyCerts.cert, "Dev Proxy can't find SSL key and certs");
    const httpPort = isValidPort(options.httpPort) ? options.httpPort : -1;
    Object.assign(proxyOptions, {
      // We still setup a regular http rules even if HTTPS is enabled
      port: httpPort,
      host,
      secure: true,
      ssl: {
        port: options.httpsPort,
        ...proxyCerts
      }
    });
  }

  let proxy = redbird(proxyOptions);

  const userFiles = ["archetype/config", "src", "test", "config"].map(x => `${x}/dev-proxy-rules`);
  const userDevProxyFile = userFiles.find(f => optionalRequire.resolve(Path.resolve(f)));

  const userDevProxy = userDevProxyFile && require(Path.resolve(userDevProxyFile));

  const restart = async (restartOpts = {}) => {
    // ensure user's proxy rules are refreshed
    if (userDevProxyFile) {
      delete require.cache[userDevProxyFile];
    }
    if (proxy) {
      const old = proxy;
      proxy = undefined;
      await old.close(true);
      process.nextTick(() => startProxy({ ...inOptions, ...restartOpts }));
    }
  };

  proxy.notFound((req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write(
      getNotFoundPage({
        protocol,
        actualHost: req.headers.host.split(":")[0],
        expectedHost: host,
        port
      })
    );
    res.end();
  });

  const noDev = process.argv.includes("--no-dev");
  // register with primary protocol/host/port
  registerElectrodeDevRules({ ...options, ssl: enableSsl, proxy, restart, enableCdnMock, noDev });

  // if primary protocol is https, then register regular http rules at httpPort
  if (enableSsl && isValidPort(options.httpPort)) {
    registerElectrodeDevRules({
      proxy,
      protocol: "http",
      host,
      port: options.httpPort,
      appPort: options.appPort,
      webpackDevPort: options.webpackDevPort,
      restart
    } as any);
  }

  if (process.send) {
    process.send({ name: "proxy-started", appPort: regAppPort });
  }

  if (userDevProxy && userDevProxy.setupRules) {
    console.log("Calling proxy setupRules from your archetype/config/dev-proxy");
    userDevProxy.setupRules(proxy, options);
  }
};

export = startProxy;

startProxy();
