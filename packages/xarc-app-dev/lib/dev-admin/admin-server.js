"use strict";

/* eslint-disable complexity, no-unused-expressions */
/* eslint-disable no-magic-numbers, max-len, max-statements, prefer-template */

const Path = require("path");
const _ = require("lodash");
const boxen = require("boxen");
const ck = require("chalker");
const chokidar = require("chokidar");
const readline = require("readline");
const { parse: parseLog } = require("./log-parser");
const WebpackDevRelay = require("./webpack-dev-relay");
const { displayLogs } = require("./log-reader");
const { fork } = require("child_process");
const ConsoleIO = require("./console-io");
const logger = require("@xarc/app/lib/logger");
const xaa = require("xaa");
const { formUrl } = require("../utils");
const {
  settings: { useDevProxy: DEV_PROXY_ENABLED },
  fullDevServer,
  controlPaths
} = require("../../config/dev-proxy");

const APP_SERVER_NAME = "your app server";
const DEV_SERVER_NAME = "Electrode webpack dev server";
const PROXY_SERVER_NAME = "Electrode Dev Proxy";

const DEV_ADMIN_STATUS = "DevAdminStatus";
const WDS_PROGRESS = "WDSProgress";
const LOG_ALERT = "LogAlert";

const SERVER_ENVS = {
  [APP_SERVER_NAME]: {
    XARC_BABEL_TARGET: "node"
  },
  [DEV_SERVER_NAME]: {},
  [PROXY_SERVER_NAME]: {}
};

class AdminServer {
  constructor(args, options) {
    this._opts = args.opts;
    this._passThru = args._;
    this._messageId = 1;
    this._saveWebpackReportData = undefined;
    this._webpackDevRelay = new WebpackDevRelay();
    this._servers = {};
    //
    // All output to terminal must be done through this IO.
    // Any out-of-band writes to the terminal with process.stdout or console
    // will mess up the in place progress display that log-update handles
    //
    this._io = (options && options.inputOutput) || new ConsoleIO();

    this._shutdown = false;
    this._fullAppLogUrl = formUrl({ ...fullDevServer, path: controlPaths.appLog });
  }

  async start() {
    this._wds = ck`<gray.inverse>[wds]</> `;
    this._proxy = ck`<green.inverse>[proxy]</> `;
    this._app = ck`<cyan.inverse>[app]</> `;
    this._menu = "";
    this._io.setup();
    this._io.addItem({
      name: DEV_ADMIN_STATUS,
      display: ck`[<green.inverse>DEV ADMIN</>]`
    });
    this.updateStatus("webpack is PENDING");
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
        this.showMenu(true);
      }, 100);
  }

  updateStatus(line) {
    if (line !== undefined) {
      this._statusLine = line;
    }
    this._io.updateItem(
      DEV_ADMIN_STATUS,
      `Press M to show/hide menu. Q to exit. ${this._statusLine}${this._menu}`
    );
  }

  makeMenu() {
    const reporterUrl = formUrl({ ...fullDevServer, path: controlPaths.reporter });
    const logUrl = formUrl({ ...fullDevServer, path: controlPaths.appLog });
    const devurl = formUrl({ ...fullDevServer, path: controlPaths.dev });
    const proxyItem = DEV_PROXY_ENABLED ? "<magenta>P</> - Restart Dev Proxy " : "";
    const menu = ck`             <green.inverse>   Electrode Dev Admin Console   </>

<white.inverse>For your app server</> ${this._app}
  <magenta>A</> - Restart <magenta>D</> - <cyan>inspect-brk</> mode <magenta>I</> - <cyan>inspect</> mode <magenta>K</> - Kill&nbsp;
<white.inverse>For Electrode webpack dev server</>  ${this._wds}
  <magenta>W</> - Restart <magenta>E</> - <cyan>inspect-brk</> mode <magenta>R</> - <cyan>inspect</> mode <magenta>X</> - Kill&nbsp;
<magenta>L</> - Show All Logs <magenta>0-6</> - Show Logs by Winston level
${proxyItem}<magenta>M</> - Show this menu <magenta>Q</> - Shutdown

<green>         App URL: <cyan.underline>${formUrl(fullDevServer)}</></>
<green>     App Log URL: <cyan.underline>${logUrl}</></>
<green>   DEV dashboard: <cyan.underline>${devurl}</></>
<green>WebPack reporter: <cyan.underline>${reporterUrl}</></>`;

    this._menu = "\n" + boxen(menu, { margin: { left: 5 }, padding: { right: 3, left: 3 } });
  }

  showMenu(force) {
    const show = force !== undefined ? force : !this._menu;

    if (show) {
      this.makeMenu();
      clearTimeout(this._hideMenuTimer);
      this._hideMenuTimer = setTimeout(() => this.showMenu(false), 15 * 60 * 1000).unref(); // hide menu after a while
    } else {
      this._menu = "";
    }
    this.updateStatus();
  }

  getServer(name) {
    return this._servers[name] || {};
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
      z: () => this.toggleFullLogUrlMessage(APP_SERVER_NAME),
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
          ELECTRODE_ADMIN_SERVER: true,
          ...SERVER_ENVS[name]
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
    const progSig = `<s> [webpack.Progress] `;
    const waitStart = async info => {
      const cwdRegex = new RegExp(process.cwd(), "g");
      let removeTimer;
      let progLine = "";
      const watchWdsLog = input => {
        const processLine = data => {
          const line = data.toString();
          if (line.trim().length < 1) {
            return;
          }
          if (line.startsWith(progSig)) {
            progLine = line.substring(progSig.length).replace(cwdRegex, ".");
            this._io.addItem({
              name: WDS_PROGRESS,
              spinner: true,
              display: `Webpack Progress`
            });
            this._io.updateItem(WDS_PROGRESS, progLine);
            const match = progLine.match(/\d{1,3}%/);
            if (match) {
              this.updateStatus(ck`Webpack Compile Progress [<orange>${match[0]}</>]`);
            }
            clearTimeout(removeTimer);
          } else {
            if (progLine) {
              removeTimer = setTimeout(() => this._io.removeItem(WDS_PROGRESS), 2000).unref();
              progLine = "";
            }
            if (line.includes("webpack bundle is now")) {
              this.updateStatus(line);
            } else {
              this._io.show(this._wds + line.replace(cwdRegex, "."));
            }
          }
        };

        const reader = readline.createInterface({ input });
        reader.on("line", processLine);
      };

      watchWdsLog(info._child.stdout);
      watchWdsLog(info._child.stderr);

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

  toggleFullLogUrlMessage(serverName) {
    const server = this.getServer(serverName);
    if (server.options) {
      const { logSaver } = server.options;
      logSaver._toggle = !logSaver._toggle;
      if (!logSaver._toggle) {
        this._io.removeItem(LOG_ALERT);
      } else {
        this.showFullLogUrlMessage(logSaver._time, logSaver.fullLogUrl);
      }
    }
  }

  showFullLogUrlMessage(time, url) {
    this._io.addItem({
      name: LOG_ALERT,
      display: ck`[<orange.inverse>ALERT</>]`,
      spinner: false
    });
    const instruction = `<orange>View full logs at: <cyan.underline>${url}</></> - \
<green>Press Z to hide or show this message</>`;
    if (time) {
      this._io.updateItem(
        LOG_ALERT,
        ck`${time} - <orange>Your app server may have logs that require your attention.</>
${instruction}`
      );
    } else {
      this._io.updateItem(
        LOG_ALERT,
        ck`<orange>no unusual log detected from your app server.</>
${instruction}`
      );
    }
  }

  deferLogsOutput(context, showFullLink = true, delay = 999) {
    const { tag, store } = context;

    if (context._deferTimer) {
      clearTimeout(context._deferTimer);
    } else {
      context._deferIx = [];
    }

    if (_.isEmpty(context._deferIx) || store.length - _.last(context._deferIx) > 1) {
      context._deferIx.push(store.length - 1);
    }

    if (!context._showFullLink) {
      context._showFullLink = showFullLink;
    }

    context._deferTimestamp = Date.now();
    context._deferTimer = setTimeout(() => {
      context._deferTimer = undefined;
      let currentIx = 0;
      context._deferIx.forEach(deferIx => {
        if (currentIx > deferIx) {
          return;
        }
        let ix = deferIx;
        for (; ix < store.length; ix++) {
          if (store[ix] === false) {
            break;
          }

          if (typeof store[ix] === "string") {
            this._io.show(tag + store[ix]);
          } else if (store[ix]) {
            const json = store[ix];
            this._io.show(tag + (json.msg || json.message || JSON.stringify(json)));
          }
        }
        currentIx = ix + 1;
      });
      context._deferIx = [];
      if (context._showFullLink === true) {
        context._toggle = true;
        context._time = new Date().toLocaleTimeString().replace(/ /g, "");
        this.showFullLogUrlMessage(context._time, context.fullLogUrl);
      }
      context._showFullLink = undefined;
      if (store.length > 25000) {
        const cleanup = store.filter(x => x !== false);
        context.store = cleanup.slice(cleanup.length - 9999);
      }
    }, delay);
  }

  saveLineOutput(context) {
    const { inputs, store } = context;

    const handler = data => {
      const timeDiff = Date.now() - context._deferTimestamp;
      // if an error line has been detected, then only consider other lines following it
      // within 30 milliseconds as part of it.
      if (context._deferTimer && timeDiff > 30) {
        store.push(false);
      }

      let str = data.toString();
      if (!str.trim()) {
        store.push("");
        logger.info("");
      } else {
        const entry = parseLog(str.trimRight());
        store.push(entry.json || entry.message);
        if (entry.show) {
          this.deferLogsOutput(context, entry.show > 1);
        }
        logger[entry.level](str);
      }
    };

    inputs.forEach(input => {
      const reader = readline.createInterface({ input });
      reader.on("line", handler);
      return reader;
    });
  }

  async startAppServer(debug) {
    const skipWatch = debug === "--inspect-brk";

    const logSaver = { tag: this._app, store: [], fullLogUrl: this._fullAppLogUrl };

    await this.startServer({
      name: APP_SERVER_NAME,
      debug: debug || false,
      killKey: "K",
      exec: this._opts.exec,
      watch: this._opts.watch,
      skipWatch,
      noTimeoutCheck: skipWatch,
      passThruArgs: this._passThru,
      logSaver,
      waitStart: async info => {
        logSaver.inputs = [info._child.stdout, info._child.stderr];
        this.saveLineOutput(logSaver);
        await this.waitForAppServerStart(info);
        this._webpackDevRelay.setAppServer(info._child);
      }
    });
  }

  passThruLineOutput(tag, input, output) {
    const reader = readline.createInterface({ input });
    reader.on("line", data => {
      output.write(tag + data.toString() + "\n");
    });
    return reader;
  }

  async startProxyServer(debug) {
    await this.startServer({
      name: PROXY_SERVER_NAME,
      killKey: "O",
      debug,
      exec: Path.join(__dirname, "redbird-spawn"),
      waitStart: async info => {
        this.passThruLineOutput(this._proxy, info._child.stdout, this._io);
        this.passThruLineOutput(this._proxy, info._child.stderr, this._io);
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
        const pid = _.get(info, "_child.pid");
        this._io.show(ck`<orange>${info.name} (PID: ${pid}) started</>`);
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
