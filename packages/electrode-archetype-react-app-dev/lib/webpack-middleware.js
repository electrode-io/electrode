"use strict";

/* eslint-disable no-console, no-magic-numbers, max-statements */
/* eslint-disable max-params, prefer-template, complexity, global-require */
const Path = require("path");
const Fs = require("fs");
const webpack = require("webpack");
const opn = require("opn");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const isomorphicExtendRequire = require("isomorphic-loader/lib/extend-require");
const serveIndex = require("serve-index-fs");
const chalk = require("chalk");
const archetype = require("electrode-archetype-react-app/config/archetype");
const _ = require("lodash");
const statsUtils = require("./stats-utils");
const statsMapper = require("./stats-mapper");

function urlJoin() {
  if (arguments.length < 1) return undefined;

  const base = arguments[0];

  if (!base) return undefined;

  const ix = base.indexOf("://");
  let saved = "";

  if (ix > 0) {
    arguments[0] = base.substr(ix + 3);
    saved = base.substring(0, ix + 3);
  }

  return saved + Path.posix.join.apply(null, arguments);
}

function openUrl(url) {
  const flag = archetype.devOpenBrowser;
  const doOpen = () => {
    return setTimeout(() => opn(url), 750);
  };

  const showOpen = () => {
    console.info(`Your app is now ready at ${chalk.green(url)}`);
  };

  if (flag === false) return showOpen();
  if (flag === true) return doOpen();

  const filename = Path.join(archetype.eTmpDir, "open-browser.json");
  let openTimestamp;
  const now = Date.now();
  try {
    openTimestamp = JSON.parse(Fs.readFileSync(filename));
  } catch (e) {
    openTimestamp = { time: 0 };
  }

  try {
    const diff = now - openTimestamp.time;
    if (diff > 10 * 60 * 1000) {
      openTimestamp.time = now;
      Fs.writeFileSync(filename, JSON.stringify(openTimestamp, null, 2));
      return doOpen();
    }
  } catch (e) {
    //
  }

  return showOpen();
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

class Middleware {
  constructor(options) {
    this._options = options;
    this.canContinue = Symbol("webpack dev middleware continue");
  }

  setup() {
    const options = this._options;

    const archetypeWebpackConfig = Path.join(archetype.config.webpack, "webpack.config.dev.js");
    const config = require(archetypeWebpackConfig);

    const webpackHotOptions = _.merge(
      {
        log: false,
        // this is webpack-hot-middleware's default
        path: "/__webpack_hmr",
        heartbeat: 2000
      },
      options.hot
    );

    this._webpackHotOptions = webpackHotOptions;

    const encodeHmrPath = encodeURIComponent(webpackHotOptions.path);

    const hmrClient = [`webpack-hot-middleware/client?path=${encodeHmrPath}`];
    if (typeof config.entry === "object") {
      Object.keys(config.entry).forEach(k => {
        config.entry[k] = hmrClient.concat(config.entry[k]);
      });
    } else {
      config.entry = hmrClient.concat(config.entry);
    }

    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ].concat(config.plugins);

    const compiler = webpack(config);

    if (options.progress !== false) {
      compiler.apply(new webpack.ProgressPlugin({ profile: options.progressProfile }));
    }

    const webpackDevOptions = _.merge(
      {
        // https: false,
        // disableHostCheck: true,
        // headers: {
        //   "Access-Control-Allow-Origin": "*"
        // },
        // port: archetype.webpack.devPort,
        // host: archetype.webpack.devHostname,
        quiet: false,
        lazy: false,
        watchOptions: {
          aggregateTimeout: 2000,
          poll: false
        },
        stats: {
          colors: true
        },
        publicPath: "/js",
        serverSideRender: false,
        clientLogLevel: "info"
      },
      options.common,
      options.dev
    );

    const userReporter = webpackDevOptions.reporter;
    let defaultReporter; // eslint-disable-line
    webpackDevOptions.reporter = (a, b) => defaultReporter(a, b);

    // in case load assets failed and didn't setup extend require properly
    isomorphicExtendRequire._instance.interceptLoad();
    isomorphicExtendRequire.deactivate();

    this.devMiddleware = webpackDevMiddleware(compiler, webpackDevOptions);
    this.hotMiddleware = webpackHotMiddleware(compiler, webpackHotOptions);
    this.publicPath = webpackDevOptions.publicPath || "/";
    this.listAssetPath = urlJoin(this.publicPath, "/");

    this.cwdMemIndex = serveIndex(process.cwd(), {
      icons: true,
      hidden: true,
      fs: this.devMiddleware.fileSystem
    });

    this.cwdIndex = serveIndex(process.cwd(), { icons: true, hidden: true });
    this.devBaseUrl = urlJoin(options.devBaseUrl || "/__electrode_dev", "/");
    this.cwdBaseUrl = urlJoin(this.devBaseUrl, "cwd");
    this.cwdContextBaseUrl = urlJoin(this.devBaseUrl, "memfs");
    this.reporterUrl = urlJoin(this.devBaseUrl, "reporter");
    this.dllDevUrl = urlJoin(this.devBaseUrl, "dll");

    const loadIsomorphicConfig = () => {
      return JSON.parse(Fs.readFileSync(Path.resolve(".isomorphic-loader-config.json")));
    };

    const transferIsomorphicAssets = (fileSystem, cb) => {
      const isoConfig = loadIsomorphicConfig();
      if (isoConfig.assetsFile) {
        const assetsFile = Path.resolve(isoConfig.assetsFile);
        const source = fileSystem.readFileSync(assetsFile);
        Fs.writeFile(assetsFile, source, cb);
      } else {
        process.nextTick(() => cb(true));
      }
    };

    this.webpackDev = {
      lastReporterOptions: undefined,
      hasErrors: false,
      valid: false,
      compileTime: 0
    };

    this.returnReporter = undefined;

    defaultReporter = (middlewareOptions, reporterOptions) => {
      if (reporterOptions.state) {
        const stats = reporterOptions.stats;
        const error = stats.hasErrors() ? chalk.red(" ERRORS") : "";
        const warning = stats.hasWarnings() ? chalk.yellow(" WARNINGS") : "";
        const notOk = Boolean(error || warning);
        const but = (notOk && chalk.yellow(" but has")) || "";
        const showError = Boolean(error);
        console.log(`webpack bundle is now ${chalk.green("VALID")}${but}${error}${warning}`);

        this.webpackDev.valid = true;
        this.webpackDev.hasErrors = stats.hasErrors();
        this.webpackDev.compileTime = Date.now();

        const baseUrl = this._options.baseUrl;

        const update = () => {
          if (notOk) {
            const x = chalk.cyan.underline(urlJoin(baseUrl(), this.reporterUrl));
            console.log(`${x} - View status and errors/warnings from your browser`);
          }

          if (this.webpackDev.lastReporterOptions === undefined) {
            this.returnReporter = showError;
            openUrl(baseUrl());
          } else {
            // keep returning reporter until a first success compile
            this.returnReporter = this.returnReporter ? showError : false;
          }

          if (!this.webpackDev.hasErrors) {
            const bundles = statsMapper.getBundles(reporterOptions.stats);
            bundles.forEach(b => {
              b.modules.forEach(m => {
                if (m.indexOf("node_modules") >= 0) return;
                if (m.indexOf("(webpack)") >= 0) return;
                if (m.startsWith("multi ")) return;
                // webpack4 output like "./routes.jsx + 9 modules"
                const plusIx = m.indexOf(" + ");
                if (plusIx > 0) m = m.substring(0, plusIx);
                const moduleFullPath = Path.resolve(m);
                delete require.cache[moduleFullPath];
              });
            });
          }

          if (userReporter) userReporter(middlewareOptions, reporterOptions);
          this.webpackDev.lastReporterOptions = reporterOptions;
        };

        transferIsomorphicAssets(this.devMiddleware.fileSystem, err => {
          // reload assets to activate
          if (err) return update();

          return isomorphicExtendRequire.loadAssets(err2 => {
            if (err) console.error("reload isomorphic assets failed", err2);
            update();
          });
        });
      } else {
        isomorphicExtendRequire.deactivate();
        console.log(`webpack bundle is now ${chalk.magenta("INVALID")}`);
        this.webpackDev.valid = false;
        this.webpackDev.lastReporterOptions = false;
        if (userReporter) userReporter(middlewareOptions, reporterOptions);
      }
    };
  }

  process(req, res, cycle) {
    const isHmrRequest =
      req.url === this._webpackHotOptions.path ||
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

    const serveStatic = (baseUrl, fileSystem, indexServer) => {
      req.originalUrl = req.url; // this is what express saves to, else serve-index nukes
      req.url = req.url.substr(baseUrl.length) || "/";
      const fullPath = Path.join(process.cwd(), req.url);

      return new Promise((resolve, reject) => {
        fileSystem.stat(fullPath, (err, stats) => {
          if (err) {
            return reject(err);
          } else if (stats.isDirectory()) {
            res.once("end", resolve);
            return indexServer(req, res, reject);
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
      const html = statsUtils.jsonToHtml(jsonData, true);
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
      const outputPath = this.devMiddleware.getFilenameFromUrl(this.publicPath);
      const filesystem = this.devMiddleware.fileSystem;

      const listDirectoryHtml = (baseUrl, basePath) => {
        return (
          filesystem.readdirSync(basePath).reduce((a, item) => {
            const p = `${basePath}/${item}`;
            if (filesystem.statSync(p).isFile()) {
              return `${a}<li><a href="${baseUrl}${item}">${item}</a></li>\n`;
            } else {
              return `${a}<li>${item}<br>` + listDirectoryHtml(`${baseUrl}${item}/`, p) + "</li>\n";
            }
          }, "<ul>") + "</ul>"
        );
      };
      const html =
        `<html><head><meta charset="utf-8"/></head><body>\n` +
        listDirectoryHtml(this.listAssetPath, outputPath) +
        "</body></html>";
      return Promise.resolve(cycle.replyHtml(html));
    } else if (req.url.startsWith(this.cwdBaseUrl)) {
      return serveStatic(this.cwdBaseUrl, Fs, this.cwdIndex).catch(err => {
        return sendStaticServeError(`reading file under CWD`, err);
      });
    } else if (req.url.startsWith(this.cwdContextBaseUrl)) {
      return serveStatic(
        this.cwdContextBaseUrl,
        this.devMiddleware.fileSystem,
        this.cwdMemIndex
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
    }

    return Promise.resolve(this.canContinue);
  }
}

module.exports = Middleware;
