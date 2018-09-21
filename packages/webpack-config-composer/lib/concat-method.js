"use strict";

const headConcatArrayMerge = require("./head-concat-array-merge");
const tailConcatArrayMerge = require("./tail-concat-array-merge");

const concatArrayMerge = {
  head: headConcatArrayMerge,
  tail: tailConcatArrayMerge,
  no: undefined
};

const getConcatMethod = (method, fallback) => {
  return concatArrayMerge.hasOwnProperty(method)
    ? concatArrayMerge[method]
    : fallback || concatArrayMerge.tail;
};

module.exports = { getConcatMethod };
