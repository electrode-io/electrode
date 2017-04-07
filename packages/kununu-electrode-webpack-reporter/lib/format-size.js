"use strict";

const formatSize = (size) => {
  if (size <= 0) {
    return "0 bytes";
  }

  const abbreviations = ["bytes", "kB", "MB", "GB"];
  const index = Math.floor(Math.log(size) / Math.log(1000));

  const fSize = +(size / Math.pow(1000, index)).toPrecision(3);
  return `${fSize} ${abbreviations[index]}`;
};

module.exports = formatSize;
