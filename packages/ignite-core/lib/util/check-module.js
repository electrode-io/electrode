"use strict";

/* eslint-disable no-magic-numbers */

const xsh = require("xsh");
const Fs = require("fs");
const Promise = require("bluebird");
const readFile = Promise.promisify(Fs.readFile, Fs);
const writeFile = Promise.promisify(Fs.writeFile, Fs);
const Path = require("path");
const _ = require("lodash");
const semverCompare = require("semver-compare");

const Lib = {};

module.exports = Object.assign(Lib, {
  //
  // check version of a global installed module
  //
  globalInstalled: function(name) {
    return xsh
      .exec(true, `npm ls -g -j -loglevel silent --depth=0 ${name}`)
      .then(ret => _.get(JSON.parse(ret.stdout), ["dependencies", name, "version"], "-"))
      .catch(err => {
        const out = _.get(err, "output.stdout", "").trim();
        if (out === "{}") return "0.0.0";
        throw err;
      });
  },
  //
  // check latest version of a module available on npm registry
  //
  latest: function(name, npmReg) {
    const npmRegFlag = Lib.npmRegistryFlag(npmReg);
    return xsh.exec(true, `npm ${npmRegFlag} show -loglevel silent ${name} version`).then(
      /* istanbul ignore next */
      ret => {
        return ret.stdout.trim();
      }
    );
  },

  npmRegistryFlag: function(reg) {
    return reg ? `-registry=${reg}` : "";
  },

  //
  // check if Date b is a new date compare to Date a
  //
  isNewDate: function(a, b) {
    const by = b.getYear();
    const ay = a.getYear();
    if (by < ay) return false;
    if (by > ay) return true;
    const bm = b.getMonth();
    const am = a.getMonth();
    if (bm < am) return false;
    if (bm > am) return true;
    return b.getDate() > a.getDate();
  },
  //
  // check if semver b is newer than semver a
  //
  isNewVersion: function(a, b) {
    return semverCompare(b, a) === 1;
  },
  //
  // check latest verion of a module on npm registry only once a day
  //
  latestOnceDaily: function(name, path, npmReg) {
    path = path || Path.join(__dirname, `../..`);
    const filename = Path.join(path, `latest_check_${name}.json`);
    return readFile(filename)
      .then(data => JSON.parse(data.toString()))
      .catch(() => {
        return {
          timestamp: 0,
          version: "0.0.0"
        };
      })
      .then(x => {
        if (Lib.isNewDate(new Date(x.timestamp), new Date())) {
          return Lib.latest(name, npmReg).then(version => {
            const toSave = {
              timestamp: Date.now(),
              version
            };
            return writeFile(filename, JSON.stringify(toSave, null, 2))
              .catch(_.noop)
              .then(() => version);
          });
        } else {
          return x.version;
        }
      });
  }
});
