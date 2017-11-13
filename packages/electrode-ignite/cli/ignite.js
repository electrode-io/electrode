"use strict";

const { PromptMenu, logger } = require("ignite-core");
const Path = require("path");
const Pkg = require("../package.json");
const chalk = require("chalk");

const menuFiles = [
  "check-node-npm",
  // "install-tools",
  "./generator-app",
  "./generator-component",
  "./add-component",
  "./electrode-oss-doc",
  "check-ignite-update",
  "exit"
];

const menu = menuFiles.map(m => {
  m = m.startsWith(".") ? Path.join(`../lib/menu-items`, m) : `ignite-core/lib/menu-items/${m}`;
  return require(m)();
});

const title = `Electrode Ignite ${chalk.magenta(Pkg.version)}`;
const promptMenu = new PromptMenu({
  title,
  menu
});

if (process.argv.length <= 2) {
  promptMenu.show();
} else {
  promptMenu.clap();
}
