"use strict";

/* eslint-disable no-magic-numbers, no-console */

const requireAt = require("require-at");
const optionalRequire = require("optional-require")(requireAt(process.cwd()));

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

module.exports = path => {
  return optionalRequire(path, {
    fail: e => failLoadTokenModule(path, e),
    notFound: () => notFoundLoadTokenModule(path)
  });
};
