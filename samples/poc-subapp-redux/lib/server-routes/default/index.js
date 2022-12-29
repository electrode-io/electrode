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
}), (0, _template.createElement)("body", null, (0, _template.createElement)("noscript", null, (0, _template.createElement)("h4", null, "JavaScript is Disabled"), (0, _template.createElement)("p", null, "Sorry, this webpage requires JavaScript to function correctly."), (0, _template.createElement)("p", null, "Please enable JavaScript in your browser and reload the page.")), (0, _template.createElement)("div", {
  style: "background: cyan"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  name: "Header",
  _concurrent: true,
  timestamp: true,
  startOnLoad: true,
  elementId: "subapp-header01",
  serverSideRendering: true,
  hydrateServerData: false,
  clientSideRendering: false,
  inlineScript: true
})), (0, _template.createElement)("div", {
  style: "background: green"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  name: "MainBody",
  timestamp: true,
  elementId: "subapp-mainbody",
  useStream: true,
  async: true,
  hydrateServerData: true,
  serverSideRendering: true
})), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  timestamp: true,
  elementId: "subapp-bottom",
  name: "Bottom",
  useStream: true,
  hydrateServerData: true,
  async: true,
  serverSideRendering: true
}), (0, _template.createElement)("div", {
  style: "background: #e8b487; padding: 10px"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  timestamp: true,
  elementId: "subapp-extras",
  name: "Extras",
  async: true
})), (0, _template.createElement)("div", {
  style: "background: #f0a360; padding: 10px"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  timestamp: true,
  elementId: "subapp-suspense-demo",
  name: "SuspenseDemo",
  async: true
})), (0, _template.createElement)("div", {
  style: "background: #e88f41; padding: 10px"
}, (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  timestamp: true,
  elementId: "subapp-suspense-demo-ssr",
  name: "SuspenseDemo",
  hydrateServerData: true,
  async: true,
  serverSideRendering: true,
  suspenseSsr: true
})), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/load",
  _concurrent: true,
  timestamp: true,
  elementId: "subapp-footer",
  name: "Footer",
  async: true,
  serverSideRendering: true
}), (0, _template.createElement)(_template.Require, {
  _id: "subapp-web/lib/start"
})), (0, _template.createElement)(_template.Token, {
  _id: "BODY_CLOSED"
})), (0, _template.createElement)(_template.Token, {
  _id: "HTML_CLOSED"
}));
var _default = Template;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUZW1wbGF0ZSIsIl9fZGlybmFtZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXItcm91dGVzL2RlZmF1bHQvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeCBjcmVhdGVFbGVtZW50ICovXG5cbmltcG9ydCB7IEluZGV4UGFnZSwgY3JlYXRlRWxlbWVudCwgVG9rZW4sIFJlcXVpcmUsIExpdGVyYWwgfSBmcm9tIFwic3ViYXBwLXNlcnZlci90ZW1wbGF0ZVwiO1xuXG5jb25zdCBUZW1wbGF0ZSA9IChcbiAgPEluZGV4UGFnZSBET0NUWVBFPVwiaHRtbFwiPlxuICAgIDxUb2tlbiBfaWQ9XCJJTklUSUFMSVpFXCIgLz5cbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgIDxoZWFkPlxuICAgICAgICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwic3R5bGVzaGVldFwiXG4gICAgICAgICAgaHJlZj1cImh0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzc1wiXG4gICAgICAgIC8+XG4gICAgICAgIDxUb2tlbiBfaWQ9XCJNRVRBX1RBR1NcIiAvPlxuICAgICAgICA8VG9rZW4gX2lkPVwiUEFHRV9USVRMRVwiIC8+XG4gICAgICAgIDxSZXF1aXJlIF9pZD1cInN1YmFwcC13ZWIvbGliL2luaXRcIiAvPlxuXG4gICAgICAgIDxUb2tlbiBfaWQ9XCJDUklUSUNBTF9DU1NcIiAvPlxuXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgICA8TGl0ZXJhbCBmaWxlPXtgJHtfX2Rpcm5hbWV9L3N0eWxlLmNzc2B9IC8+XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICA8L2hlYWQ+XG4gICAgICA8VG9rZW4gX2lkPVwiSEVBRF9DTE9TRURcIiAvPlxuICAgICAgPGJvZHk+XG4gICAgICAgIDxub3NjcmlwdD5cbiAgICAgICAgICA8aDQ+SmF2YVNjcmlwdCBpcyBEaXNhYmxlZDwvaDQ+XG4gICAgICAgICAgPHA+U29ycnksIHRoaXMgd2VicGFnZSByZXF1aXJlcyBKYXZhU2NyaXB0IHRvIGZ1bmN0aW9uIGNvcnJlY3RseS48L3A+XG4gICAgICAgICAgPHA+UGxlYXNlIGVuYWJsZSBKYXZhU2NyaXB0IGluIHlvdXIgYnJvd3NlciBhbmQgcmVsb2FkIHRoZSBwYWdlLjwvcD5cbiAgICAgICAgPC9ub3NjcmlwdD5cblxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogY3lhblwiPlxuICAgICAgICAgIDxSZXF1aXJlXG4gICAgICAgICAgICBfaWQ9XCJzdWJhcHAtd2ViL2xpYi9sb2FkXCJcbiAgICAgICAgICAgIG5hbWU9XCJIZWFkZXJcIlxuICAgICAgICAgICAgX2NvbmN1cnJlbnRcbiAgICAgICAgICAgIHRpbWVzdGFtcFxuICAgICAgICAgICAgc3RhcnRPbkxvYWRcbiAgICAgICAgICAgIGVsZW1lbnRJZD1cInN1YmFwcC1oZWFkZXIwMVwiXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUmVuZGVyaW5nXG4gICAgICAgICAgICBoeWRyYXRlU2VydmVyRGF0YT17ZmFsc2V9XG4gICAgICAgICAgICBjbGllbnRTaWRlUmVuZGVyaW5nPXtmYWxzZX1cbiAgICAgICAgICAgIGlubGluZVNjcmlwdFxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBncmVlblwiPlxuICAgICAgICAgIDxSZXF1aXJlXG4gICAgICAgICAgICBfaWQ9XCJzdWJhcHAtd2ViL2xpYi9sb2FkXCJcbiAgICAgICAgICAgIF9jb25jdXJyZW50XG4gICAgICAgICAgICBuYW1lPVwiTWFpbkJvZHlcIlxuICAgICAgICAgICAgdGltZXN0YW1wXG4gICAgICAgICAgICBlbGVtZW50SWQ9XCJzdWJhcHAtbWFpbmJvZHlcIlxuICAgICAgICAgICAgdXNlU3RyZWFtXG4gICAgICAgICAgICBhc3luY1xuICAgICAgICAgICAgaHlkcmF0ZVNlcnZlckRhdGFcbiAgICAgICAgICAgIHNlcnZlclNpZGVSZW5kZXJpbmdcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8UmVxdWlyZVxuICAgICAgICAgIF9pZD1cInN1YmFwcC13ZWIvbGliL2xvYWRcIlxuICAgICAgICAgIF9jb25jdXJyZW50XG4gICAgICAgICAgdGltZXN0YW1wXG4gICAgICAgICAgZWxlbWVudElkPVwic3ViYXBwLWJvdHRvbVwiXG4gICAgICAgICAgbmFtZT1cIkJvdHRvbVwiXG4gICAgICAgICAgdXNlU3RyZWFtXG4gICAgICAgICAgaHlkcmF0ZVNlcnZlckRhdGFcbiAgICAgICAgICBhc3luY1xuICAgICAgICAgIHNlcnZlclNpZGVSZW5kZXJpbmdcbiAgICAgICAgLz5cblxuICAgICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2U4YjQ4NzsgcGFkZGluZzogMTBweFwiPlxuICAgICAgICAgIDxSZXF1aXJlXG4gICAgICAgICAgICBfaWQ9XCJzdWJhcHAtd2ViL2xpYi9sb2FkXCJcbiAgICAgICAgICAgIF9jb25jdXJyZW50XG4gICAgICAgICAgICB0aW1lc3RhbXBcbiAgICAgICAgICAgIGVsZW1lbnRJZD1cInN1YmFwcC1leHRyYXNcIlxuICAgICAgICAgICAgbmFtZT1cIkV4dHJhc1wiXG4gICAgICAgICAgICBhc3luY1xuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZjBhMzYwOyBwYWRkaW5nOiAxMHB4XCI+XG4gICAgICAgICAgPFJlcXVpcmVcbiAgICAgICAgICAgIF9pZD1cInN1YmFwcC13ZWIvbGliL2xvYWRcIlxuICAgICAgICAgICAgX2NvbmN1cnJlbnRcbiAgICAgICAgICAgIHRpbWVzdGFtcFxuICAgICAgICAgICAgZWxlbWVudElkPVwic3ViYXBwLXN1c3BlbnNlLWRlbW9cIlxuICAgICAgICAgICAgbmFtZT1cIlN1c3BlbnNlRGVtb1wiXG4gICAgICAgICAgICBhc3luY1xuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZTg4ZjQxOyBwYWRkaW5nOiAxMHB4XCI+XG4gICAgICAgICAgPFJlcXVpcmVcbiAgICAgICAgICAgIF9pZD1cInN1YmFwcC13ZWIvbGliL2xvYWRcIlxuICAgICAgICAgICAgX2NvbmN1cnJlbnRcbiAgICAgICAgICAgIHRpbWVzdGFtcFxuICAgICAgICAgICAgZWxlbWVudElkPVwic3ViYXBwLXN1c3BlbnNlLWRlbW8tc3NyXCJcbiAgICAgICAgICAgIG5hbWU9XCJTdXNwZW5zZURlbW9cIlxuICAgICAgICAgICAgaHlkcmF0ZVNlcnZlckRhdGFcbiAgICAgICAgICAgIGFzeW5jXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUmVuZGVyaW5nXG4gICAgICAgICAgICBzdXNwZW5zZVNzclxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxSZXF1aXJlXG4gICAgICAgICAgX2lkPVwic3ViYXBwLXdlYi9saWIvbG9hZFwiXG4gICAgICAgICAgX2NvbmN1cnJlbnRcbiAgICAgICAgICB0aW1lc3RhbXBcbiAgICAgICAgICBlbGVtZW50SWQ9XCJzdWJhcHAtZm9vdGVyXCJcbiAgICAgICAgICBuYW1lPVwiRm9vdGVyXCJcbiAgICAgICAgICBhc3luY1xuICAgICAgICAgIHNlcnZlclNpZGVSZW5kZXJpbmdcbiAgICAgICAgLz5cblxuICAgICAgICA8UmVxdWlyZSBfaWQ9XCJzdWJhcHAtd2ViL2xpYi9zdGFydFwiIC8+XG5cbiAgICAgICAgey8qIDxSZXF1aXJlIF9pZD1cInN1YmFwcC13ZWIvbGliL21vcmUtZGF0YVwiIF9jb25jdXJyZW50IG5hbWU9XCJNYWluQm9keVwiIC8+ICovfVxuICAgICAgPC9ib2R5PlxuICAgICAgPFRva2VuIF9pZD1cIkJPRFlfQ0xPU0VEXCIgLz5cbiAgICA8L2h0bWw+XG4gICAgPFRva2VuIF9pZD1cIkhUTUxfQ0xPU0VEXCIgLz5cbiAgPC9JbmRleFBhZ2U+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZTtcbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBO0FBRkE7O0FBSUEsTUFBTUEsUUFBUSxHQUNaLDZCQUFDLG1CQUFTO0VBQUMsT0FBTyxFQUFDO0FBQU0sR0FDdkIsNkJBQUMsZUFBSztFQUFDLEdBQUcsRUFBQztBQUFZLEVBQUcsRUFDMUI7RUFBTSxJQUFJLEVBQUM7QUFBSSxHQUNiLDJDQUNFO0VBQU0sT0FBTyxFQUFDO0FBQU8sRUFBRyxFQUN4QjtFQUFNLElBQUksRUFBQyxVQUFVO0VBQUMsT0FBTyxFQUFDO0FBQXVDLEVBQUcsRUFDeEU7RUFDRSxHQUFHLEVBQUMsWUFBWTtFQUNoQixJQUFJLEVBQUM7QUFBdUUsRUFDNUUsRUFDRiw2QkFBQyxlQUFLO0VBQUMsR0FBRyxFQUFDO0FBQVcsRUFBRyxFQUN6Qiw2QkFBQyxlQUFLO0VBQUMsR0FBRyxFQUFDO0FBQVksRUFBRyxFQUMxQiw2QkFBQyxpQkFBTztFQUFDLEdBQUcsRUFBQztBQUFxQixFQUFHLEVBRXJDLDZCQUFDLGVBQUs7RUFBQyxHQUFHLEVBQUM7QUFBYyxFQUFHLEVBRTVCLDRDQUNFLDZCQUFDLGlCQUFPO0VBQUMsSUFBSSxFQUFHLEdBQUVDLFNBQVU7QUFBWSxFQUFHLENBQ3JDLENBQ0gsRUFDUCw2QkFBQyxlQUFLO0VBQUMsR0FBRyxFQUFDO0FBQWEsRUFBRyxFQUMzQiwyQ0FDRSwrQ0FDRSxrRUFBK0IsRUFDL0IseUdBQXFFLEVBQ3JFLHdHQUFvRSxDQUMzRCxFQUVYO0VBQUssS0FBSyxFQUFDO0FBQWtCLEdBQzNCLDZCQUFDLGlCQUFPO0VBQ04sR0FBRyxFQUFDLHFCQUFxQjtFQUN6QixJQUFJLEVBQUMsUUFBUTtFQUNiLFdBQVc7RUFDWCxTQUFTO0VBQ1QsV0FBVztFQUNYLFNBQVMsRUFBQyxpQkFBaUI7RUFDM0IsbUJBQW1CO0VBQ25CLGlCQUFpQixFQUFFLEtBQU07RUFDekIsbUJBQW1CLEVBQUUsS0FBTTtFQUMzQixZQUFZO0FBQUEsRUFDWixDQUNFLEVBRU47RUFBSyxLQUFLLEVBQUM7QUFBbUIsR0FDNUIsNkJBQUMsaUJBQU87RUFDTixHQUFHLEVBQUMscUJBQXFCO0VBQ3pCLFdBQVc7RUFDWCxJQUFJLEVBQUMsVUFBVTtFQUNmLFNBQVM7RUFDVCxTQUFTLEVBQUMsaUJBQWlCO0VBQzNCLFNBQVM7RUFDVCxLQUFLO0VBQ0wsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUFBLEVBQ25CLENBQ0UsRUFFTiw2QkFBQyxpQkFBTztFQUNOLEdBQUcsRUFBQyxxQkFBcUI7RUFDekIsV0FBVztFQUNYLFNBQVM7RUFDVCxTQUFTLEVBQUMsZUFBZTtFQUN6QixJQUFJLEVBQUMsUUFBUTtFQUNiLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsS0FBSztFQUNMLG1CQUFtQjtBQUFBLEVBQ25CLEVBRUY7RUFBSyxLQUFLLEVBQUM7QUFBb0MsR0FDN0MsNkJBQUMsaUJBQU87RUFDTixHQUFHLEVBQUMscUJBQXFCO0VBQ3pCLFdBQVc7RUFDWCxTQUFTO0VBQ1QsU0FBUyxFQUFDLGVBQWU7RUFDekIsSUFBSSxFQUFDLFFBQVE7RUFDYixLQUFLO0FBQUEsRUFDTCxDQUNFLEVBRU47RUFBSyxLQUFLLEVBQUM7QUFBb0MsR0FDN0MsNkJBQUMsaUJBQU87RUFDTixHQUFHLEVBQUMscUJBQXFCO0VBQ3pCLFdBQVc7RUFDWCxTQUFTO0VBQ1QsU0FBUyxFQUFDLHNCQUFzQjtFQUNoQyxJQUFJLEVBQUMsY0FBYztFQUNuQixLQUFLO0FBQUEsRUFDTCxDQUNFLEVBRU47RUFBSyxLQUFLLEVBQUM7QUFBb0MsR0FDN0MsNkJBQUMsaUJBQU87RUFDTixHQUFHLEVBQUMscUJBQXFCO0VBQ3pCLFdBQVc7RUFDWCxTQUFTO0VBQ1QsU0FBUyxFQUFDLDBCQUEwQjtFQUNwQyxJQUFJLEVBQUMsY0FBYztFQUNuQixpQkFBaUI7RUFDakIsS0FBSztFQUNMLG1CQUFtQjtFQUNuQixXQUFXO0FBQUEsRUFDWCxDQUNFLEVBRU4sNkJBQUMsaUJBQU87RUFDTixHQUFHLEVBQUMscUJBQXFCO0VBQ3pCLFdBQVc7RUFDWCxTQUFTO0VBQ1QsU0FBUyxFQUFDLGVBQWU7RUFDekIsSUFBSSxFQUFDLFFBQVE7RUFDYixLQUFLO0VBQ0wsbUJBQW1CO0FBQUEsRUFDbkIsRUFFRiw2QkFBQyxpQkFBTztFQUFDLEdBQUcsRUFBQztBQUFzQixFQUFHLENBR2pDLEVBQ1AsNkJBQUMsZUFBSztFQUFDLEdBQUcsRUFBQztBQUFhLEVBQUcsQ0FDdEIsRUFDUCw2QkFBQyxlQUFLO0VBQUMsR0FBRyxFQUFDO0FBQWEsRUFBRyxDQUU5QjtBQUFDLGVBRWFELFFBQVE7QUFBQSJ9