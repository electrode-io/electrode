"use strict";

const PromptMenu = require("../lib/prompt-menu");
const Path = require("path");

const menuFiles = ["check-node-npm", "install-tools", "check-ignite-update", "exit"];

const menu = menuFiles.map(m => {
  m = Path.join(`../lib/menu-items`, m);
  return require(m)();
});

const promptMenu = new PromptMenu({
  title: "Electrode Ignite",
  menu
});

if (process.argv.length <= 2) {
  promptMenu.show();
} else {
  promptMenu.clap();
}
