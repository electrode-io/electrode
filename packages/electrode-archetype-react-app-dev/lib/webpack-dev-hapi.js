"use strict";

/* eslint-disable no-console, no-magic-numbers, max-statements */
/* eslint-disable max-params, prefer-template, complexity, global-require */
const Path = require("path");
const Fs = require("fs");
const Url = require("url");
const Webpack = require("webpack");
const opn = require("opn");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const isomorphicExtendRequire = require("isomorphic-loader/lib/extend-require");
const serveIndex = require("../serve-index");
const finalhandler = require("finalhandler");
const Boom = require("boom");
const mime = require("mime");
const chalk = require("chalk");
const archetype = require("electrode-archetype-react-app/config/archetype");
const _ = require("lodash");
const statsUtils = require("./stats-utils");
const statsMapper = require("./stats-mapper");

function register(server, options, next) {
  if (!archetype.webpack.devMiddleware) {
    console.error(
      "webpack-dev-hapi plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping."
    );
    return next();
  }

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
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoEmitOnErrorsPlugin()
  ].concat(config.plugins);

  const compiler = Webpack(config);

  if (options.progress !== false) {
    new Webpack.ProgressPlugin({ profile: options.progressProfile }).apply(compiler); 
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

  const devMiddleware = webpackDevMiddleware(compiler, webpackDevOptions);
  const hotMiddleware = webpackHotMiddleware(compiler, webpackHotOptions);
  const publicPath = webpackDevOptions.publicPath || "/";
  const listAssetPath = Path.posix.join(publicPath, "/");

  const cwdMemIndex = serveIndex(process.cwd(), {
    icons: true,
    hidden: true,
    fs: devMiddleware.fileSystem
  });

  const cwdIndex = serveIndex(process.cwd(), { icons: true, hidden: true });
  const devBaseUrl = Path.posix.join(options.devBaseUrl || "/__electrode_dev", "/");
  const cwdBaseUrl = Path.posix.join(devBaseUrl, "cwd");
  const cwdContextBaseUrl = Path.posix.join(devBaseUrl, "memfs");
  const reporterUrl = Path.posix.join(devBaseUrl, "reporter");
  const dllDevUrl = Path.posix.join(devBaseUrl, "dll");

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

  const webpackDev = {
    lastReporterOptions: undefined,
    hasErrors: false,
    valid: false,
    compileTime: 0
  };

  let returnReporter;

  defaultReporter = (middlewareOptions, reporterOptions) => {
    if (reporterOptions.state) {
      const stats = reporterOptions.stats;
      const error = stats.hasErrors() ? chalk.red(" ERRORS") : "";
      const warning = stats.hasWarnings() ? chalk.yellow(" WARNINGS") : "";
      const notOk = Boolean(error || warning);
      const but = (notOk && chalk.yellow(" but has")) || "";
      console.log(`webpack bundle is now ${chalk.green("VALID")}${but}${error}${warning}`);

      webpackDev.valid = true;
      webpackDev.hasErrors = stats.hasErrors();
      webpackDev.compileTime = Date.now();

      const baseUrl = () =>
        Url.format({
          hostname: process.env.HOST || "localhost",
          protocol: server.info.protocol,
          port: server.info.port
        });

      const update = () => {
        if (notOk) {
          const x = chalk.cyan.underline(Path.posix.join(baseUrl(), reporterUrl));
          console.log(`${x} - View status and errors/warnings from your browser`);
        }

        if (webpackDev.lastReporterOptions === undefined) {
          returnReporter = notOk;
          setTimeout(() => opn(baseUrl()), 750);
        } else {
          // keep returning reporter until a first success compile
          returnReporter = returnReporter ? notOk : false;
        }

        if (!webpackDev.hasErrors) {
          const bundles = statsMapper.getBundles(reporterOptions.stats);
          bundles.forEach(b => {
            b.modules.forEach(m => {
              if (m.indexOf("node_modules") >= 0) return;
              if (m.indexOf("(webpack)") >= 0) return;
              if (m.startsWith("multi ")) return;
              const moduleFullPath = Path.resolve(m);
              delete require.cache[moduleFullPath];
            });
          });
        }

        if (userReporter) userReporter(middlewareOptions, reporterOptions);
        webpackDev.lastReporterOptions = reporterOptions;
      };

      transferIsomorphicAssets(devMiddleware.fileSystem, err => {
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
      webpackDev.valid = false;
      webpackDev.lastReporterOptions = false;
      if (userReporter) userReporter(middlewareOptions, reporterOptions);
    }
  };

  server.ext({
    type: "onRequest",
    method: (request, reply) => {
      const sendHtml = html => {
        reply(`<!DOCTYPE html>${html}`)
          .code(200)
          .header("Content-Type", "text/html");
      };

      const { req, res } = request.raw;

      const isHmrRequest =
        req.url === webpackHotOptions.path ||
        (req.url.startsWith(publicPath) && req.url.indexOf(".hot-update.") >= 0);

      if (!webpackDev.lastReporterOptions && !isHmrRequest) {
        return sendHtml(`<html><body>
<div style="margin-top: 50px; padding: 20px; border-radius: 10px; border: 2px solid red;">
<h2>Waiting for webpack dev middleware to finish compiling</h2>
</div><script>function doReload(x){ if (!x) location.reload(); setTimeout(doReload, 1000); }
doReload(1); </script></body></html>`);
      }

      const serveStatic = (baseUrl, fileSystem, indexServer, errorHandler) => {
        req.originalUrl = req.url; // this is what express saves to, else serve-index nukes
        req.url = req.url.substr(baseUrl.length) || "/";
        const fullPath = Path.join(process.cwd(), req.url);
        return fileSystem.stat(fullPath, (err, stats) => {
          if (err) {
            if (errorHandler) errorHandler(err);
            else reply(Boom.notFound());
          } else if (stats.isDirectory()) {
            indexServer(req, res, finalhandler(req, res));
          } else {
            fileSystem.readFile(fullPath, (err2, data) => {
              if (err2) {
                if (errorHandler) return errorHandler(err);
                else return reply(err2);
              }
              const type = mime.lookup(req.url);
              const resp = reply.response(data).code(200);
              if (type) {
                const charset = mime.charsets.lookup(type);
                resp.header("Content-Type", type + (charset ? `; charset=${charset}` : ""));
              }
              return undefined;
            });
          }
        });
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
        return sendHtml(`<html><body>
<div style="border-radius: 10px; background: black; color: gray; padding: 10px;">
<pre style="white-space: pre-wrap;">${html}</pre></div>
${jumpToError}</body></html>
`);
      };

      if (isHmrRequest) {
        // do nothing and continue to webpack dev middleware
      } else if (req.url === publicPath || req.url === listAssetPath) {
        const outputPath = devMiddleware.getFilenameFromUrl(publicPath);
        const filesystem = devMiddleware.fileSystem;

        const listDirectoryHtml = (baseUrl, basePath) => {
          return (
            filesystem.readdirSync(basePath).reduce((a, item) => {
              const p = `${basePath}/${item}`;
              if (filesystem.statSync(p).isFile()) {
                return `${a}<li><a href="${baseUrl}${item}">${item}</a></li>\n`;
              } else {
                return (
                  `${a}<li>${item}<br>` + listDirectoryHtml(`${baseUrl}${item}/`, p) + "</li>\n"
                );
              }
            }, "<ul>") + "</ul>"
          );
        };
        const html =
          `<html><head><meta charset="utf-8"/></head><body>\n` +
          listDirectoryHtml(listAssetPath, outputPath) +
          "</body></html>";
        return sendHtml(html);
      } else if (req.url.startsWith(cwdBaseUrl)) {
        return serveStatic(cwdBaseUrl, Fs, cwdIndex);
      } else if (req.url.startsWith(cwdContextBaseUrl)) {
        return serveStatic(cwdContextBaseUrl, devMiddleware.fileSystem, cwdMemIndex, err => {
          return sendHtml(
            `<html><body>
<div style="margin-top:50px;padding:20px;border-radius:10px;border:2px solid red;">
<h2>Error reading webpack mem fs</h2>
<div style="color: red;">${err.message}</div>
<h3>check <a href="${reporterUrl}">reporter</a> to see if there're any errors.</h3>
</div></body></html>`
          );
        });
      } else if (req.url.startsWith(reporterUrl) || returnReporter) {
        return serveReporter(webpackDev.lastReporterOptions);
      } else if (req.url.startsWith(dllDevUrl)) {
        // App is requesting for Electrode DLL JS bundle
        // extract DLL module and bundle name
        const dllParts = req.url
          .substr(dllDevUrl.length + 1)
          .split("/")
          .filter(x => x);
        // module name is first
        const modName = decodeURIComponent(dllParts[0]);
        // bundle name is second
        const bundle = require.resolve(`${modName}/dist/${dllParts[1]}`);
        return reply.file(bundle);
      }

      request.app.webpackDev = webpackDev;

      return devMiddleware(req, res, err => {
        if (err) {
          console.error("webpack dev middleware error", err);
          reply(err);
        } else {
          reply.continue();
        }
      });
    }
  });

  server.ext({
    type: "onRequest",
    method: (request, reply) => {
      const { req, res } = request.raw;

      try {
        return hotMiddleware(req, res, err => {
          if (err) {
            console.error("webpack hot middleware error", err);
            reply(err);
          } else {
            reply.continue();
          }
        });
      } catch (err) {
        console.error("caught webpack hot middleware exception", err);
        reply(err);
      }

      return undefined;
    }
  });

  return next();
}

register.attributes = {
  pkg: {
    name: "electrode-webpack-dev-hapi",
    version: "1.0.0"
  }
};

module.exports = register;
