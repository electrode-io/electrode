import jsonTree from "./json-tree";

export const parseBundle = (bundles) => bundles ? bundles && bundles[0] : null;

export const getStats = function (bundles) {
  if (Array.isArray(bundles)) {
    return parseBundle(bundles);
  } else {
    throw new Error("**** Pass the stats.json as per instructions electrify -h ****");
  }
};

export const bundle = function (bundles, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = {};
  }
  opts = opts || {};
  callback = callback || function () {};

  let data = {};
  data.mode = opts.mode || "size";
  data = JSON.stringify(jsonTree(getStats([bundles])));
  return callback(null, {data});
};
