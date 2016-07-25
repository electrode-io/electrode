"use strict";
/**
 * Support outputting Flow annotated files in node_modules wiht flow declaration
 * files as documented in http://flowtype.org/blog/2015/12/01/Version-0.19.0.html
 *
 * Searches all .js|.jsx files in `src` and if it contains a `@flow` pragma,
 * will copy the original contents out to `lib/{file}.js.flow` accordingly.
 */

const IS_VERBOSE = process.argv.some((arg) => arg === "--verbose" || arg === "-v");
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const inputRelativeDir = "src";

/* eslint-disable */
// disable eslint because:
// * it is configured to prefer (...args) over apply, but that is not supported
//   in node v4
// * `console` is disallowed, but we're logging.
function log() {
  if (IS_VERBOSE) {
    console.log.apply(console, arguments);
  }
}
/* eslint-enable */

const getDirWithPWD(dir) {
  return path.join(cwd, dir);
};

const copyFile = (filename) => {
  const libDir = getDirWithPWD("lib")
  const stream = fs.createReadStream(path.join(libDir, filename));
  const destPath = path.join(libDir, filename.replace(/x$/, ""));
  const dest = `${destPath}.flow`;
  log("Copying %s to %s", libDir.replace(cwd, ".") + path.sep + filename, dest.replace(cwd, "."));
  stream.pipe(fs.createWriteStream(dest));
};

const handleFile = (dir) => (filename) => {
  const file = path.join(dir, filename);
  fs.stat(file, (err, stats) => {
    if (err) {
      throw err;
    }

    if (stats.isDirectory()) {
      // handleFile recusively calls copyDir
      copyDir(path.join(dir, filename)); // eslint-disable-line no-use-before-define
    } else if (stats.isFile() && /\.jsx?$/.test(filename)) {
      copyFile(filename);
    }
  });
};

const copyDir = (dir) => {
  const inputDir = getDirWithPWD(dir);
  fs.readdir(inputDir, (err, data) => {
    if (err) {
      throw err;
    }
    data.forEach(handleFile(inputDir));
  });
};

copyDir(inputRelativeDir);


