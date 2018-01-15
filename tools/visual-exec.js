"use strict";

/* eslint-disable no-magic-numbers,no-eval */

const Path = require("path");
const assert = require("assert");
const xsh = require("xsh");
const Promise = require("bluebird");
const chalk = require("chalk");
const _ = require("lodash");
const logger = require("./logger");
const VisualLogger = require("visual-logger");

xsh.Promise = Promise;

const ONE_MB = 1024 * 1024;

function uniqId() {
  return (
    Math.random()
      .toString(36)
      .substr(2, 10) +
    "_" +
    Date.now().toString(36)
  );
}

class VisualExec {
  constructor({ title = undefined, command, cwd = process.cwd() }) {
    this._title = title || `Executing ${command}`;
    this._command = command;
    this._cwd = cwd;
  }

  /* eslint-disable max-statements */
  _updateDigest(item, buf) {
    if (item.buf.indexOf("\n") >= 0 || buf.indexOf("\n") >= 0) {
      item.buf = buf;
    } else {
      item.buf += buf;
    }
    buf = item.buf;
    buf = buf && buf.trim();
    if (buf) {
      logger.updateItem(
        item.name,
        buf
          .split("\n")
          .map(x => x && x.trim())
          .join(chalk.blue("\\n"))
          .substr(0, 100)
      );
    }
  }

  _logResult(child) {
    const stdout = `stdout_${uniqId()}`;
    const stderr = `stderr_${uniqId()}`;

    logger.addItem({
      name: stdout,
      color: "green",
      display: `=== ${this._title}\nstdout`,
      spinner: VisualLogger.spinners[1]
    });
    logger.addItem({
      name: stderr,
      color: "red",
      display: `stderr`
    });

    const stdoutDigest = { name: stdout, buf: "" };
    const stderrdigest = { name: stderr, buf: "" };
    const updateStdout = buf => this._updateDigest(stdoutDigest, buf);
    const updateStderr = buf => this._updateDigest(stdoutDigest, buf);

    child.stdout.on("data", updateStdout);
    child.stderr.on("data", updateStderr);

    const logResult = (err, output) => {
      logger.removeItem(stdout);
      logger.removeItem(stderr);
      child.stdout.removeListener("data", updateStdout);
      child.stderr.removeListener("data", updateStderr);

      const result = err ? `failed ${chalk.red(err.message)}` : chalk.green("exit code 0");

      const info = () => (err ? "error" : "info");
      const verbose = () => (err ? "error" : "verbose");

      if (err) {
        output = err.output;
      }

      logger[info()](`executed ${this._title} ${result}`);

      const colorize = t => t.replace(/ERR!/g, chalk.red("ERR!"));

      const logOutput = () => {
        const logs = [chalk.green(">>>")];
        logs.push(`Start of output from ${this._title} ===`);

        if (output.stdout) logs.push(`\n${colorize(output.stdout)}`);
        if (output.stderr) {
          logs.push(chalk.red("\n=== stderr ===\n") + colorize(output.stderr));
        }
        logs.push(chalk.blue("\n<<<"));
        logs.push(`End of output from ${this._title} ---`);
        logger.prefix(false)[verbose()].apply(logger, logs);
      };

      if (!output || (!output.stdout && !output.stderr)) {
        logger[verbose()](`${chalk.green("No output")} from ${this._title}`);
      } else {
        logOutput();
      }
    };

    return child.promise.tap(output => logResult(null, output)).catch(err => {
      logResult(err);
      throw err;
    });
  }

  execute() {
    const scriptName = chalk.magenta(this._command);

    const child = xsh.exec(
      {
        silent: true,
        cwd: this._cwd,
        env: Object.assign({}, process.env, { PWD: this._cwd }),
        maxBuffer: ONE_MB
      },
      this._command
    );

    return this._logResult(child);
  }
}

module.exports = VisualExec;
