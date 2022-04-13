"use strict";

exports.__esModule = true;
exports.default = void 0;

var _template = require("subapp-server/template");

/* @jsx createElement */
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
}), (0, _template.createElement)("link", {
  rel: "stylesheet",
  href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
}), (0, _template.createElement)(_template.Token, {
  _id: "META_TAGS"
}), (0, _template.createElement)(_template.Token, {
  _id: "PAGE_TITLE"
}), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/init"
}), (0, _template.createElement)(_template.Token, {
  _id: "CRITICAL_CSS"
}), (0, _template.createElement)("style", null, (0, _template.createElement)(_template.Literal, {
  file: `${__dirname}/style.css`
}))), (0, _template.createElement)(_template.Token, {
  _id: "HEAD_CLOSED"
}), (0, _template.createElement)("body", null, (0, _template.createElement)("noscript", null, (0, _template.createElement)("h4", null, "JavaScript is Disabled"), (0, _template.createElement)("p", null, "Sorry, this webpage requires JavaScript to function correctly."), (0, _template.createElement)("p", null, "Please enable JavaScript in your browser and reload the page.")), (0, _template.createElement)("h1", {
  style: "text-align: center; background: #143F6B; margin:0;color: white; padding: 20px;"
}, "React v18 based SubApp Version 1"), (0, _template.createElement)("div", {
  style: "background: #F55353; padding: 10px"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  name: "Header",
  _concurrent: true,
  timestamp: true,
  startOnLoad: true,
  elementId: "subapp-header",
  serverSideRendering: true,
  inlineScript: true
})), (0, _template.createElement)("div", {
  style: "background: #FEB139; padding: 10px"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  name: "MainBody",
  timestamp: true,
  elementId: "subapp-mainbody",
  async: true,
  serverSideRendering: true
})), (0, _template.createElement)("div", {
  style: "background: #F6F54D; padding: 10px"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  timestamp: true,
  elementId: "subapp-footer",
  name: "Footer",
  async: true,
  serverSideRendering: true
})), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/start"
})), (0, _template.createElement)(_template.Token, {
  _id: "BODY_CLOSED"
})), (0, _template.createElement)(_template.Token, {
  _id: "HTML_CLOSED"
}));
var _default = Template;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUZW1wbGF0ZSIsIl9fZGlybmFtZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXItcm91dGVzL2RlZmF1bHQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeCBjcmVhdGVFbGVtZW50ICovXG5cbmltcG9ydCB7IEluZGV4UGFnZSwgY3JlYXRlRWxlbWVudCwgVG9rZW4sIFJlcXVpcmUsIExpdGVyYWwgfSBmcm9tIFwic3ViYXBwLXNlcnZlci90ZW1wbGF0ZVwiO1xuXG5jb25zdCBUZW1wbGF0ZSA9IChcbiAgPEluZGV4UGFnZSBET0NUWVBFPVwiaHRtbFwiPlxuICAgIDxUb2tlbiBfaWQ9XCJJTklUSUFMSVpFXCIgLz5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgIDxoZWFkPlxuICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzc1wiXG4gICAgICAgIC8+XG4gICAgICAgIDxUb2tlbiBfaWQ9XCJNRVRBX1RBR1NcIiAvPlxuICAgICAgICA8VG9rZW4gX2lkPVwiUEFHRV9USVRMRVwiIC8+XG4gICAgICAgIDxSZXF1aXJlIF9pZD1cInN1YmFwcC13ZWIvbGliL2luaXRcIiAvPlxuXG4gICAgICAgIDxUb2tlbiBfaWQ9XCJDUklUSUNBTF9DU1NcIiAvPlxuXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgICA8TGl0ZXJhbCBmaWxlPXtgJHtfX2Rpcm5hbWV9L3N0eWxlLmNzc2B9IC8+XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8VG9rZW4gX2lkPVwiSEVBRF9DTE9TRURcIiAvPlxuICAgICAgPGJvZHk+XG4gICAgICAgIDxub3NjcmlwdD5cbiAgICAgICAgICA8aDQ+SmF2YVNjcmlwdCBpcyBEaXNhYmxlZDwvaDQ+XG4gICAgICAgICAgPHA+U29ycnksIHRoaXMgd2VicGFnZSByZXF1aXJlcyBKYXZhU2NyaXB0IHRvIGZ1bmN0aW9uIGNvcnJlY3RseS48L3A+XG4gICAgICAgICAgPHA+UGxlYXNlIGVuYWJsZSBKYXZhU2NyaXB0IGluIHlvdXIgYnJvd3NlciBhbmQgcmVsb2FkIHRoZSBwYWdlLjwvcD5cbiAgICAgICAgPC9ub3NjcmlwdD5cblxuICAgICAgICA8aDEgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7IGJhY2tncm91bmQ6ICMxNDNGNkI7IG1hcmdpbjowO2NvbG9yOiB3aGl0ZTsgcGFkZGluZzogMjBweDtcIj5cbiAgICAgICAgICBSZWFjdCB2MTggYmFzZWQgU3ViQXBwIFZlcnNpb24gMVxuICAgICAgICA8L2gxPlxuXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjRjU1MzUzOyBwYWRkaW5nOiAxMHB4XCI+XG4gICAgICAgICAgPFJlcXVpcmVcbiAgICAgICAgICAgIF9pZD1cInN1YmFwcC13ZWIvbGliL2xvYWRcIlxuICAgICAgICAgICAgbmFtZT1cIkhlYWRlclwiXG4gICAgICAgICAgICBfY29uY3VycmVudFxuICAgICAgICAgICAgdGltZXN0YW1wXG4gICAgICAgICAgICBzdGFydE9uTG9hZFxuICAgICAgICAgICAgZWxlbWVudElkPVwic3ViYXBwLWhlYWRlclwiXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUmVuZGVyaW5nXG4gICAgICAgICAgICBpbmxpbmVTY3JpcHRcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI0ZFQjEzOTsgcGFkZGluZzogMTBweFwiPlxuICAgICAgICAgIDxSZXF1aXJlXG4gICAgICAgICAgICBfaWQ9XCJzdWJhcHAtd2ViL2xpYi9sb2FkXCJcbiAgICAgICAgICAgIF9jb25jdXJyZW50XG4gICAgICAgICAgICBuYW1lPVwiTWFpbkJvZHlcIlxuICAgICAgICAgICAgdGltZXN0YW1wXG4gICAgICAgICAgICBlbGVtZW50SWQ9XCJzdWJhcHAtbWFpbmJvZHlcIlxuICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgIHNlcnZlclNpZGVSZW5kZXJpbmdcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI0Y2RjU0RDsgcGFkZGluZzogMTBweFwiPlxuICAgICAgICAgIDxSZXF1aXJlXG4gICAgICAgICAgICBfaWQ9XCJzdWJhcHAtd2ViL2xpYi9sb2FkXCJcbiAgICAgICAgICAgIF9jb25jdXJyZW50XG4gICAgICAgICAgICB0aW1lc3RhbXBcbiAgICAgICAgICAgIGVsZW1lbnRJZD1cInN1YmFwcC1mb290ZXJcIlxuICAgICAgICAgICAgbmFtZT1cIkZvb3RlclwiXG4gICAgICAgICAgICBhc3luY1xuICAgICAgICAgICAgc2VydmVyU2lkZVJlbmRlcmluZ1xuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxSZXF1aXJlIF9pZD1cInN1YmFwcC13ZWIvbGliL3N0YXJ0XCIgLz5cbiAgICAgIDwvYm9keT5cbiAgICAgIDxUb2tlbiBfaWQ9XCJCT0RZX0NMT1NFRFwiIC8+XG4gICAgPC9odG1sPlxuICAgIDxUb2tlbiBfaWQ9XCJIVE1MX0NMT1NFRFwiIC8+XG4gIDwvSW5kZXhQYWdlPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGU7XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7O0FBRkE7QUFJQSxNQUFNQSxRQUFRLEdBQ1osNkJBQUMsbUJBQUQ7RUFBVyxPQUFPLEVBQUM7QUFBbkIsR0FDRSw2QkFBQyxlQUFEO0VBQU8sR0FBRyxFQUFDO0FBQVgsRUFERixFQUVFO0VBQU0sSUFBSSxFQUFDO0FBQVgsR0FDRSwyQ0FDRTtFQUFNLE9BQU8sRUFBQztBQUFkLEVBREYsRUFFRTtFQUFNLElBQUksRUFBQyxVQUFYO0VBQXNCLE9BQU8sRUFBQztBQUE5QixFQUZGLEVBR0U7RUFDRSxHQUFHLEVBQUMsWUFETjtFQUVFLElBQUksRUFBQztBQUZQLEVBSEYsRUFPRSw2QkFBQyxlQUFEO0VBQU8sR0FBRyxFQUFDO0FBQVgsRUFQRixFQVFFLDZCQUFDLGVBQUQ7RUFBTyxHQUFHLEVBQUM7QUFBWCxFQVJGLEVBU0UsNkJBQUMsaUJBQUQ7RUFBUyxHQUFHLEVBQUM7QUFBYixFQVRGLEVBV0UsNkJBQUMsZUFBRDtFQUFPLEdBQUcsRUFBQztBQUFYLEVBWEYsRUFhRSw0Q0FDRSw2QkFBQyxpQkFBRDtFQUFTLElBQUksRUFBRyxHQUFFQyxTQUFVO0FBQTVCLEVBREYsQ0FiRixDQURGLEVBa0JFLDZCQUFDLGVBQUQ7RUFBTyxHQUFHLEVBQUM7QUFBWCxFQWxCRixFQW1CRSwyQ0FDRSwrQ0FDRSxrRUFERixFQUVFLHlHQUZGLEVBR0Usd0dBSEYsQ0FERixFQU9FO0VBQUksS0FBSyxFQUFDO0FBQVYsc0NBUEYsRUFXRTtFQUFLLEtBQUssRUFBQztBQUFYLEdBQ0UsNkJBQUMsaUJBQUQ7RUFDRSxHQUFHLEVBQUMscUJBRE47RUFFRSxJQUFJLEVBQUMsUUFGUDtFQUdFLFdBQVcsTUFIYjtFQUlFLFNBQVMsTUFKWDtFQUtFLFdBQVcsTUFMYjtFQU1FLFNBQVMsRUFBQyxlQU5aO0VBT0UsbUJBQW1CLE1BUHJCO0VBUUUsWUFBWTtBQVJkLEVBREYsQ0FYRixFQXdCRTtFQUFLLEtBQUssRUFBQztBQUFYLEdBQ0UsNkJBQUMsaUJBQUQ7RUFDRSxHQUFHLEVBQUMscUJBRE47RUFFRSxXQUFXLE1BRmI7RUFHRSxJQUFJLEVBQUMsVUFIUDtFQUlFLFNBQVMsTUFKWDtFQUtFLFNBQVMsRUFBQyxpQkFMWjtFQU1FLEtBQUssTUFOUDtFQU9FLG1CQUFtQjtBQVByQixFQURGLENBeEJGLEVBb0NFO0VBQUssS0FBSyxFQUFDO0FBQVgsR0FDRSw2QkFBQyxpQkFBRDtFQUNFLEdBQUcsRUFBQyxxQkFETjtFQUVFLFdBQVcsTUFGYjtFQUdFLFNBQVMsTUFIWDtFQUlFLFNBQVMsRUFBQyxlQUpaO0VBS0UsSUFBSSxFQUFDLFFBTFA7RUFNRSxLQUFLLE1BTlA7RUFPRSxtQkFBbUI7QUFQckIsRUFERixDQXBDRixFQWdERSw2QkFBQyxpQkFBRDtFQUFTLEdBQUcsRUFBQztBQUFiLEVBaERGLENBbkJGLEVBcUVFLDZCQUFDLGVBQUQ7RUFBTyxHQUFHLEVBQUM7QUFBWCxFQXJFRixDQUZGLEVBeUVFLDZCQUFDLGVBQUQ7RUFBTyxHQUFHLEVBQUM7QUFBWCxFQXpFRixDQURGO2VBOEVlRCxRIn0=