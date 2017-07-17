"use strict";

/* eslint-disable no-magic-numbers, no-console */

const _ = require("lodash");
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
  }

  let replacePromise;
  if (_.isFunction(tokenMod)) {
    replacePromise = tokenMod(renderContext, token);
    if (!utils.isPromise(replacePromise)) {
      return Promise.reject(
        new Error(`The function exported by ${token} does not return a Promise.`)
      );
    }
  } else {
    replacePromise = Promise.resolve((tokenMod || "").toString());
  }

  return replacePromise.then(value => value || "");
};
