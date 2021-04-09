"use strict";

import headConcatArrayMerge from "./head-concat-array-merge";
import tailConcatArrayMerge from "./tail-concat-array-merge";

const concatArrayMerge = {
  head: headConcatArrayMerge,
  tail: tailConcatArrayMerge,
  no: undefined
};

export const getConcatMethod = (method, fallback) => {
  return concatArrayMerge.hasOwnProperty(method)
    ? concatArrayMerge[method]
    : fallback || concatArrayMerge.tail;
};
