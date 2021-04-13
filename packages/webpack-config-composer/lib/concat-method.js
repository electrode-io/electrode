"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const head_concat_array_merge_1 = __importDefault(require("./head-concat-array-merge"));
const tail_concat_array_merge_1 = __importDefault(require("./tail-concat-array-merge"));
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
module.exports = { getConcatMethod };
//# sourceMappingURL=concat-method.js.map