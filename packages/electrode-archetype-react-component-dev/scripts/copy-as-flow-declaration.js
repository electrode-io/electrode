"use strict";

/**
 * Support outputting Flow annotated files in node_modules wiht flow declaration
 * files as documented in http://flowtype.org/blog/2015/12/01/Version-0.19.0.html
 *
 * Searches all .js|.jsx files in `src` and if it contains a `@flow` pragma,
 * will copy the original contents out to `lib/{file}.js.flow` accordingly.
 */

const IS_VERBOSE = process.argv.some(arg => arg === "--verbose" || arg === "-v");
const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const srcRootDir = path.join(cwd, "src");
const destRootDir = path.join(cwd, "lib");
const Bluebird = require("bluebird");
const isMain = require.main === module;
Bluebird.promisifyAll(fs);

// * it is configured to prefer (...args) over apply, but that is not supported
//   in node v4
// * `console` is disallowed, but we're logging.
function log() {
  if (IS_VERBOSE) {
    console.log.apply(console, arguments);
  }
}

const copyFile = filename => {
  const dest = `${filename.replace(srcRootDir, destRootDir).replace(/x$/, "")}.flow`;
  const readStream = fs.createReadStream(filename);
  const writeStream = fs.createWriteStream(dest);

  return new Promise((resolve, reject) => {
    readStream.on("error", reject);
    writeStream.on("error", reject);
    writeStream.on("finish", resolve);
    log(`Copying ${filename} to ${dest}`);
    readStream.pipe(writeStream);
  });
};

const handleFile = filename => {
  return fs
    .statAsync(filename)
    .then(stat => {
      if (stat.isFile() && /\.jsx?$/.test(filename)) {
        return copyFile(filename);
      } else if (stat.isDirectory()) {
        return copyDir(filename);
      }
    })
    .catch(err => {
      console.error(`copy-as-flow-declaration: error caught`, err);
      process.exit(1);
    });
};

const copyDir = async (dir = srcRootDir) => {
  return fs
    .readdirAsync(dir)
    .then(items => {
      return Bluebird.map(
        items,
        item => {
          item = path.resolve(dir, item);
          return handleFile(item);
        },
        { concurrency: 10 }
      );
    })
    .then(() => {})
    .catch(err => {
      console.error(`copy-as-flow-declaration: dir: ${dir}, error caught`, err);
      process.exit(1);
    });
};

if (isMain) {
  copyDir(srcRootDir);
}

module.exports = copyDir;
