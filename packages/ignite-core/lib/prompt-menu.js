"use strict";

/* eslint-disable no-console, no-magic-numbers */

const xsh = require("xsh");
const chalk = require("chalk");
const readline = require("readline");
const _ = require("lodash");
const EventEmitter = require("events");
const Promise = require("bluebird");
const helpers = require("./util/helpers");
const NixClap = require("nix-clap");
const logger = require("./util/logger");

xsh.Promise = Promise;

class PromptMenu extends EventEmitter {
  constructor(options) {
    super();

    this._title = options.title;
    this._menu = options.menu;
    this._exitCb = options.exitCb || process.exit;
    this._output = options.output || console.log;
    this._progName = options.progName || "ignite";
    this._clap = false;

    const refresh = () => {
      if (this._idle) {
        this._output("");
        this.show();
      }
    };

    this.on("exit", () => {
      this._exit = true;
      setTimeout(() => this._exitCb(0), 10);
    });

    this.on("done", () => {
      this._exit = true;
    });

    this.on("refresh", refresh);

    this.on("skip_prompt", () => {
      this._skipPrompt = true;
    });

    this.on("refresh_prompt", () => this.refreshPrompt());
  }

  getRL() {
    if (this.rl) {
      this.rl.close();
    }
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Please select your option: "
    });
    return this.rl;
  }

  closeRL() {
    if (this.rl) {
      this.rl.close();
      this.rl = undefined;
    }
  }

  refreshPrompt() {
    if (this.rl && this._idle) this.rl.prompt(true);
  }

  waitInput() {
    const rl = this.getRL();
    rl.prompt();
    rl.on("line", answer => {
      this.closeRL();
      answer = answer.trim();
      const choice = parseInt(answer);
      if (choice >= 1 && choice <= this._menu.length) {
        this._output("You chose", answer);
        this.runMenuItem(this._menu[choice - 1]);
      } else {
        logger.log(`Invalid input ${answer}.  Please pick from 1 to ${this._menu.length}`);
        this.show();
      }
    });
  }

  show() {
    this.closeRL();
    this._skipPrompt = false;
    const colors = ["magenta", "green"];

    _.each(this._menu, mi => {
      mi.emit("pre_show", { menu: this });
    });

    if (this._skipPrompt) return;
    const dashedLines = `---------------------------------------------------------`;
    this._output(chalk.blueBright(dashedLines));
    this._output(chalk.blueBright(this._title));
    this._output(chalk.blueBright(dashedLines));

    _.each(this._menu, (mi, x) => {
      const icon = mi.icon || "";
      this._output(chalk[colors[x % 2]](`[${x + 1}] ${icon} ${mi.menuText}`));
      mi.index = x + 1;
      mi.emit("show", { menu: this });
    });
    this._output(chalk.blueBright(dashedLines));

    this._idle = true;

    this.waitInput();

    _.each(this._menu, mi => {
      mi.emit("post_show", { menu: this });
    });
  }

  clap(argv) {
    this._clap = true;
    const commands = _.reduce(
      this._menu,
      (cliCmds, mi) => {
        if (!mi.cliCmd) return cliCmds;

        const menuText = chalk.cyan(mi.menuText);
        cliCmds[mi.cliCmd] = {
          desc: menuText,
          aliases: mi.cliAliases,
          exec: () => {
            logger.log(this._title);
            logger.log(`Running ${menuText}`);
            return this.runMenuItem(mi);
          }
        };

        return cliCmds;
      },
      {}
    );

    return new NixClap({})
      .usage(`Usage: ${this._progName} <command>`)
      .init(null, commands)
      .parse(argv);
  }

  runMenuItem(item) {
    this._idle = false;

    const spinner = item.spinnerTitle
      ? helpers.makeSpinner(item.spinnerTitle)
      : { start: _.noop, stop: _.noop };

    const show = () => {
      if (!this._exit && !this._clap) {
        this.show();
      }
    };

    spinner.start();
    return Promise.try(() => item.execute({ menu: this }))
      .then(() => {
        spinner.stop();
        item.emit("post_execute");
        // don't show menu in clap mode
        if (!this._clap) {
          if (item.noPause) {
            show();
          } else {
            helpers.pausePrompt().then(show);
          }
        }
      })
      .finally(() => spinner.stop());
  }
}

module.exports = PromptMenu;
