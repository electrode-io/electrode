"use strict";

/* eslint-disable no-process-exit, no-console */

const _ = require("lodash");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs-extra"));
const getFilePaths = Promise.promisify(require("glob"));
const MESSAGES_PATTERN = "./tmp/messages/**/*.json";
const RAW_MESSAGES_DIR = "./dist/";
const RAW_MESSAGES_NAME = "raw-messages.json";

/**
 * @param  {String}  filePath  The file path
 * @param  {String}  name  The file name
 * @param  {Object}  contents  The contents written to the file
 * @return  {Promise}  A promise that resolves when the file has been written
 */
function writeFileAsJSON(filePath, name, contents) {
  return Promise.try(() => JSON.stringify(contents, null, 2)).then(result =>
    fs.writeFileAsync(filePath + name, result)
  );
}

/**
 * @param  {String}  filePath  The file of a file to read
 * @return  {Promise}  A promise that resolves to a POJO with the file's contents
 */
function readFileAsJSON(filePath) {
  return fs.readFileAsync(filePath, "utf8").then(JSON.parse);
}

/**
 * @param  {String}  messageFilesPathPattern  A glob resolving to a collection of paths of files
 *                                            containing messages.
 *                                            see: https://github.com/isaacs/node-glob
 * @return  {Promise}  A promise that resolves to a flat POJO with the default messages extracted
 *                     from all files
 */
function getAllDefaultMessages(messageFilesPathPattern) {
  return getFilePaths(messageFilesPathPattern)
    .map(readFileAsJSON)
    .reduce((previousValue, defaultMessageDescriptors) => {
      defaultMessageDescriptors.forEach(descriptor => {
        previousValue[descriptor.id] = descriptor;
      });
      return previousValue;
    }, {});
}

const writeRawMessages = _.partial(writeFileAsJSON, RAW_MESSAGES_DIR, RAW_MESSAGES_NAME);

const isMain = require.main === module;

function flattenMessagesL10n() {
  return Promise.all([getAllDefaultMessages(MESSAGES_PATTERN), fs.ensureDirAsync(RAW_MESSAGES_DIR)])
    .then(_.first)
    .then(writeRawMessages)
    .then(() => {
      if (isMain) process.exit(0);
    })
    .catch(err => {
      console.log("flatten messages failed", err);
      if (isMain) process.exit(1);
    });
}

module.exports = flattenMessagesL10n;

if (isMain) {
  flattenMessagesL10n();
}
