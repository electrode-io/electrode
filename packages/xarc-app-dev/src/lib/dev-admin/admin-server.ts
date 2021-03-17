/* eslint-disable complexity, no-unused-expressions */
/* eslint-disable no-magic-numbers, max-len, max-statements, prefer-template */

import Path from "path";
import _ from "lodash";
import boxen from "boxen";
import ck from "chalker";
import chokidar from "chokidar";
import readline from "readline";
import { fork } from "child_process";
import { ConsoleIO } from "./console-io";
import { AutomationIO } from "./automation-io";
import isCI from "is-ci";
import { doCleanup } from "./cleanup";
import * as xaa from "xaa";
import { formUrl } from "../utils";
import makeOptionalRequire from "optional-require";
const optionalRequire = makeOptionalRequire(require);

const WT = optionalRequire("worker_threads");

import { parse as parseLog } from "./log-parser";
import { WebpackDevRelay } from "./webpack-dev-relay";
import { AdminHttp } from "./admin-http";

import { devProxy } from "../../config/dev-proxy";

const {
  settings: { useDevProxy: DEV_PROXY_ENABLED, adminLogLevel },
  fullDevServer,
  controlPaths
} = devProxy;

const ADMIN_LOG_LEVEL = parseInt(adminLogLevel) || 0;

const APP_SERVER_NAME = "your app server";
const DEV_SERVER_NAME = "Electrode webpack dev server";
const PROXY_SERVER_NAME = "Electrode Dev Proxy";

const DEV_ADMIN_STATUS = "DevAdminStatus";
const WDS_PROGRESS = "WDSProgress";
const LOG_ALERT = "LogAlert";

const LOG_SHOW_LEVELS = ["all", "error"];
const PROMPT_SPINNER = ">-+";
const PROMPT_SPIN_INTERVAL = 3500;

const SERVER_ENVS = {
  [APP_SERVER_NAME]: {
    XARC_BABEL_TARGET: "node"
  },
  [DEV_SERVER_NAME]: {} as any,
  [PROXY_SERVER_NAME]: {} as any
};

const getTerminalColumns = () => {
  const { env, stdout, stderr } = process;

  return (
    (stdout && stdout.columns) ||
    (stderr && stderr.columns) ||
    (env.COLUMNS && Number.parseInt(env.COLUMNS, 10)) ||
    80
  );
};

export class AdminServer {
  _opts: any;
  _passThru: any;
  _messageId: any;
  _saveWebpackReportData: any;
  _webpackDevRelay: any;
  _servers: any;
  _io: any;
  _shutdown: any;
  _fullAppLogUrl: any;
  _startTime: any;
  _wds: any;
  _proxy: any;
  _app: any;
  _appPort: number;
  _appLogLevel: any;
  _menu: any;
  _fullyStarted: any;
  _ctrlCExit: any;
  _statusLine: any;
  _hideMenuTimer: any;
  _appWatcher: any;
  _startDefer: any;
  _adminHttp: AdminHttp;

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
    const defaultIo = () => {
      const autoIo = args.source.interactive === "cli" ? !args.opts.interactive : isCI;
      return autoIo ? new AutomationIO("Dev Admin") : new ConsoleIO();
    };

    this._io = (options && options.inputOutput) || defaultIo();

    this._shutdown = false;
    this._fullAppLogUrl = formUrl({ ...fullDevServer, path: controlPaths.appLog });
    this._adminHttp = new AdminHttp({
      getLogs: (app: string) => this.getLogs(app),
      port: this._opts.port
    });
  }

  async start() {
    this._startTime = Date.now();
    this._wds = ck`<gray.inverse>[wds]</> `;
    this._proxy = ck`<green.inverse>[proxy]</> `;
    this._app = ck`<cyan.inverse>[app]</> `;
    this._appLogLevel = LOG_SHOW_LEVELS[ADMIN_LOG_LEVEL] || LOG_SHOW_LEVELS[0];
    this._menu = "";
    this._io.setup();
    this._io.addItem({
      name: DEV_ADMIN_STATUS,
      display: ck`[<green.inverse>DEV ADMIN</>]`,
      spinner: PROMPT_SPINNER,
      spinInterval: PROMPT_SPIN_INTERVAL
    });
    this.updateStatus("webpack is PENDING");
    this.handleUserInput();

    this._fullyStarted = false;
    this._shutdown || (await this.startWebpackDevServer());
    this._shutdown || (await this.startAppServer());

    this._appPort = devProxy.appPort;

    if (!this._shutdown && DEV_PROXY_ENABLED) {
      // to debug dev proxy
      // await this.startProxyServer("--inspect-brk");
      await this.startProxyServer();
    }
  }

  logTime(msg) {
    const now = Date.now();
    const elapsed = (now - this._startTime) / 1000;
    this._io.show(ck`<orange>${msg} was <cyan>${elapsed}</> seconds</>`);
  }

  updateStatus(line = undefined) {
    if (line !== undefined) {
      this._statusLine = line;
    }
    const exitMsg = this._ctrlCExit ? "\n<orange>      == Press ^C again to Exit ==  </>" : "";
    this._io.updateItem(
      DEV_ADMIN_STATUS,
      ck`Press M show/hide menu | Q exit | L set App Log Show Level: <white.inverse> \
${this._appLogLevel} </> | ${this._statusLine}${this._menu}${exitMsg}`
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
<magenta>L</> - Change App Log Show Level <magenta>Z</> - Show/Hide App Log Alert
${proxyItem}<magenta>M</> - Show this menu <magenta>Q</> - Shutdown

<green>         App URL: <cyan.underline>${formUrl(fullDevServer)}</></>
<green>     App Log URL: <cyan.underline>${logUrl}</></>
<green>   DEV dashboard: <cyan.underline>${devurl}</></>
<green>WebPack reporter: <cyan.underline>${reporterUrl}</></>`;

    this._menu =
      "\n" + boxen(menu, { margin: { left: 5 } as any, padding: { right: 3, left: 3 } as any });
  }

  showMenu(force = undefined) {
    const show = force !== undefined ? force : !this._menu;

    if (show) {
      this.makeMenu();
      clearTimeout(this._hideMenuTimer);
      this._hideMenuTimer = setTimeout(() => this.showMenu(false), 5 * 60 * 1000).unref(); // hide menu after a while
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
      const child = info._child;
      const { pid } = child;
      child.once("exit", (code, signal) => {
        const signalText = signal ? `- signal ${signal}` : "";
        this._io.show(ck`<orange>${name} (PID: ${pid}) exited code ${code} ${signalText}</orange>`);
        if (info._child === child) {
          info._child = undefined;
        }
        this._webpackDevRelay.setAppServer(null);
      });
    }
  }

  async signal(name, sig) {
    const info = this.getServer(name);
    if (info._child && info._child.kill) {
      info._child.kill(sig);
    }
  }

  async sendMsg(name, data) {
    const info = this.getServer(name);
    if (info._child && info._child.send) {
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
      if (child.kill) {
        child.kill(sig);
        const defer = xaa.defer();
        child.once("close", () => defer.resolve());
        await xaa.try(() => xaa.runTimeout(defer.promise, 1000));
        child.kill("SIGKILL");
      } else if (child.terminate) {
        child.postMessage("kill");
        const defer1 = xaa.defer();
        child.once("message", msg => defer1.resolve(msg));
        await xaa.try(() => xaa.runTimeout(defer1.promise, 1000));
        child.terminate();
        const defer2 = xaa.defer();
        child.once("exit", () => defer2.resolve());
        await xaa.try(() => xaa.runTimeout(defer2.promise, 1000));
      }
      info._child = undefined;
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

    this._io.shutdown();
    const httpShutdown = this._adminHttp.shutdown();
    await doCleanup();
    await httpShutdown;
    this._io.exit();
  }

  _changeLogShowLevel() {
    let ix = LOG_SHOW_LEVELS.indexOf(this._appLogLevel) + 1;
    if (ix >= LOG_SHOW_LEVELS.length) {
      ix = 0;
    }
    this._appLogLevel = LOG_SHOW_LEVELS[ix];
    this.updateStatus();
  }

  async processCommand(str) {
    const handlers = {
      q: () => this._quit(),
      "^c": () => {
        if (!this._menu) {
          this.showMenu();
        } else {
          this.updateStatus();
        }
      },
      m: () => this.showMenu(),
      //logs
      l: () => this._changeLogShowLevel(),
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

    if (str === "^c") {
      if (this._ctrlCExit) {
        return this._quit();
      }
      this._ctrlCExit = true;
    } else if (this._ctrlCExit) {
      this._ctrlCExit = false;
      this.updateStatus();
    }

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

    if (!this._servers[name]) {
      this._servers[name] = { time: Date.now() };
    }

    const info = this._servers[name];

    if (info._starting) {
      this._io.show(
        ck`<yellow.inverse> Start ${name} already in progress - press<magenta> ${killKey} </>to kill it.</>`
      );
      return;
    }

    info.options = options;
    info.name = name;
    info._starting = true;

    const debugMsg = debug ? ` with <cyan>${debug}</>` : "";

    const Worker =
      process.env.XARC_WDS_WORKER && options.exec.includes("dev-server") && WT && WT.Worker;

    const wtMsg = Worker ? ` [using worker threads]` : "";

    // show Restarting or Starting message
    const re = info._child ? "Res" : "S";
    this._io.show(
      ck`<orange>${re}tarting ${name}${wtMsg}${debugMsg} - log tag:</orange> ${options.tag}`
    );

    if (info._child) {
      await this.kill(name, "SIGINT");
    }

    info._startDefer = xaa.defer();

    //
    // file watcher to restart server in case of change
    //
    if (info._watcher) {
      info._watcher.close();
      info._watcher = undefined;
    }

    const start = () => {
      const env = Object.assign({}, process.env, {
        COLUMNS: getTerminalColumns(),
        // let child process know that dev admin is running
        XARC_ADMIN_SERVER: true,
        // pass admin port to child process
        XARC_ADMIN_PORT: this._adminHttp._port,
        ...SERVER_ENVS[name]
      });

      if (Worker) {
        info._child = new Worker(options.exec, { env, stdin: true, stdout: true, stderr: true });
      } else {
        const forkOpts: any = {
          env,
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
      }
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
  async startWebpackDevServer(debug = undefined) {
    const progSig = `<s> [webpack.Progress] `;
    const waitStart = async info => {
      const cwdRegex = new RegExp(process.env.XARC_CWD || process.cwd(), "g");
      let removeTimer;
      let progLine = "";
      let isNowMsg = "";

      const setupCompletion = () => {
        clearTimeout(removeTimer);
        removeTimer = setTimeout(() => {
          if (isNowMsg) {
            this.updateStatus(isNowMsg);
            isNowMsg = "";
          }
          this._io.removeItem(WDS_PROGRESS);
        }, 2000).unref();
      };

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
            if ((match && match[0] === "100%") || isNowMsg) {
              setupCompletion();
              progLine = "";
            }
          } else if (line.includes("webpack bundle is now")) {
            isNowMsg = line;
            if (progLine.includes("100%")) {
              // the 100% progress line already received, so just setup timer
              // to complete the final status message
              setupCompletion();
            } else {
              this.updateStatus(line);
            }
          } else {
            this._io.show(this._wds + line.replace(cwdRegex, "."));
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
              resolve(null);
            } else {
              listenForReport();
            }
          });

        listenForReport();

        info._child.once("exit", () => {
          resolve(null);
        });
      });
    };

    await this.startServer({
      name: DEV_SERVER_NAME,
      tag: this._wds,
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
      spinner: PROMPT_SPINNER,
      spinInterval: PROMPT_SPIN_INTERVAL
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

  deferLogsOutput(context, showFullLink = true, delay = 250) {
    const { tag, store } = context;

    const now = Date.now();
    if (context._deferTimer) {
      // avoid starving defer output
      if (now - context._initialDefer < 150) {
        clearTimeout(context._deferTimer);
        context._deferTimer = null;
      }
    } else {
      context._initialDefer = now;
      context._deferIx = [];
    }

    if (_.isEmpty(context._deferIx) || store.length - _.last(context._deferIx) > 1) {
      context._deferIx.push(store.length - 1);
    }

    if (!context._showFullLink) {
      context._showFullLink = showFullLink;
    }

    if (context._deferTimer) {
      return;
    }

    context._deferTimestamp = Date.now();
    context._deferTimer = setTimeout(() => {
      context._deferTimer = null;
      let currentIx = 0;
      const logsToShow = context._deferIx.reduce((logs, deferIx) => {
        if (currentIx > deferIx) {
          return logs;
        }
        let ix = deferIx;
        for (; ix < store.length; ix++) {
          if (store[ix] === false) {
            break;
          }

          if (typeof store[ix] === "string") {
            logs.push(tag + store[ix]);
          } else if (store[ix]) {
            const json = store[ix];
            logs.push(tag + (json.msg || json.message || JSON.stringify(json)));
          }
        }

        currentIx = ix + 1;
        return logs;
      }, []);
      this._io.show(logsToShow.join("\n"));
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
      const continuation = timeDiff < 30;
      if (context._deferTimer && !continuation) {
        store.push(false);
      }

      const str = data.toString();
      context.checkLine && context.checkLine(str);
      if (!str.trim()) {
        store.push({ ts: Date.now(), level: "info", message: "" });
      } else {
        const entry = parseLog(str.trimRight(), _.last(store));
        // consider lines with at least two leading white spaces to be potential
        // continuation of previous error/warning messages.
        if (continuation && str.startsWith("  ")) {
          const last = store[store.length - 1];
          if (last && (last.level === "warn" || last.level === "error")) {
            entry.level = last.level;
          }
        }
        store.push(entry);
        if (entry.show || this._appLogLevel === "all") {
          this.deferLogsOutput(context, entry.show > 1);
        }
      }

      this._adminHttp.sendLogsToStreamClients();
    };

    inputs.forEach(input => {
      const reader = readline.createInterface({ input });
      reader.on("line", handler);
      return reader;
    });
  }

  async startAppServer(debug = undefined) {
    const skipWatch = debug === "--inspect-brk";
    const logSaver: any = {
      tag: this._app,
      store: [],
      fullLogUrl: this._fullAppLogUrl,
      checkLine: str => {
        if (
          !this._fullyStarted &&
          (str.includes("server running") || str.includes("Server listening"))
        ) {
          this._fullyStarted = true;
          // opens menu automatically once after startup
          this._shutdown ||
            setTimeout(() => {
              this.showMenu(true);
            }, 5000);
          this.logTime(`App is ready in dev mode, total time took`);
        }
        return str;
      }
    };

    await this.startServer({
      name: APP_SERVER_NAME,
      tag: this._app,
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

  /**
   * Get the logs of a server the admin manages.
   * name could be:
   *
   *  - "app" - app server
   *  - "wds" - webpack dev server
   *
   * @param name
   * @returns logs in an array of strings
   */
  getLogs(name: string): string[] {
    const info = this.getServer({ app: APP_SERVER_NAME, wds: DEV_SERVER_NAME }[name]);
    if (!info || !info.options) {
      return [`server ${name} doesn't exist`];
    }
    const { logSaver } = info.options;

    return logSaver.store;
  }

  passThruLineOutput(tag, input, output) {
    const reader = readline.createInterface({ input });
    let lineBuffers = [];
    let deferWrite;

    reader.on("line", data => {
      clearTimeout(deferWrite);
      deferWrite = setTimeout(() => {
        output.show(lineBuffers.join("\n"));
        lineBuffers = [];
      }, 500).unref();
      lineBuffers.push(tag + data);
    });

    return reader;
  }

  async startProxyServer(debug = undefined) {
    await this.startServer({
      name: PROXY_SERVER_NAME,
      tag: this._proxy,
      killKey: "O",
      debug,
      exec: Path.join(__dirname, "redbird-spawn"),
      waitStart: async info => {
        info._child.on("message", (data: any) => {
          // this._io.show(ck`<orange>proxy message ${JSON.stringify(data)}</>`, this._appPort);
          if (data.name === "proxy-started" && `${data.appPort}` !== `${this._appPort}`) {
            this.sendMsg(PROXY_SERVER_NAME, {
              appPort: this._appPort,
              name: "restart",
              quiet: true
            });
          }
        });
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
        setTimeout(processPending, 10);
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
      setTimeout(processPending, 10);

      return started;
    };

    const appUpdateHandler = (data: any = {}) => {
      if (data.name === "app-update") {
        // this._io.show(ck`<orange>app-update ${JSON.stringify(data)}</>`);
        if (DEV_PROXY_ENABLED) {
          if (data.appPort) {
            SERVER_ENVS[PROXY_SERVER_NAME].APP_SERVER_PORT = data.appPort;
            this._appPort = data.appPort;
            this.sendMsg(PROXY_SERVER_NAME, { ...data, name: "restart" });
          }
        }
      }
    };

    messageHandler = (data: any = {}) => {
      if (!checkStarted(data)) {
        return;
      }

      if (info._child) {
        info._child.removeListener("message", messageHandler);
        info._child.on("message", appUpdateHandler);
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
      startTimeout = setTimeout(handleTimeout, 20000);
    }

    return defer.promise;
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
      info._watcher = chokidar.watch(info.options.watch, {
        cwd: process.env.XARC_CWD || process.cwd(),
        persistent: true
      });
      info._watcher.on("change", restart);
    }
  }
}

//
