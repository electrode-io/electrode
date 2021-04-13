"use strict";
module.exports = (a, b) => {
    return (Array.isArray(a) && Array.isArray(b))
        ? [].concat(a).concat(b)
        : undefined;
};
//# sourceMappingURL=tail-concat-array-merge.js.map