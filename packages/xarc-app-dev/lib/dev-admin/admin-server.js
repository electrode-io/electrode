"use strict";

/* eslint-disable complexity, no-unused-expressions */
/* eslint-disable no-magic-numbers, max-len, max-statements, prefer-template */

const Path = require("path");
const _ = require("lodash");
const boxen = require("boxen");
const ck = require("chalker");
const chokidar = require("chokidar");
const readline = require("readline");
const WebpackDevRelay = require("./webpack-dev-relay");
const { parse } = require("./log-parser");
const { displayLogs } = require("./log-reader");
const { fork } = require("child_process");
const ConsoleIO = require("./console-io");
const logger = require("@xarc/app/lib/logger");
const xaa = require("xaa");

const APP_SERVER_NAME = "your app server";
const DEV_SERVER_NAME = "Electrode webpack dev server";
const PROXY_SERVER_NAME = "Electrode Dev Proxy";

const DEV_PROXY_ENABLED = Boolean(process.env.APP_SERVER_PORT);

class AdminServer {
  constructor(args, options) {
    this._opts = args.opts;
    this._passThru = args._;
    this._messageId = 1;
    this._saveWebpackReportData = undefined;
    this._webpackDevRelay = new WebpackDevRelay();
    this._servers = {};
    this._io = (options && options.inputOutput) || new ConsoleIO();
    this._shutdown = false;
  }

  async start() {
    this._wds = ck`<gray.inverse>[wds]</> `;
    this._proxy = ck`<green.inverse>[proxy]</> `;
    this._io.setup();
    this.handleUserInput();

    this._shutdown || (await this.startWebpackDevServer());
    this._shutdown || (await this.startAppServer());
    if (!this._shutdown && DEV_PROXY_ENABLED) {
      // to debug dev proxy
      // await this.startProxyServer("--inspect-brk");
      await this.startProxyServer();
    }

    this._shutdown ||
      setTimeout(() => {
        this.showMenu();
      }, 100);
  }

  showMenu() {
    const proxyItem = DEV_PROXY_ENABLED ? "<magenta>P</> - Restart Dev Proxy " : "";
    const menu = ck`              <green.inverse>   Electrode Dev Admin Console   </>

 <white.inverse>For your app server</>
   <magenta>A</> - Restart <magenta>D</> - <cyan>inspect-brk</> mode <magenta>I</> - <cyan>inspect</> mode <magenta>K</> - Kill&nbsp;
 <white.inverse>For Electrode webpack dev server</>  ${this._wds}
   <magenta>W</> - Restart <magenta>E</> - <cyan>inspect-brk</> mode <magenta>R</> - <cyan>inspect</> mode <magenta>X</> - Kill&nbsp;
 <magenta>L</> - Show All Logs <magenta>0-6</> - Show Logs by Winston level
 ${proxyItem}<magenta>M</> - Show this menu <magenta>Q</> - Shutdown`;
    this._io.show(boxen(menu, { margin: { left: 5 } }));
  }

  getServer(name) {
    if (this._servers[name]) return this._servers[name];
    return {};
  }

  handleServerExit(name) {
    const info = this.getServer(name);
    if (info._child) {
      info._child.once("exit", (code, signal) => {
        const signalText = signal ? `- signal ${signal}` : "";
        this._io.show(
          ck`<orange>${name} (PID: ${info._child.pid}) exited code ${code} ${signalText}</orange>`
        );
        info._child = undefined;
        info._starting = false;
        this._webpackDevRelay.setAppServer(null);
      });
    }
  }

  async signal(name, sig) {
    const info = this.getServer(name);
    if (info._child) {
      info._child.kill(sig);
    }
  }

  async sendMsg(name, data) {
    const info = this.getServer(name);
    if (info._child) {
      info._child.send(data);
    }
  }

  async kill(name, sig) {
    const info = this.getServer(name);
    info._cancelled = true;
    if (info._startDefer) {
      await xaa.try(() => xaa.runTimeout(info._startDefer.promise, 1000));
    }
    const child = info._child;
    if (child) {
      const defer = xaa.defer();
      child.once("close", () => defer.resolve());
      child.kill(sig);
      await xaa.try(() => xaa.runTimeout(defer.promise, 5000));
      child.kill("SIGKILL");
      info._child = undefined;
      info._starting = false;
    } else if (info._starting) {
      this._io.show(ck`<red>No child process for ${name} to send signal ${sig}</>`);
    }
    info._cancelled = false;
  }

  async _quit() {
    this._shutdown = true;
    this._io.show(ck`<magenta>admin server exit, shutting down servers</magenta>`);
    if (this._appWatcher) {
      this._appWatcher.close();
    }
    await Promise.all([
      this.kill(DEV_SERVER_NAME, "SIGINT"),
      this.kill(APP_SERVER_NAME, "SIGINT"),
      this.kill(PROXY_SERVER_NAME, "SIGINT")
    ]);
    this._io.exit();
  }

  async processCommand(str) {
    const handlers = {
      q: () => this._quit(),
      m: () => this.showMenu(),
      //logs
      l: () => this.displayLogs(),
      0: () => this.displayLogs(0),
      1: () => this.displayLogs(1),
      2: () => this.displayLogs(2),
      3: () => this.displayLogs(3),
      4: () => this.displayLogs(4),
      5: () => this.displayLogs(5),
      6: () => this.displayLogs(6),
      // app server
      a: () => this.startAppServer(),
      d: () => this.startAppServer("--inspect-brk"),
      i: () => this.startAppServer("--inspect"),
      k: () => this.kill(APP_SERVER_NAME, "SIGINT"),
      // webpack dev server
      w: () => this.startWebpackDevServer(),
      e: () => this.startWebpackDevServer("--inspect-brk"),
      r: () => this.startWebpackDevServer("--inspect"),
      x: () => this.kill(DEV_SERVER_NAME, "SIGINT"),
      // dev proxy server
      p: () => DEV_PROXY_ENABLED && this.sendMsg(PROXY_SERVER_NAME, { name: "restart" })
    };
    return handlers[str] && (await handlers[str]());
  }

  async handleUserInput() {
    const { str } = await this._io.getUserInput();
    this.processCommand(str);
    process.nextTick(() => this.handleUserInput());
  }

  //
  // Start a server
  //
  async startServer(options) {
    const { name, debug, killKey } = options;

    if (!this._servers[name]) this._servers[name] = { time: Date.now() };

    const info = this._servers[name];
    info.options = options;
    info.name = name;
    if (info._starting) {
      this._io.show(
        ck`<yellow.inverse> Start ${name} already in progress - press<magenta> ${killKey} </>to kill it.</>`
      );
      return;
    }

    const debugMsg = debug ? ` with <cyan>${debug}</>` : "";

    // show Restarting or Starting message
    const re = info._child ? "Res" : "S";
    this._io.show(ck`<orange>${re}tarting ${name}${debugMsg}</orange>`);
    if (info._child) {
      await this.kill(name, "SIGINT");
    }

    info._startDefer = xaa.defer();
    info._starting = true;

    //
    // file watcher to restart server in case of change
    //
    if (info._watcher) {
      info._watcher.close();
      info._watcher = undefined;
    }

    const start = () => {
      const forkOpts = {
        env: Object.assign({}, process.env, {
          ELECTRODE_ADMIN_SERVER: true
        }),
        silent: true
      };

      if (options.passThruArgs) {
        forkOpts.args = options.passThruArgs;
      }

      if (debug) {
        forkOpts.execArgv = [debug];
      } else {
        forkOpts.execArgv = [];
      }

      info._child = fork(options.exec, forkOpts);
      this.handleServerExit(name);
    };

    if (!info._cancelled) {
      start();
      if (options.waitStart) {
        await options.waitStart(info);
      }

      info._startDefer.resolve("started");
    } else {
      this._startDefer.resolve("cancelled");
    }

    info._starting = false;
  }

  //
  // start webpack dev server
  //
  async startWebpackDevServer(debug) {
    let currentStatusMessage;
    let hasStatusMessage = false;

    const clearStatusMessage = out => {
      if (hasStatusMessage) {
        out.write("\x1b[2K\r");
        hasStatusMessage = false;
      }
    };

    const writeStatusMessage = out => {
      if (!currentStatusMessage) return;
      const l = out.columns;
      const str = l ? currentStatusMessage.substr(0, l - 6) : currentStatusMessage;
      const coloredStr = `\u001b[1m${str}\u001b[39m\u001b[22m`;
      out.write(`\x1b[2K\r${this._wds}${coloredStr}`);
      hasStatusMessage = true;
    };

    const progSig = `<s> [webpack.Progress] `;
    const waitStart = async info => {
      const cwdRegex = new RegExp(process.cwd(), "g");

      const log = (out, data) => {
        data
          .toString()
          .split("\n")
          // kill empty blank lines but preserve spaces
          .map(x => x.trim() && x)
          .filter(x => x)
          .forEach(l => {
            if (l.startsWith(progSig)) {
              currentStatusMessage = l.substring(progSig.length).replace(cwdRegex, ".");
              writeStatusMessage(out);
            } else {
              clearStatusMessage(out);
              out.write(this._wds + l.replace(cwdRegex, ".") + "\n");
            }
          });
      };

      info._child.stdout.on("data", data => log(process.stdout, data));
      info._child.stderr.on("data", data => log(process.stderr, data));

      this._webpackDevRelay.setWebpackServer(info._child);

      return new Promise(resolve => {
        const listenForReport = () =>
          info._child.once("message", data => {
            if (data.name === "webpack-report") {
              resolve();
            } else {
              listenForReport();
            }
          });

        listenForReport();

        info._child.once("exit", () => {
          resolve();
        });
      });
    };

    await this.startServer({
      name: DEV_SERVER_NAME,
      killKey: "X",
      exec: Path.join(__dirname, "dev-server.js"),
      debug: debug || false,
      skipWatch: debug === "--inspect-brk",
      waitStart
    });
  }

  async startAppServer(debug) {
    const skipWatch = debug === "--inspect-brk";

    await this.startServer({
      name: APP_SERVER_NAME,
      debug: debug || false,
      killKey: "K",
      exec: this._opts.exec,
      watch: this._opts.watch,
      skipWatch,
      noTimeoutCheck: skipWatch,
      passThruArgs: this._passThru,
      waitStart: async info => {
        const readStdout = readline.createInterface({
          input: info._child.stdout
        });

        readStdout.on("line", data => {
          const { level, message } = parse(data.toString().trim());
          logger[level](message);
        });

        const readStderr = readline.createInterface({
          input: info._child.stderr
        });

        readStderr.on("line", data => {
          const { level, message } = parse(data.toString().trim());
          logger[level](message);
        });

        await this.waitForAppServerStart(info);
        this._webpackDevRelay.setAppServer(info._child);
      }
    });
  }

  writeMultiLine(tag, data, out) {
    const lines = data
      .toString()
      .replace(/\r/g, "")
      .split("\n");

    const last = lines.length - 1;
    lines.forEach((l, ix) => {
      if (ix < last) {
        out.write(tag + l + "\n");
      } else if (l) {
        out.write(tag + l);
      }
    });
  }

  async startProxyServer(debug) {
    await this.startServer({
      name: PROXY_SERVER_NAME,
      killKey: "O",
      debug,
      exec: Path.join(__dirname, "redbird-spawn"),
      waitStart: async info => {
        info._child.stdout.on("data", data => {
          this.writeMultiLine(this._proxy, data, process.stdout);
        });

        info._child.stderr.on("data", data => {
          this.writeMultiLine(this._proxy, data, process.stderr);
        });
      }
    });
  }

  async waitForAppServerStart(info) {
    let startTimeout;
    let started = false;
    const defer = xaa.defer();

    const pendingMessages = [];

    let messageHandler; // eslint-disable-line

    const processPending = () => {
      if (pendingMessages.length > 0) {
        messageHandler(pendingMessages.shift());
        setTimeout(processPending);
      }
    };

    const checkStarted = data => {
      if (started) {
        return true;
      }

      if (data.name === "timeout") {
        this._io.show(ck`<orange>WARNING: Did not receive start event from \
${info.name} - assuming it started.</>`);
      } else if (data.name !== "app-setup") {
        pendingMessages.push(data);
        return false;
      } else {
        this._io.show(ck`<orange>${info.name} (PID: ${info._child.pid}) started</>`);
      }

      started = true;
      clearTimeout(startTimeout);
      setTimeout(processPending);

      return started;
    };

    messageHandler = (data = {}) => {
      if (!checkStarted(data)) {
        return;
      }

      if (info._child) {
        info._child.removeListener("message", messageHandler);
      }
      this.watchServer(info.name);
      defer.resolve();
    };

    const handleTimeout = () => {
      startTimeout = undefined;
      if (info._child) {
        messageHandler({ name: "timeout", _child: info._child });
      }
    };

    info._child.once("exit", () => {
      clearTimeout(startTimeout);
      defer.resolve();
    });

    info._child.on("message", messageHandler);

    if (info.options.noTimeoutCheck !== true) {
      startTimeout = setTimeout(handleTimeout, 5000);
    }

    return defer.promise;
  }

  displayLogs(maxLevel = 6) {
    displayLogs(maxLevel);
  }

  //
  // watches files change and restart a server
  //
  watchServer(name) {
    let timer;

    const restart = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const info = this.getServer(name);
        if (!info._starting) {
          this.startServer(info.options);
        }
      }, 500);
    };

    const info = this.getServer(name);

    if (!info._watcher && !info.options.skipWatch && !_.isEmpty(info.options.watch)) {
      info._watcher = chokidar.watch(info.options.watch, { cwd: process.cwd() });
      info._watcher.on("change", restart);
    }
  }
}

module.exports = AdminServer;
//
