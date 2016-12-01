"use strict";

/* eslint-disable no-console, no-magic-numbers, max-statements, complexity, prefer-template, curly, max-len, max-params */

const EventEmitter = require("events");
const chalk = require("chalk");
const AnsiConvert = require("ansi-to-html");
const fs = require("fs");
const Path = require("path");
const statsUtils = require("./stats-utils");

function removeCwd(s) {
  const cwd = process.cwd();
  if (s.indexOf(cwd) === 0) {
    return Path.join ("..", s.substr(cwd.length));
  }
  return s;
}

const reporterStats = require("../dist/server/stats.json");

class WebpackReporter extends EventEmitter {
  constructor() {
    super();
    const distJs = Path.join(__dirname, "../dist/js", reporterStats.assetsByChunkName.main[0]);
    const distCss = Path.join(__dirname, "../dist/js", reporterStats.assetsByChunkName.main[1]);
    this._reporterHtml = fs.readFileSync(Path.resolve(Path.join(__dirname, "reporter.html"))).toString()
      .replace("{{CSS}}", removeCwd(distCss)).replace("{{JS}}", removeCwd(distJs));
  }

  apply(config) {
    config = config.devServer || config;
    config.reporter = this._reporter.bind(this);
    config.setup = this._setup.bind(this);
  }

  _reporter(reporterOptions) {
    if (reporterOptions.state) {
      const stats = reporterOptions.stats;
      this._reporterOptions = reporterOptions;
      const opt = reporterOptions.options;
      const error = stats.hasErrors() ? chalk.red(" ERRORS") : "";
      const warning = stats.hasWarnings() ? chalk.yellow(" WARNINGS") : "";
      const but = (error || warning) && chalk.yellow(" but has") || "";
      console.log(`webpack bundle is now VALID${but}${error}${warning}`);
      console.log(chalk.magenta(`webpack report is served from`), chalk.cyan(`http://${opt.host}:${opt.port}/reporter`));
    } else {
      console.log("webpack bundle is now INVALID");
    }
    this.emit("report", reporterOptions);
  }

  _setup(app) {
    app.get("/reporter", this._webReport.bind(this));
    app.get("/reporter/stats", this._stats.bind(this));
  }

  _stats(req, res) {
    const jsonData = () => {
      return this._reporterOptions.stats.toJson({}, true);
    };

    res.format({
      json: () => {
        res.json(jsonData());
      }
    })
  }

  _webReport(req, res) {
    const jsonData = () => {
      return this._reporterOptions.stats.toJson({}, true);
    };

    res.format({
      html: () => {
        res.status(200).send(this._reporterHtml);
      },

      json: () => {
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
          pureWebpackStats: stats
        };
        res.json(data);
      },

      default: function () {
        res.status(404).send("Not found");
      }
    });
  }
}

module.exports = WebpackReporter;
