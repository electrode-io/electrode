"use strict";

/* eslint-disable max-len */

// sample npm error output

/*

npm ERR! Windows_NT 10.0.14393
npm ERR! argv "C:\\Program Files\\nodejs\\node.exe" "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" "install" "-g" "electrode-ignite@0.1.11"
npm ERR! node v6.10.0
npm ERR! npm  v3.10.10
npm ERR! path C:\Users\test\AppData\Roaming\npm\node_modules\electrode-ignite
npm ERR! code EBUSY
npm ERR! errno -4082
npm ERR! syscall rmdir

npm ERR! EBUSY: resource busy or locked, rmdir 'C:\Users\test\AppData\Roaming\npm\node_modules\electrode-ignite'
npm ERR!
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>

npm ERR! Please include the following file with any support request:
npm ERR!     C:\Users\test\dev\npm-debug.log

*/

const { showNpmErr } = require("../../../lib/util/helpers");
const expect = require("chai").expect;
const chalk = require("chalk");

describe("showNpmErr", function() {
  it("should log errors", () => {
    chalk.enabled = true;
    expect(showNpmErr).to.exist;
    const err = new Error("test");
    err.output = {
      stdout: "",
      stderr: `npm ERR! code EBUSY
npm ERR! errno -4082
npm ERR! syscall rmdir`
    };
    showNpmErr(err);
    chalk.enabled = false;
  });
});
