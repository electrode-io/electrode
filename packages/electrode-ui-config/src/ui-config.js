"use strict";

/* eslint-disable no-invalid-this */

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

function reload(data) {
  data = data || {};
  const ui = data.ui || {};
  const basePath = ui.basePath || "";
  const apiPath = ui.apiPath || "/api";
  this.ui = ui;
  this.fullPath = path => join([basePath, path]);
  this.fullApiPath = path => join([basePath, apiPath, path]);
}

module.exports = function(data) {
  const config = {};
  config.reload = reload;
  config.reload(data);
  return config;
};
