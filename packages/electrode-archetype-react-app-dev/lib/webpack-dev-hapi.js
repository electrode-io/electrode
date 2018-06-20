"use strict";

/* eslint-disable max-statements, max-params, prefer-template */

const Path = require("path");
const Fs = require("fs");
const Webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const isomorphicExtendRequire = require("isomorphic-loader/lib/extend-require");
const serveIndex = require("../serve-index");
const finalhandler = require("finalhandler");
const Boom = require("boom");
const mime = require("mime");
const chalk = require("chalk");
const archetype = require("electrode-archetype-react-app/config/archetype");
const _ = require("lodash");
const statsUtils = require("./stats-utils");

function register(server, options, next) {
  if (!archetype.webpack.devMiddleware) {
    console.error(
      "webpack-dev-hapi plugin was loaded but WEBPACK_DEV_MIDDLEWARE is not true. Skipping."
    );
    return next();
  }

  const archetypeWebpackConfig = Path.join(archetype.config.webpack, "webpack.config.dev.js");

  const config = require(archetypeWebpackConfig);

  const compiler = new Webpack(config);

  if (options.progress !== false) {
    compiler.apply(new Webpack.ProgressPlugin({ profile: options.progressProfile }));
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
  webpackDevOptions.reporter = reporterOptions => defaultReporter(reporterOptions);

  // in case load assets failed and didn't setup extend require properly
  isomorphicExtendRequire._instance.interceptLoad();
  isomorphicExtendRequire.deactivate();

  const devMiddleware = webpackDevMiddleware(compiler, webpackDevOptions);
  const publicPath = webpackDevOptions.publicPath || "/";
  const listAssetPath = Path.posix.join(publicPath, "/");

  const cwdMemIndex = serveIndex(process.cwd(), {
    icons: true,
    hidden: true,
    fs: devMiddleware.fileSystem
  });
  const cwdIndex = serveIndex(process.cwd(), { icons: true, hidden: true });
  const devBaseUrl = Path.posix.join(options.devBaseUrl || "/_electrode_dev_", "/");
  const cwdBaseUrl = Path.posix.join(devBaseUrl, "cwd");
  const cwdContextBaseUrl = Path.posix.join(devBaseUrl, "memfs");
  const reporterUrl = Path.posix.join(devBaseUrl, "reporter");

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

  let lastReporterOptions;

  defaultReporter = reporterOptions => {
    if (reporterOptions.state) {
      const stats = reporterOptions.stats;
      const error = stats.hasErrors() ? chalk.red(" ERRORS") : "";
      const warning = stats.hasWarnings() ? chalk.yellow(" WARNINGS") : "";
      const but = ((error || warning) && chalk.yellow(" but has")) || "";
      console.log(`webpack bundle is now ${chalk.green("VALID")}${but}${error}${warning}`);
      // TODO: if first time (lastReporterOptions === undefined) and there's error, then opn to reporter

      transferIsomorphicAssets(devMiddleware.fileSystem, err => {
        // reload assets to activate
        if (!err) {
          isomorphicExtendRequire.loadAssets(err2 => {
            if (err) {
              console.error("reload isomorphic assets failed", err2);
            }
            lastReporterOptions = reporterOptions;
          });
        } else {
          lastReporterOptions = reporterOptions;
        }
      });
    } else {
      isomorphicExtendRequire.deactivate();
      console.log(`webpack bundle is now ${chalk.magenta("INVALID")}`);
      lastReporterOptions = false;
    }
    if (userReporter) userReporter(reporterOptions);
  };

  server.ext({
    type: "onRequest",
    method: (request, reply) => {
      const sendHtml = html => {
        reply(`<!DOCTYPE html>${html}`)
          .code(200)
          .header("Content-Type", "text/html");
      };

      if (!lastReporterOptions) {
        return sendHtml(
          `<html><body><div style="margin-top: 50px; padding: 20px; border-radius: 10px; border: 2px solid red;">
<h2>Waiting for webpack dev middleware to finish compiling</h2>
</div><script>function doReload(x){ if (!x) location.reload(); setTimeout(doReload, 1000); }
doReload(1); </script></body></html>`
        );
      }

      const { req, res } = request.raw;

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
        const jsonData = reporterOptions.stats.toJson({}, true);
        const html = statsUtils.jsonToHtml(jsonData, true);
        return sendHtml(
          `<html><body>
<div style="border-radius: 10px; background: black; color: gray; padding: 10px;">
<pre style="white-space: pre-wrap;">${html}</pre></div></body></html>
`
        );
      };

      if (req.url === publicPath || req.url === listAssetPath) {
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
            `<html><body><div style="margin-top: 50px; padding: 20px; border-radius: 10px; border: 2px solid red;">
<h2>Error reading webpack mem fs</h2>
<div style="color: red;">${err.message}</div>
<h3>check <a href="${reporterUrl}">reporter</a> to see if there're any errors.</h3>
</div></body></html>`
          );
        });
      } else if (req.url.startsWith(reporterUrl) || lastReporterOptions.stats.hasErrors()) {
        return serveReporter(lastReporterOptions);
      }

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

  return next();
}

register.attributes = {
  pkg: {
    name: "electrode-webpack-dev-hapi",
    version: "1.0.0"
  }
};

module.exports = register;
