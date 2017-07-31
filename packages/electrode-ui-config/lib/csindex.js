/* eslint-disable */
var config = window._app && window._app.config;
module.exports = Object.assign({}, require("./ui-config")(config), {
  ccm: config && config.ccm || {}
});