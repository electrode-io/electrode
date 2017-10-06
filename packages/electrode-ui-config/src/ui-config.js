"use strict";

function join(paths) {
  const x = paths.filter(p => p).join("/");

  if (paths[0] === "/" && x === "/") {
    // returning "" for [ "/", "", "", ... ]
    return "";
  }

  return x.match(/^\/+$/) // avoid returning "" for [ "/", "/", ... ]
    ? "/"
    : x.replace(/\/+/g, "/").replace(/\/$/, ""); // remove multiple /'s and trailing /
}

module.exports = function(config) {
  config = config || {};
  const ui = (config && config.ui) || {};
  const basePath = ui.basePath || "";
  const apiPath = ui.apiPath || "/api";
  return {
    ui: ui,
    fullPath: path => join([basePath, path]),
    fullApiPath: path => join([basePath, apiPath, path])
  };
};
