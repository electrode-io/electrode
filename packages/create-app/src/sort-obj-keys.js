"use strict";

const _ = require("lodash");

const sortObjKeys = obj => {
  return _(obj).toPairs().sortBy(0).fromPairs().value();
};

module.exports = sortObjKeys;
