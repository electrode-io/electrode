"use strict";

/* eslint-disable no-console, no-process-exit, complexity */
/* eslint-disable no-magic-numbers, max-len, max-statements, prefer-template */

const Path = require("path");
const _ = require("lodash");
const boxen = require("boxen");
const ck = require("chalker");
const chokidar = require("chokidar");
const readline = require("readline");
const { fork } = require("child_process");

const APP_SERVER_NAME = "your app server";
const DEV_SERVER_NAME = "Electrode webpack dev server";
const PROXY_SERVER_NAME = "Electrode Dev Proxy";

const DEV_PROXY_ENABLED = Boolean(process.env.APP_SERVER_PORT);

class AdminServer {
  constructor(args) {
    this._opts = args.opts;
    this._passThru = args._;
    this._messageId = 1;
    this._saveWebpackReportData = undefined;
    this._servers = {};
  }

  async start() {
    this._wds = ck`<gray.inverse>[wds]</> `;
    this._proxy = ck`<green.inverse>[proxy]</> `;
    this.setupConsoleInterface();
    this.handleUserInput();
    await this.startDevServer();
    await this.startAppServer();
    if (DEV_PROXY_ENABLED) {
      // to debug dev proxy
      // await this.startProxyServer("--inspect-brk");
      await this.startProxyServer();
    }
    setTimeout(() => this.showConsoleMenu(), 100);
  }

  setupConsoleInterface() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
  }

  showConsoleMenu() {
    const proxyItem = DEV_PROXY_ENABLED ? "<magenta>P</> - Restart Dev Proxy " : "";
    const menu = ck`              <green.inverse>   Electrode Dev Admin Console   </>

 <white.inverse>For your app server</>
   <magenta>A</> - Restart <magenta>D</> - <cyan>inspect-brk</> mode <magenta>I</> - <cyan>inspect</> mode <magenta>K</> - Kill&nbsp;
 <white.inverse>For Electrode webpack dev server</>  ${this._wds}
   <magenta>W</> - Restart <magenta>E</> - <cyan>inspect-brk</> mode <magenta>R</> - <cyan>inspect</> mode <magenta>X</> - Kill&nbsp;
 ${proxyItem}<magenta>M</> - Show this menu <magenta>Q</> - Shutdown`;
    console.log(boxen(menu, { margin: { left: 5 } }));
  }

  getServer(name) {
    if (this._servers[name]) return this._servers[name];
    return {};
  }

  handleServerExit(name) {
    const info = this.getServer(name);
    if (info._child) {
      info._child.once("exit", (code, signal) => {
        console.log(ck`<orange>${name} exited code ${code} - signal ${signal}</orange>`);
        info._child = undefined;
        info._starting = false;
      });
    }
  }

  async signal(name, sig) {
    const info = this.getServer(name);
    if (info._child) {
      info._child.kill(sig);
    }
  }

  async kill(name, sig) {
    const info = this.getServer(name);
    if (info._child) {
      const promise = new Promise(resolve => info._child.once("close", resolve));
      info._child.kill(sig);
      await promise;
      info._child = undefined;
      info._starting = false;
    }
  }

  async _getUserInput() {
    return new Promise(resolve => {
      process.stdin.once("keypress", (str, key) => {
        resolve({ str: str && str.toLowerCase(), key });
      });
    });
  }

  async handleUserInput() {
    const { str, key } = await this._getUserInput();
    if (str === "q") {
      console.log(ck`<magenta>admin server exit, shutting down servers</magenta>`);
      if (this._appWatcher) {
        this._appWatcher.close();
      }
      await this.kill(DEV_SERVER_NAME, "SIGINT");
      await this.kill(APP_SERVER_NAME, "SIGINT");
      await this.kill(PROXY_SERVER_NAME, "SIGINT");
      process.exit();
    } else if ((key.ctrl && key.name === "c") || str === "m") {
      // allow user to press ctrl+c to bring up console menu
      this.showConsoleMenu();
    } else if (str === "w") {
      this.startDevServer();
    } else if (str === "e") {
      this.startDevServer("--inspect-brk");
    } else if (str === "r") {
      this.startDevServer("--inspect");
    } else if (str === "x") {
      await this.kill(DEV_SERVER_NAME, "SIGINT");
    } else if (str === "a") {
      this.startAppServer();
    } else if (str === "k") {
      await this.kill(APP_SERVER_NAME, "SIGINT");
    } else if (str === "d") {
      this.startAppServer("--inspect-brk");
    } else if (str === "i") {
      this.startAppServer("--inspect");
    } else if (DEV_PROXY_ENABLED && str === "p") {
      this.signal(PROXY_SERVER_NAME, "SIGHUP");
    }
    process.nextTick(() => this.handleUserInput());
  }

  _handleWebpackReport(data) {
    const appInfo = this.getServer(APP_SERVER_NAME);
    if (appInfo._child) {
      data.id = this._messageId++;
      appInfo._child.send(data);
    } else {
      this._saveWebpackReportData = data;
    }
  }

  async startServer(options) {
    const { name, debug, killKey } = options;

    if (!this._servers[name]) this._servers[name] = {};

    const info = this._servers[name];
    info.options = options;
    info.name = name;

    if (info._starting) {
      console.log(
        ck`<yellow.inverse> Start ${name} already in progress - press<magenta> ${killKey} </>to kill it.</>`
      );
      return;
    }

    info._starting = true;

    //
    // file watcher to restart server in case of change
    //
    if (info._watcher) {
      info._watcher.close();
      info._watcher = undefined;
    }

    const debugMsg = debug ? ` with <cyan>${debug}</>` : "";

    const start = () => {
      const forkOpts = {
        env: Object.assign({}, process.env, { FORCE_COLOR: true, ELECTRODE_ADMIN_SERVER: true }),
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

    const re = info._child ? "Res" : "S";
    console.log(ck`<orange>${re}tarting ${name}${debugMsg}</orange>`);
    await this.kill(name, "SIGINT");

    start();

    if (options.waitStart) {
      await options.waitStart(info);
    }

    info._starting = false;
  }

  async startDevServer(debug) {
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

      return new Promise(resolve => {
        info._child.on("message", data => {
          if (data.name === "webpack-report") {
            this._handleWebpackReport(data);
            resolve();
          }
        });

        info._child.on("exit", () => {
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
        info._child.stdout.on("data", data => {
          process.stdout.write(data);
        });

        info._child.stderr.on("data", data => {
          process.stderr.write(data);
        });

        await this.waitForAppServerStart(info);
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
          process.stdout.write(this._proxy + data);
        });

        info._child.stderr.on("data", data => {
          process.stderr.write(this._proxy + data);
        });
      }
    });
  }

  async waitForAppServerStart(info) {
    let startTimeout;
    let started = false;
    let deferRes;

    const promise = new Promise(resolve => (deferRes = resolve));

    const markStarted = data => {
      if (started) return;
      data = data || {};
      if (data.name === "timeout") {
        console.log(ck`<orange>WARNING: Did not receive start event from \
${info.name} - assuming it started.</>`);
      } else if (data.name !== "app-setup") {
        info._child.once("message", markStarted);
        return;
      } else {
        console.log(ck`<orange>${info.name} started</>`);
      }
      started = true;
      if (startTimeout) clearTimeout(startTimeout);

      setTimeout(() => {
        if (this._saveWebpackReportData && info._child) {
          info._child.send(this._saveWebpackReportData);
        }

        this.watchServer(info.name);
        deferRes();
      }, 100);
    };

    const handleTimeout = () => {
      startTimeout = undefined;
      if (info._child) {
        markStarted({ name: "timeout" });
      }
    };

    info._child.once("exit", () => {
      clearTimeout(startTimeout);
      deferRes();
    });

    info._child.once("message", markStarted);

    if (info.options.noTimeoutCheck !== true) {
      startTimeout = setTimeout(handleTimeout, 5000);
    }

    return promise;
  }

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
