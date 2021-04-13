"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (a, b) => {
    return (Array.isArray(a) && Array.isArray(b))
        ? [].concat(a).concat(b)
        : undefined;
};
//# sourceMappingURL=tail-concat-array-merge.js.map