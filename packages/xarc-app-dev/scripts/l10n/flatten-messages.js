/* eslint-disable */
"use strict";

/* eslint-disable no-process-exit, no-console */

const _ = require("lodash");
const Util = require("util");
const Fs = require("fs-extra");
const getFilePaths = Util.promisify(require("glob"));
const MESSAGES_PATTERN = "./tmp/messages/**/*.json";
const RAW_MESSAGES_DIR = "./dist/";
const RAW_MESSAGES_NAME = "raw-messages.json";
const xaa = require("xaa");

/**
 * @param  {String}  filePath  The file path
 * @param  {String}  name  The file name
 * @param  {Object}  contents  The contents written to the file
 * @return  {Promise}  A promise that resolves when the file has been written
 */
async function writeFileAsJSON(filePath, name, contents) {
  const result = JSON.stringify(contents, null, 2);
  await Fs.writeFile(filePath + name, result);
}

/**
 * @param  {String}  filePath  The file of a file to read
 * @return  {Promise}  A promise that resolves to a POJO with the file's contents
 */
function readFileAsJSON(filePath) {
  return Fs.readFile(filePath, "utf8").then(JSON.parse);
}

/**
 * @param  {String}  messageFilesPathPattern  A glob resolving to a collection of paths of files
 *                                            containing messages.
 *                                            see: https://github.com/isaacs/node-glob
 * @return  {Promise}  A promise that resolves to a flat POJO with the default messages extracted
 *                     from all files
 */
async function getAllDefaultMessages(messageFilesPathPattern) {
  const fileJsons = await xaa.map(await getFilePaths(messageFilesPathPattern), readFileAsJSON);
  return fileJsons.reduce((previousValue, defaultMessageDescriptors) => {
    defaultMessageDescriptors.forEach(descriptor => {
      previousValue[descriptor.id] = descriptor;
    });
    return previousValue;
  }, {});
}

const writeRawMessages = _.partial(writeFileAsJSON, RAW_MESSAGES_DIR, RAW_MESSAGES_NAME);

const isMain = require.main === module;

function flattenMessagesL10n() {
  return Promise.all([getAllDefaultMessages(MESSAGES_PATTERN), Fs.ensureDir(RAW_MESSAGES_DIR)])
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
