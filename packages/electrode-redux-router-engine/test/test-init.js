/* eslint-disable */
const createStore = require("redux").createStore;

module.exports = function (req) {
  return Promise.resolve(createStore((state) => state, ["test-init"]));
};
