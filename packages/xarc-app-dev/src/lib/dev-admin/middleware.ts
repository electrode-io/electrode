/* eslint-disable no-console, no-magic-numbers, max-statements */
/* eslint-disable max-params, prefer-template, complexity */

import Path from "path";
import Fs from "fs";
import webpack from "webpack";
import hotHelpers from "webpack-hot-middleware/helpers";
import Url from "url";
import { devProxy } from "../../config/dev-proxy";
import { formUrl } from "../utils";
import getFilenameFromUrl from "webpack-dev-middleware/dist/utils/getFilenameFromUrl";

const { getWebpackStartConfig } = require("@xarc/webpack/lib/util/custom-check"); // eslint-disable-line

hotHelpers.pathMatch = (url, path) => {
  try {
    return Url.parse(url).pathname === Url.parse(path).pathname;
  } catch (e) {
    return false;
  }
};

import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import serveIndex from "serve-index-fs";
import ck from "chalker";
import _ from "lodash";
import { jsonToHtml } from "../stats-utils";
import { getBundles } from "../stats-mapper";

const { fullDevServer, controlPaths } = devProxy;

/**
 * @param {...any} args
 */
function urlJoin(...args) {
  if (args.length < 1) return undefined;

  const base = args[0];

  if (!base) return undefined;

  const ix = base.indexOf("://");
  let saved = "";

  if (ix > 0) {
    args[0] = base.substr(ix + 3);
    saved = base.substring(0, ix + 3);
  }

  return saved + Path.posix.join(...args);
}

//
// skip webpack-dev-middleware if
//
// - http header FORCE_WEBPACK_DEV_MIDDLEWARE is not "true"
// AND
// - request is from https://github.com/hapijs/shot
// - or if http header SKIP_WEBPACK_DEV_MIDDLEWARE is set to true
//
// Param: req is the Node HTTP raw request (framework agnostic)
//
const skipWebpackDevMiddleware = req => {
  const h = req.headers || {};
  return (
    h.FORCE_WEBPACK_DEV_MIDDLEWARE !== "true" &&
    (h["user-agent"] === "shot" || h.SKIP_WEBPACK_DEV_MIDDLEWARE === "true")
  );
};
export class Middleware {
  _options: any;
  canContinue: symbol;
  _instanceId: number;
  _hmrPath: string;
  _webpackHotOptions: any;
  devMiddleware: any;
  hotMiddleware: any;
  listAssetPath: string;
  publicPath: string;
  memFsCwd: string;
  cwdMemIndex: any;
  cwdIndex: any;
  devBaseUrl: string;
  devBaseUrlSlash: string;
  cwdBaseUrl: string;
  cwdContextBaseUrl: string;
  reporterUrl: string;
  dllDevUrl: string;
  webpackDev: any;
  returnReporter: any;

  constructor(options) {
    this._options = options;
    this.canContinue = Symbol("webpack dev middleware continue");
    this._instanceId = Date.now();
  }

  setup() {
    const options = this._options;

    const config = require(getWebpackStartConfig("webpack.config.dev.js", false)); // eslint-disable-line

    this._hmrPath = controlPaths.hmr;

    const webpackHotOptions = _.merge(
      {
        log: false,
        path: formUrl({ ...fullDevServer, path: this._hmrPath }),
        heartbeat: 2000
      },
      options.hot
    );

    this._webpackHotOptions = webpackHotOptions;

    const encodeHmrPath = encodeURIComponent(webpackHotOptions.path);

    const hmrClient = [`webpack-hot-middleware/client?path=${encodeHmrPath}`];

    // webpack 5 entry config: https://webpack.js.org/concepts/entry-points/
    const injectHmrToEntry = entry => {
      if (!Array.isArray(entry) && typeof entry === "object") {
        if (entry.import) {
          entry.import = hmrClient.concat(entry.import);
        }
      } else {
        return hmrClient.concat(entry);
      }
      return entry;
    };

    if (!Array.isArray(config.entry) && typeof config.entry === "object") {
      for (const k in config.entry) {
        config.entry[k] = injectHmrToEntry(config.entry[k]);
      }
    } else {
      config.entry = hmrClient.concat(config.entry);
    }

    console.log(
      "Webpack config entry updated with HMR client",
      JSON.stringify(config.entry, null, 2)
    );

    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      options.progress !== false && new webpack.ProgressPlugin({ profile: options.progressProfile })
    ]
      .concat(config.plugins)
      .filter(x => x);

    const compiler = webpack(config);

    const webpackDevOptions = _.merge(
      {
        // https: false,
        // disableHostCheck: true,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        // port: archetype.webpack.devPort,
        // host: archetype.webpack.devHostname,
        // quiet: false,
        // lazy: false,
        // watchOptions: {
        //   aggregateTimeout: 2000,
        //   poll: false
        // },
        stats: {
          colors: true
        },
        publicPath: "/js",
        serverSideRender: false
        // clientLogLevel: "info"
      },
      options.common,
      options.dev
    );

    this.devMiddleware = webpackDevMiddleware(compiler, webpackDevOptions);
    this.hotMiddleware = webpackHotMiddleware(compiler, webpackHotOptions);
    this.publicPath = webpackDevOptions.publicPath || "/";
    this.listAssetPath = urlJoin(this.publicPath, "/");

    const outputFileSystem: any = this.devMiddleware.context.outputFileSystem;

    this.memFsCwd = outputFileSystem.existsSync(process.cwd()) ? process.cwd() : "/";
    this.cwdMemIndex = serveIndex(this.memFsCwd, {
      icons: true,
      hidden: true,
      fs: outputFileSystem,
      path: Path.posix
    });

    this.cwdIndex = serveIndex(process.cwd(), { icons: true, hidden: true });
    this.devBaseUrl = urlJoin(options.devBaseUrl || controlPaths.dev);
    this.devBaseUrlSlash = urlJoin(this.devBaseUrl, "/");
    this.cwdBaseUrl = urlJoin(this.devBaseUrl, "/cwd");
    this.cwdContextBaseUrl = urlJoin(this.devBaseUrl, "/memfs");
    this.reporterUrl = urlJoin(this.devBaseUrl, "/reporter");
    this.dllDevUrl = urlJoin(this.devBaseUrl, "/dll");

    this.webpackDev = {
      lastReporterOptions: undefined,
      hasErrors: false,
      valid: false,
      compileTime: 0
    };

    this.returnReporter = undefined;

    const defaultReporter = (_middlewareOptions, reporterOptions) => {
      if (!reporterOptions.state) {
        process.send({
          name: "webpack-report",
          valid: false
        });
        console.log(ck`webpack bundle is now <magenta>INVALID</>`);
        this.webpackDev.valid = false;
        this.webpackDev.lastReporterOptions = false;
        return;
      }

      const stats = reporterOptions.stats;
      const error = stats.hasErrors() ? "<red> ERRORS</>" : "";
      const warning = stats.hasWarnings() ? "<yellow> WARNINGS</>" : "";
      const notOk = Boolean(error || warning);
      const but = (notOk && "<yellow> but has</>") || "";
      const showError = Boolean(error);
      console.log(ck`webpack bundle is now <green>VALID</>${but}${error}${warning}`);

      this.webpackDev.valid = true;
      this.webpackDev.hasErrors = stats.hasErrors();
      this.webpackDev.compileTime = Date.now();

      const baseUrl = this._options.baseUrl;

      if (notOk) {
        console.log(ck`<cyan.underline>${urlJoin(baseUrl(), this.reporterUrl)}</> \
- View status and errors/warnings from your browser`);
      }

      if (this.webpackDev.lastReporterOptions === undefined) {
        this.returnReporter = showError;
      } else {
        // keep returning reporter until a first success compile
        this.returnReporter = this.returnReporter ? showError : false;
      }

      const refreshModules = [];
      if (!this.webpackDev.hasErrors) {
        const cwd = process.cwd() + "/";
        const bundles = getBundles(reporterOptions.stats);
        bundles.forEach(b => {
          b.modules.forEach(m => {
            if (m.indexOf("node_modules") >= 0) return;
            if (m.indexOf("(webpack)") >= 0) return;
            if (m.startsWith("multi ")) return;
            // webpack4 output like "./routes.jsx + 9 modules"
            const plusIx = m.indexOf(" + ");
            let n = m;
            if (plusIx > 0) n = m.substring(0, plusIx);
            refreshModules.push(n.replace(cwd, ""));
          });
        });
      }

      this.webpackDev.lastReporterOptions = reporterOptions;

      process.send({
        name: "webpack-report",
        valid: true,
        hasErrors: stats.hasErrors(),
        hasWarnings: stats.hasWarnings(),
        refreshModules
      });
    };

    compiler.hooks.done.tap("webpack-dev-middleware", stats => {
      defaultReporter({}, { state: true, stats });
    });
    compiler.hooks.invalid.tap("webpack-dev-middleware", () => {
      defaultReporter({}, { state: false });
    });
  }

  process(req, res, cycle) {
    const isHmrRequest =
      req.url === this._hmrPath ||
      (req.url.startsWith(this.publicPath) && req.url.indexOf(".hot-update.") >= 0);

    if (skipWebpackDevMiddleware(req)) {
      return Promise.resolve(cycle.skip());
    }

    if (!this.webpackDev.lastReporterOptions && !isHmrRequest) {
      return Promise.resolve(
        cycle.replyHtml(`<html><body>
<div style="margin-top: 50px; padding: 20px; border-radius: 10px; border: 2px solid red;">
<h2>Waiting for webpack dev middleware to finish compiling</h2>
</div><script>function doReload(x){ if (!x) location.reload(); setTimeout(doReload, 1000); }
doReload(1); </script></body></html>`)
      );
    }

    const serveStatic = (
      baseUrl,
      fileSystem,
      _serveIndex,
      cwd = process.cwd(),
      isMemFs = false
    ) => {
      req.originalUrl = req.url; // this is what express saves to, else serve-index nukes
      req.url = req.url.substr(baseUrl.length) || "/";
      const PathLib = isMemFs ? Path.posix : Path;
      const fullPath = PathLib.join(cwd, req.url);

      return new Promise((resolve, reject) => {
        fileSystem.stat(fullPath, (err, stats) => {
          if (err) {
            return reject(err);
          } else if (stats.isDirectory()) {
            res.once("end", resolve);
            return _serveIndex(req, res, reject);
          } else {
            return fileSystem.readFile(fullPath, (err2, data) => {
              if (err2) {
                return reject(err);
              } else {
                return resolve(cycle.replyStaticData(data));
              }
            });
          }
        });
      });
    };

    const sendStaticServeError = (msg, err) => {
      return cycle.replyHtml(
        `<html><body>
<div style="margin-top:50px;padding:20px;border-radius:10px;border:2px solid red;">
<h2>Error ${msg}</h2>
<div style="color: red;">${err.message}</div>
<h3>check <a href="${this.reporterUrl}">webpack reporter</a> to see if there're any errors.</h3>
</div></body></html>`
      );
    };

    const serveReporter = reporterOptions => {
      const stats = reporterOptions.stats;
      const jsonData = stats.toJson({}, true);
      const html = jsonToHtml(jsonData, true, undefined);
      const jumpToError =
        html.indexOf(`a name="error"`) > 0 || html.indexOf(`a name="warning"`) > 0
          ? `<script>(function(){var t = document.getElementById("anchor_warning") ||
document.getElementById("anchor_error");if (t) t.scrollIntoView();})();</script>`
          : "";
      return Promise.resolve(
        cycle.replyHtml(`<html><body>
<div style="border-radius: 10px; background: black; color: gray; padding: 10px;">
<pre style="white-space: pre-wrap;">${html}</pre></div>
${jumpToError}</body></html>
`)
      );
    };

    if (isHmrRequest) {
      // do nothing and continue to webpack dev middleware
      return Promise.resolve(this.canContinue);
    } else if (req.url === this.publicPath || req.url === this.listAssetPath) {
      const outputPath = Path.dirname(
        getFilenameFromUrl(this.devMiddleware.context, this.publicPath)
      );
      const outputFileSystem = this.devMiddleware.context.outputFileSystem;

      const listDirectoryHtml = (baseUrl, basePath) => {
        return (
          outputFileSystem.readdirSync(basePath).reduce((a, item) => {
            const p = `${basePath}/${item}`;
            if (outputFileSystem.statSync(p).isFile()) {
              return `${a}<li><a href="${baseUrl}${item}">${item}</a></li>\n`;
            } else {
              return `${a}<li>${item}<br>` + listDirectoryHtml(`${baseUrl}${item}/`, p) + "</li>\n";
            }
          }, "<ul>") + "</ul>"
        );
      };
      const html = `<html><head><meta charset="utf-8"/></head><body>
${listDirectoryHtml(this.listAssetPath, outputPath)}
</body></html>`;
      return Promise.resolve(cycle.replyHtml(html));
    } else if (req.url.startsWith(this.cwdBaseUrl)) {
      return serveStatic(this.cwdBaseUrl, Fs, this.cwdIndex).catch(err => {
        return sendStaticServeError(`reading file under CWD`, err);
      });
    } else if (req.url.startsWith(this.cwdContextBaseUrl)) {
      const isMemFs = true;
      return serveStatic(
        this.cwdContextBaseUrl,
        this.devMiddleware.context.outputFileSystem,
        this.cwdMemIndex,
        this.memFsCwd,
        isMemFs
      ).catch(err => sendStaticServeError("reading webpack mem fs", err));
    } else if (req.url.startsWith(this.reporterUrl) || this.returnReporter) {
      return serveReporter(this.webpackDev.lastReporterOptions);
    } else if (req.url.startsWith(this.dllDevUrl)) {
      // App is requesting for Electrode DLL JS bundle
      // extract DLL module and bundle name
      const dllParts = req.url
        .substr(this.dllDevUrl.length + 1)
        .split("/")
        .filter(x => x);
      // module name is first
      const modName = decodeURIComponent(dllParts[0]);
      // bundle name is second
      const bundle = require.resolve(`${modName}/dist/${dllParts[1]}`);
      return Promise.resolve(cycle.replyFile(bundle));
    } else if (req.url === this.devBaseUrl || req.url === this.devBaseUrlSlash) {
      const html = `<html><head><meta charset="utf-8"/></head><body>
<h1>xarc Webpack Dev Server Dashboard</h1>
<h3><a href="${this.cwdBaseUrl}">View current working directory files</a></h3>
<h3><a href="${this.cwdContextBaseUrl}">View webpack dev memfs files</a></h3>
</body></html>`;
      return Promise.resolve(cycle.replyHtml(html));
    }

    return Promise.resolve(this.canContinue);
  }
}
