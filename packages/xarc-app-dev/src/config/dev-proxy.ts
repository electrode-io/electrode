/* eslint-disable max-statements, no-console, prefer-const, no-magic-numbers */

import { getDevAdminPortFromEnv, isValidPort } from "../lib/utils";

import { getEnvApp } from "./env-app";
import { getEnvProxy } from "./env-proxy";
import { getEnvWebpack } from "./env-webpack";
import Path from "path";
import Fs from "fs";

// note: used by subapp-server/lib/util

let SSL_CERT;
/**
 * Look in app's dependencies and devDependencies for a module with a name that starts with ssl-certs,
 * load it, and try to get dev SSL key/cert file from the functions devKeyFile and devCertFile.
 *
 * If they exist and return strings, then use them as the path to the SSL key/cert file
 * for the dev proxy.
 *
 * @returns `undefined` or `{key, cert }`
 */
function searchSSLCertsModule(xarcCwd): any {
  if (SSL_CERT !== undefined) {
    return SSL_CERT;
  }

  let sslCertsMod;

  try {
    const appPkg = JSON.parse(Fs.readFileSync(Path.resolve(xarcCwd, "package.json"), "utf-8"));
    const matchModName = n => n.match(/(@[^\/]+\/|)ssl-certs.*/);
    sslCertsMod =
      Object.keys(appPkg.dependencies || {}).find(matchModName) ||
      Object.keys(appPkg.devDependencies || {}).find(matchModName);

    if (sslCertsMod) {
      const sslCerts = require(sslCertsMod); // eslint-disable-line
      const key = sslCerts.devKeyFile();
      const cert = sslCerts.devCertFile();
      Fs.accessSync(key);
      Fs.accessSync(cert);
      console.log(`dev proxy found SSL certs module ${sslCertsMod}, using:
    KEY: ${key}
    CERT: ${cert}
  `);
      return (SSL_CERT = { key, cert });
    }
  } catch (err) {
    if (sslCertsMod && err.code !== "MODULE_NOT_FOUND") {
      console.error(
        `dev proxy trying to load Key/Cert from module ${sslCertsMod} failed, error:`,
        err
      );
    }
  }

  return (SSL_CERT = false);
}

/**
 * search for dev SSL certs under app's directory
 *
 * @returns SSL cert file paths
 */
function searchSSLCerts(xarcCwd): any {
  const fromModule = searchSSLCertsModule(xarcCwd);

  if (fromModule) {
    return fromModule;
  }

  const searchDirs = ["", "config", "test", "src"];
  for (const f of searchDirs) {
    const key = Path.resolve(xarcCwd, f, "dev-proxy.key");
    const cert = Path.resolve(xarcCwd, f, "dev-proxy.crt");
    if (Fs.existsSync(key) && Fs.existsSync(cert)) {
      return { key, cert };
    }
  }
  return {};
}

/**
 * Get information to run the dev proxy
 *
 * @returns info for dev proxy
 */
export function getDevProxy(): any {
  const xarcCwd = process.env.XARC_CWD || process.cwd();

  const envWebpack = getEnvWebpack();
  const envApp = getEnvApp();
  const envProxy = getEnvProxy();

  const { host, portForProxy: appPort } = envApp;
  const { webpackDev, devPort: webpackDevPort, devHostname: webpackDevHost } = envWebpack;

  let protocol;
  let port;
  let httpPort = envApp.port;
  let { adminLogLevel, httpsPort } = envProxy;
  const { elevated } = envProxy;
  const useDevProxy = appPort >= 0;

  // auto do https for 443 or 8443
  if ((httpPort === 443 || httpPort === 8443) && !isValidPort(httpsPort)) {
    httpsPort = httpPort;
    protocol = "https";
    if (appPort === 0 || appPort !== 3000) {
      httpPort = 3000;
    } else {
      httpPort = 3300;
    }
  }

  if (isValidPort(httpsPort)) {
    port = httpsPort;
    protocol = "https";
    // avoid http and https conflicting
    if (httpPort === httpsPort) {
      httpPort = -1;
    }
  } else {
    port = httpPort;
    protocol = "http";
  }

  const settings = {
    host,
    port, // the primary port to listen for app, could be http or https
    adminLogLevel,
    appPort,
    httpPort, // the port to always listen on for HTTP
    httpsPort, // dev proxy actually ignores this
    https: protocol === "https",
    webpackDev,
    webpackDevPort,
    webpackDevHost,
    protocol,
    elevated,
    useDevProxy,
    // dev admin-server will set its port in env when invoking the proxy
    devAdminPort: getDevAdminPortFromEnv()
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

  return {
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
    searchSSLCerts: () => searchSSLCerts(xarcCwd)
  };
}

/**
 * Default information for dev proxy
 */
export const devProxy = getDevProxy();
