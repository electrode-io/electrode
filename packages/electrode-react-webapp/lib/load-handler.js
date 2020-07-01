"use strict";

/* eslint-disable no-magic-numbers, no-console */

const Path = require("path");
const requireAt = require("require-at");
const optionalRequire = require("optional-require");

const failLoadTokenModule = (m, e) => {
  console.error(
    `error: electrode-react-webapp failed to load token process module ${m}`,
    `Error:`,
    e
  );
  return () => ({ process: () => `\ntoken process module ${m} failed to load\n` });
};

const notFoundLoadTokenModule = m => {
  console.error(`error: electrode-react-webapp can't find token process module ${m}`);
  return () => ({ process: () => `\ntoken process module ${m} not found\n` });
};

module.exports = (path, tmplDir, customCall) => {
  const tokenMod = optionalRequire(requireAt(Path.resolve(tmplDir || "")))(path, {
    fail: e => failLoadTokenModule(path, e),
    notFound: () => notFoundLoadTokenModule(path)
  });

  if (typeof tokenMod === "function") {
    return tokenMod;
  }
  if (tokenMod.tokenHandler) {
    return tokenMod.tokenHandler;
  }
  if (tokenMod.default) {
    return tokenMod.default;
  }

  if (customCall && tokenMod[customCall]) {
    return tokenMod;
  }
  throw new Error(
    `electrode-react-webapp: token module invalid - should export a function directly \
or as 'default' or 'tokenHandler'`
  );
};
