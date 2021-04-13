"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConcatMethod = void 0;
const head_concat_array_merge_1 = require("./head-concat-array-merge");
const tail_concat_array_merge_1 = require("./tail-concat-array-merge");
const concatArrayMerge = {
    head: head_concat_array_merge_1.default,
    tail: tail_concat_array_merge_1.default,
    no: undefined
};
const getConcatMethod = (method, fallback) => {
    return concatArrayMerge.hasOwnProperty(method)
        ? concatArrayMerge[method]
        : fallback || concatArrayMerge.tail;
};
exports.getConcatMethod = getConcatMethod;
//# sourceMappingURL=concat-method.js.map