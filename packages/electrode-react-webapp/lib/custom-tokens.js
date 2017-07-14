"use strict";

/* eslint-disable no-magic-numbers, no-console */

const requireAt = require("require-at");
const optionalRequire = require("optional-require")(requireAt(process.cwd()));
const utils = require("./utils");

const viewTokenModules = {};

const failLoadTokenModule = (m, e) => {
  console.error(
    `error: electrode-react-webapp failed to load module ${m} in view template token`,
    `Error:`,
    e
  );
  return "";
};

const notFoundLoadTokenModule = m => {
  console.error(`error: electrode-react-webapp can't find module ${m} in view template token`);
  return "";
};

module.exports = (token, renderContext) => {
  let tokenMod = viewTokenModules[token];

  if (tokenMod === undefined) {
    const mPath = utils.stripTokenDelimiters(token);
    tokenMod = optionalRequire(mPath, {
      fail: e => failLoadTokenModule(mPath, e),
      notFound: () => notFoundLoadTokenModule(mPath)
    });
    viewTokenModules[token] = tokenMod;
    if (typeof tokenMod === "object") {
      if (tokenMod.setup) {
        tokenMod.setup(renderContext, token);
      }
    } else {
      tokenMod = {
        process: tokenMod
      };
    }
  }

  if (typeof tokenMod.process === "string") {
    return tokenMod.process;
  }

  return tokenMod.process(renderContext, token);
};
