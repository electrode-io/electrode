"use strict";

const Path = require("path");
const Fs = require("fs");

const envWebpack = require("./env-webpack");
const envApp = require("./env-app");
const envProxy = require("./env-proxy");

/*
 * Look in app's devDependencies for a module with a name that starts with ssl-certs,
 * load it, and try to get dev SSL key/cert file from the functions devKeyFile and devCertFile.
 *
 * If they exist and return strings, then use them as the path to the SSL key/cert file
 * for the dev proxy.
 */
function searchSSLCertsModule() {
  let sslCertsMod;

  try {
    const appPkg = JSON.parse(Fs.readFileSync("package.json"));
    sslCertsMod = Object.keys(appPkg.devDependencies).find(n => n.match(/(@[^\/]+\/|)ssl-certs.*/));
    if (sslCertsMod) {
      const sslCerts = require(sslCertsMod);
      const key = sslCerts.devKeyFile();
      const cert = sslCerts.devCertFile();
      Fs.accessSync(key);
      Fs.accessSync(cert);
      console.log(`dev proxy found SSL certs module ${sslCertsMod}, using:
  KEY: ${key}
  CERT: ${cert}
`);
      return { key, cert };
    }
  } catch (err) {
    if (sslCertsMod && err.code !== "MODULE_NOT_FOUND") {
      console.error(
        `dev proxy trying to load Key/Cert from module ${sslCertsMod} failed, error:`,
        err
      );
    }
  }

  return undefined;
}

function searchSSLCerts() {
  const fromModule = searchSSLCertsModule();

  if (fromModule) {
    return fromModule;
  }

  const searchDirs = ["", "config", "test", "src"];
  for (const f of searchDirs) {
    const key = Path.resolve(f, "dev-proxy.key");
    const cert = Path.resolve(f, "dev-proxy.crt");
    if (Fs.existsSync(key) && Fs.existsSync(cert)) {
      return { key, cert };
    }
  }
  return {};
}

const { host, portForProxy: appPort } = envApp;
const { webpackDev, devPort: webpackDevPort, devHostname: webpackDevHost } = envWebpack;

let protocol;
let port;
let httpPort = envApp.port;
let { adminLogLevel, httpsPort } = envProxy;
const { elevated } = envProxy;
const useDevProxy = appPort > 0;

if (httpsPort) {
  port = httpsPort;
  protocol = "https";
} else if (httpPort === 443) {
  port = httpsPort = httpPort;
  httpPort = appPort !== 3000 ? 3000 : 3300;
  protocol = "https";
} else {
  port = httpPort;
  protocol = "http";
}

const settings = {
  host,
  port,
  adminLogLevel,
  appPort,
  httpPort,
  httpsPort,
  https: protocol === "https",
  webpackDev,
  webpackDevPort,
  webpackDevHost,
  protocol,
  elevated,
  useDevProxy
};

const adminPath = `/__proxy_admin`;
const hmrPath = `/__webpack_hmr`; // this is webpack-hot-middleware's default
const devPath = `/__electrode_dev`;

const controlPaths = {
  admin: adminPath,
  hmr: hmrPath,
  dev: devPath,
  status: `${adminPath}/status`,
  exit: `${adminPath}/exit`,
  restart: `${adminPath}/restart`,
  appLog: `${devPath}/log`,
  reporter: `${devPath}/reporter`
};

module.exports = {
  settings,
  devServer: useDevProxy
    ? // when using dev proxy, all routes and assets are unified at the same protocol/host/port
      // so we can just use path to load assets and let browser figure out protocol/host/port
      // from the location.
      { protocol: "", host: "", port: "" }
    : // no dev proxy, so webpack dev server is running at a different port, so need to form
      // full URL with protocol/host/port to get the assets.
      { protocol: "http", host: webpackDevHost, port: webpackDevPort, https: false },
  fullDevServer: { protocol, host, port },
  // If using dev proxy in HTTPS, then it's also listening on a HTTP port also:
  httpDevServer: { protocol: "http", host, port: httpPort, https: false },
  controlPaths,
  searchSSLCerts
};
