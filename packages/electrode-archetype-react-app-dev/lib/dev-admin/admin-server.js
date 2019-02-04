"use strict";

/* eslint-disable no-console, no-process-exit */
/* eslint-disable no-magic-numbers, max-len, max-statements, prefer-template */

const Path = require("path");
const _ = require("lodash");
const boxen = require("boxen");
const ck = require("chalker");
const chokidar = require("chokidar");
const readline = require("readline");
const { fork } = require("child_process");

class AdminServer {
  constructor(args) {
    this._opts = args.opts;
    this._passThru = args._;
    this._messageId = 1;
    this._saveWebpackReportData = undefined;
    this._firstRun = true;
  }

  async start() {
    this._wds = ck`<gray.inverse>[wds]</> `;
    this.setupConsoleInterface();
    this.handleUserInput();
    await this.startDevServer();
    await this.startAppServer();
  }

  setupConsoleInterface() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
  }

  showConsoleMenu() {
    const menu = ck`              <green.inverse>   Electrode Dev Admin Console   </>

 <white.inverse>For your app server</>
   <magenta>A</> - Restart <magenta>D</> - <cyan>inspect-brk</> mode <magenta>I</> - <cyan>inspect</> mode <magenta>K</> - Kill&nbsp;
 <magenta>W</> - Restart Electrode webpack dev server ${this._wds}
 <magenta>M</> - Show this menu <magenta>Q</> - Shutdown`;
    console.log(boxen(menu, { margin: { left: 5 } }));
  }

  async kill(name, sig) {
    const app = this[name];
    if (app) {
      const promise = new Promise(resolve => app.once("close", resolve));
      app.kill(sig);
      await promise;
      this[name] = undefined;
    }
  }

  async _getUserInput() {
    return new Promise(resolve => {
      process.stdin.once("keypress", (str, key) => {
        resolve({ str, key });
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
      await this.kill("_devServer", "SIGINT");
      await this.kill("_appServer", "SIGINT");
      process.exit();
    } else if ((key.ctrl && key.name === "c") || str === "m") {
      // allow user to press ctrl+c to bring up console menu
      this.showConsoleMenu();
    } else if (str === "w") {
      this.startDevServer();
    } else if (str === "a") {
      this.startAppServer();
    } else if (str === "k") {
      await this.kill("_appServer", "SIGINT");
      this._startingApp = false;
    } else if (str === "d") {
      this.startAppServer("--inspect-brk", true);
    } else if (str === "i") {
      this.startAppServer("--inspect");
    }
    process.nextTick(() => this.handleUserInput());
  }

  _handleWebpackReport(data) {
    if (this._appServer) {
      data.id = this._messageId++;
      this._appServer.send(data);
    } else {
      this._saveWebpackReportData = data;
    }
  }

  async startDevServer() {
    if (this._startingWds) {
      console.log(ck`<yellow.inverse> start webpack dev server already in progress </>`);
      return null;
    }
    this._startingWds = true;
    const start = () => {
      // start webpack dev server
      this._devServer = fork(Path.join(__dirname, "dev-server.js"), {
        execArgv: [],
        env: Object.assign({}, process.env, { FORCE_COLOR: true }),
        silent: true
      });
      const log = (out, data) => {
        data
          .toString()
          .split("\n")
          .map(x => x.trim())
          .filter(x => x)
          .forEach(l => {
            out.write(this._wds + l + "\n");
          });
      };
      this._devServer.stdout.on("data", data => log(process.stdout, data));
      this._devServer.stderr.on("data", data => process.stderr.write(data));
      this.handleAppExit("_devServer", "webpack dev server");
      return new Promise(resolve => {
        this._devServer.on("message", data => {
          if (data.name === "webpack-report") {
            this._startingWds = false;
            this._handleWebpackReport(data);
            resolve();
          }
        });
      });
    };

    const re = this._devServer ? "Res" : "S";
    console.log(ck`<orange>${re}tarting Electrode webpack dev server</orange>`);
    await this.kill("_devServer", "SIGINT");
    return start();
  }

  handleAppExit(name, desc) {
    const app = this[name];
    if (app) {
      app.once("exit", (code, signal) => {
        console.log(ck`<orange>${desc} exited code ${code} - signal ${signal}</orange>`);
        this[name] = undefined;
      });
    }
  }

  async startAppServer(debug, noTimeoutCheck) {
    if (this._startingApp) {
      console.log(
        ck`<yellow.inverse> start app server already in progress - press<magenta> K </>to kill it.</>`
      );
      return null;
    }
    this._startingApp = true;
    if (this._appWatcher) {
      this._appWatcher.close();
      this._appWatcher = undefined;
    }
    this._appDebug = debug;
    const debugMsg = debug ? ` with <cyan>${debug}</>` : "";
    // start app server
    const start = () => {
      const opts = {
        env: Object.assign({}, process.env, { FORCE_COLOR: true, ELECTRODE_ADMIN_SERVER: true }),
        args: this._passThru,
        silent: true
      };

      if (debug) {
        opts.execArgv = [debug];
      } else {
        opts.execArgv = [];
      }

      let startTimeout;
      let started = false;

      const markStarted = data => {
        if (startTimeout) clearTimeout(startTimeout);
        if (started) return;
        data = data || {};
        if (data.name === "timeout") {
          console.log(
            ck`<orange>WARNING: Did not receive start event from app server - assuming it started.</>`
          );
        } else if (data.name !== "app-setup") {
          console.log(ck`<red>ERROR: First event from app '${data.name}' is not 'app-setup'</>`);
        } else {
          console.log(ck`<orange>app server started</>`);
        }
        started = true;

        setTimeout(() => {
          if (this._saveWebpackReportData && this._appServer) {
            this._appServer.send(this._saveWebpackReportData);
          }
          this._startingApp = false;
          if (this._firstRun) {
            this._firstRun = false;
            setTimeout(() => this.showConsoleMenu(), 100);
          }
          this.watchAppServer();
        }, 100);
      };

      const handleTimeout = () => {
        startTimeout = undefined;
        if (this._appServer) {
          markStarted({ name: "timeout" });
        }
      };

      this._appServer = fork(this._opts.exec, opts);
      this._appServer.once("message", markStarted);
      if (noTimeoutCheck !== true) {
        startTimeout = setTimeout(handleTimeout, 5000);
      }
      this._appServer.stdout.on("data", data => {
        process.stdout.write(data);
      });
      this._appServer.stderr.on("data", data => {
        process.stderr.write(data);
      });
      this.handleAppExit("_appServer", "app server");
    };

    const re = this._appServer ? "Res" : "S";
    console.log(ck`<orange>${re}tarting your app server${debugMsg}</orange>`);
    await this.kill("_appServer", "SIGINT");
    return start();
  }

  watchAppServer() {
    let timer;

    const restart = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!this._startingApp) {
          this.startAppServer();
        }
      }, 500);
    };

    if (!this._appWatcher && !_.isEmpty(this._opts.watch)) {
      this._appWatcher = chokidar.watch(this._opts.watch, { cwd: process.cwd() });
      this._appWatcher.on("change", restart);
    }
  }
}

module.exports = AdminServer;
