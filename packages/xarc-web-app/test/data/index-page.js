"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _template = require("../template");

var _subappWeb = require("subapp-web");

/* @jsx createElement */
const RenderSubApps = (props, context) => {
  const {
    routeOptions
  } = context.user;
  const {
    subApps
  } = routeOptions.__internals;
  return subApps && subApps.length > 0 && (0, _template.createElement)("div", null, ...subApps.map((info, ix) => {
    const {
      subapp,
      options
    } = info;
    const elementId = props.inline ? undefined : `subapp-${subapp.name}-${ix}`;
    return (0, _template.createElement)(_template.Require, Object.assign({
      _concurrent: true,
      elementId,
      timestamp: true,
      useStream: false,
      async: true,
      serverSideRendering: true
    }, options, {
      _id: "subapp-web/lib/load",
      name: subapp.name
    }));
  }));
};

const Template = (0, _template.createElement)(_template.IndexPage, {
  DOCTYPE: "html"
}, (0, _template.createElement)(_template.Token, {
  _id: "INITIALIZE"
}), (0, _template.createElement)("html", {
  lang: "en"
}, (0, _template.createElement)("head", null, (0, _template.createElement)("meta", {
  charset: "UTF-8"
}), (0, _template.createElement)("meta", {
  name: "viewport",
  content: "width=device-width, initial-scale=1.0"
}), (0, _template.createElement)(_subappWeb.ReserveSpot, {
  saveId: "headEntries"
}), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/polyfill"
}), (0, _template.createElement)(_template.Token, {
  _id: "META_TAGS"
}), (0, _template.createElement)(_template.Token, {
  _id: "PAGE_TITLE"
}), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/init"
}), (0, _template.createElement)(_template.Token, {
  _id: "CRITICAL_CSS"
})), (0, _template.createElement)(_template.Token, {
  _id: "HEAD_CLOSED"
}), (0, _template.createElement)("body", null, (0, _template.createElement)("noscript", null, (0, _template.createElement)("h4", null, "JavaScript is Disabled"), (0, _template.createElement)("p", null, "Sorry, this webpage requires JavaScript to function correctly."), (0, _template.createElement)("p", null, "Please enable JavaScript in your browser and reload the page.")), (0, _template.createElement)(RenderSubApps, null), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/start"
})), (0, _template.createElement)(_template.Token, {
  _id: "BODY_CLOSED"
})), (0, _template.createElement)(_template.Token, {
  _id: "HTML_CLOSED"
}));
var _default = Template;
exports.default = _default;
//# sourceMappingURL=index-page.js.map