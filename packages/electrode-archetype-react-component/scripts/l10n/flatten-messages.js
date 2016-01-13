const _ = require("lodash");
const Promise = require("bluebird");

const fs = Promise.promisifyAll(require("fs"));
const getFilePaths = Promise.promisify(require("glob"));
const createDirectory = Promise.promisify(require("mkdirp"));

const MESSAGES_PATTERN = "./lib/tmp/messages/**/*.json";
const RAW_MESSAGES_DIR = "./lib/";
const RAW_MESSAGES_NAME = "raw-messages.json";

/**
 * @param  {String}  filePath  The file path
 * @param  {String}  name  The file name
 * @param  {Object}  contents  The contents written to the file
 * @return  {Promise}  A promise that resolves when the file has been written
 */
const writeFileAsJSON = function writeFileAsJSON(filePath, name, contents) {
  return Promise.try(() => JSON.stringify(contents, null, 2))
    .then((result) => fs.writeFileAsync(filePath + name, result));
};

/**
 * @param  {String}  filePath  The file of a file to read
 * @return  {Promise}  A promise that resolves to a POJO with the file's contents
 */
const readFileAsJSON = function readFileAsJSON(filePath) {
  return fs.readFileAsync(filePath, "utf8")
    .then(JSON.parse);
};

/**
 * @param  {String}  messageFilesPathPattern  A glob resolving to a collection of paths of files
 *                                            containing messages.
 *                                            see: https://github.com/isaacs/node-glob
 * @return  {Promise}  A promise that resolves to a flat POJO with the default messages extracted
 *                     from all files
 */
const getAllDefaultMessages = function getAllDefaultMessages(messageFilesPathPattern) {
  return getFilePaths(messageFilesPathPattern)
    .map(readFileAsJSON)
    .reduce((previousValue, defaultMessageDescriptors) => {
      defaultMessageDescriptors.forEach((descriptor) => previousValue[descriptor.id] = descriptor);
      return previousValue;
    }, {});
};

const writeRawMessages = _.partial(writeFileAsJSON, RAW_MESSAGES_DIR, RAW_MESSAGES_NAME);

Promise.all([
  getAllDefaultMessages(MESSAGES_PATTERN),
  createDirectory(RAW_MESSAGES_DIR)
])
  .then(_.first)
  .then(writeRawMessages)
  .then(() => { process.exit(0); })
  .catch(() => { process.exit(1); });
