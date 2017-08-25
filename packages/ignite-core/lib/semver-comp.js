"use strict";

const DIGIT = 3;

const semverComp = (a, b) => {
  const pa = a.split(".");
  const pb = b.split(".");
  for (let i = 0; i < DIGIT; i++) {
    const na = Number(pa[i]);
    const nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
};

module.exports = semverComp;
