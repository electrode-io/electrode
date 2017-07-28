/* eslint-disable */

function join(paths) {
  var x = paths.filter(function (x) {
    return x
  }).join("/");

  if (paths[0] === "/" && x === "/") { // returning "" for [ "/", "", "", ... ]
    return "";
  }

  return x.match(/^\/+$/) ? // avoid returning "" for [ "/", "/", ... ]
    "/"
    : x.replace(/\/+/g, "/").replace(/\/$/, ""); // remove multiple /'s and trailing /
}

module.exports = function (config) {
  config = config || {};
  var ui = config && config.ui || {};
  var expoCookies = config && config.expoCookies || {};
  var basePath = ui.basePath || "";
  var apiPath = ui.apiPath || "/api";
  return {
    ui: ui,
    expoCookies: expoCookies,
    fullPath: function (path) {
      return join([basePath, path]);
    },
    fullApiPath: function (path) {
      return join([basePath, apiPath, path]);
    }
  };
};
