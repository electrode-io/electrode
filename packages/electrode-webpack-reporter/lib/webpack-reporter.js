"use strict";

/* eslint-disable no-console, no-magic-numbers, max-statements, complexity, prefer-template, curly, max-len, max-params */

const EventEmitter = require("events");
const chalk = require("chalk");
const fs = require("fs");
const Path = require("path");
const statsUtils = require("./stats-utils");
const http = require("http");
const RoutePaths = require("./route-paths");
const SocketIO = require("socket.io");
const _ = require("lodash");

function removeCwd(s) {
  const cwd = process.cwd();
  if (s.indexOf(cwd) === 0) {
    return Path.join("..", s.substr(cwd.length));
  }
  return s;
}

const optionalRequire = require("optional-require")(require);
const reporterStats = optionalRequire("../dist/server/stats.json");

class WebpackReporter extends EventEmitter {
  constructor(options) {
    super();

    this.options = _.defaults({}, options, { socketPort: 5000 });

    if (reporterStats) {
      //
      // When the reporter is attached to webpack-dev-server, it relies on WDS exporting
      // an enumerable directory view of CWD where node_modules is reachable, and under
      // which this module should be installed with its dist files.
      //
      const distJs = Path.join(__dirname, "../dist/js", reporterStats.assetsByChunkName.main[0]);
      const distCss = Path.join(__dirname, "../dist/js", reporterStats.assetsByChunkName.main[1]);
      this._reporterHtml = fs
        .readFileSync(Path.resolve(Path.join(__dirname, "reporter.html")))
        .toString()
        .replace("{{CSS}}", removeCwd(distCss))
        .replace("{{JS}}", removeCwd(distJs))
        .replace(/{{SOCKET_PORT}}/g, this.options.socketPort);
    } else if (!this.options.skipReportRoutes) {
      throw new Error(
        "webpack-reporter unable to setup routes - check dist has server/stat.json or run build"
      );
    }

    this._socketIO = null;
  }

  apply(config) {
    config = config.devServer || config;
    config.reporter = this._reporter.bind(this);
    const setup = config.setup;
    config.setup = app => {
      if (setup) setup(app);
      this._setup(app);
    };
  }

  _reporter(reporterOptions) {
    if (reporterOptions.state) {
      const stats = reporterOptions.stats;
      this._reporterOptions = reporterOptions;
      const opt = reporterOptions.options;
      const error = stats.hasErrors() ? chalk.red(" ERRORS") : "";
      const warning = stats.hasWarnings() ? chalk.yellow(" WARNINGS") : "";
      const but = ((error || warning) && chalk.yellow(" but has")) || "";
      console.log(`webpack bundle is now VALID${but}${error}${warning}`);
      if (this._socketIO) {
        this._socketIO.emit("hmr");
      } else {
        console.log(
          chalk.magenta(`webpack report is served from`),
          chalk.cyan(`http://${opt.host}:${opt.port}/reporter`)
        );
      }
    } else {
      console.log("webpack bundle is now INVALID");
    }
    this.emit("report", reporterOptions);
  }

  _setup(app) {
    if (!this.options.skipReportRoutes) {
      app.get(RoutePaths.BASE, this._webReport.bind(this));
    }
    app.get(RoutePaths.DATA, this._data.bind(this));
    app.get(RoutePaths.STATS, this._stats.bind(this));
    app.get(`${RoutePaths.BASE}/*`, this._webReport.bind(this));

    if (!this.options.skipSocket) {
      const io = SocketIO(this.options.socketPort);
      io.on("connection", socket => {
        this._socketIO = socket;
      });
    }
  }

  _stats(req, res) {
    const jsonData = () => {
      return this._reporterOptions.stats.toJson({}, true);
    };

    res.json(jsonData());
  }

  _data(req, res) {
    const jsonData = () => {
      return this._reporterOptions.stats.toJson({}, true);
    };

    const stats = jsonData();
    const byPkg = statsUtils.getModulesByPkg(stats);

    const data = {
      info: statsUtils.getInfo(stats),
      assets: statsUtils.getAssets(stats),
      modulesByPkg: byPkg.modulesByPkg,
      totalSizeByPkg: byPkg.totalSize,
      warnings: statsUtils.getWarningsHtml(stats),
      errors: statsUtils.getErrorsHtml(stats),
      legacy: statsUtils.jsonToHtml(stats, true),
      modules: stats.chunks && stats.chunks[0].modules
    };
    res.json(data);
  }

  _webReport(req, res) {
    res.send(this._reporterHtml);
  }
}

module.exports = WebpackReporter;
