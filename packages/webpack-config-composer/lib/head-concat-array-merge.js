"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (a, b) => {
    return (Array.isArray(a) && Array.isArray(b))
        ? [].concat(b).concat(a)
        : undefined;
};
//# sourceMappingURL=head-concat-array-merge.js.map