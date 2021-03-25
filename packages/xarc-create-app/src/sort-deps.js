"use strict";

const sortObjKeys = require("./sort-obj-keys");

module.exports = (pkg) => {
  ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].forEach((x) => {
    if (pkg[x]) {
      pkg[x] = sortObjKeys(pkg[x]);
    }
  });
};
