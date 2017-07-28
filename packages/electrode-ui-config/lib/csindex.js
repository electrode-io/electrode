/* eslint-disable */
var config = window._wml && window._wml.config;
module.exports = Object.assign({}, require("./ui-config")(config), {
  ccm: config && config.ccm || {}
});