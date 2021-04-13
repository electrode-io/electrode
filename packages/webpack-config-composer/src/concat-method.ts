

import headConcatArrayMerge from "./head-concat-array-merge";
import tailConcatArrayMerge from "./tail-concat-array-merge";

const concatArrayMerge = {
  head: headConcatArrayMerge,
  tail: tailConcatArrayMerge,
  no: undefined
};

const getConcatMethod: any = (method: any, fallback: any) => {
  return concatArrayMerge.hasOwnProperty(method)
    ? concatArrayMerge[method]
    : fallback || concatArrayMerge.tail;
};

export = { getConcatMethod };
