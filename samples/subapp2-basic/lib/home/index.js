"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.subapp = exports.Demo1 = void 0;

var _react = require("@xarc/react");

var _electrode = _interopRequireDefault(require("../../static/electrode.png"));

var _message = require("./message");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Demo1 = (0, _react.createDynamicComponent)({
  name: "demo1",
  getModule: () => Promise.resolve().then(() => _interopRequireWildcard(require("../demo1")))
}, {
  ssr: true
});
exports.Demo1 = Demo1;

const Home = props => {
  return /*#__PURE__*/_react.React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.React.createElement("h1", null, /*#__PURE__*/_react.React.createElement("a", {
    href: "https://www.electrode.io"
  }, "Electrode ", /*#__PURE__*/_react.React.createElement("img", {
    src: _electrode.default
  }))), /*#__PURE__*/_react.React.createElement("p", null, _message.message), /*#__PURE__*/_react.React.createElement("p", null, "props: ", JSON.stringify(props)), /*#__PURE__*/_react.React.createElement("h1", null, "Demo1 subapp as a dynamic component in Home"), /*#__PURE__*/_react.React.createElement(Demo1, null));
};

const subapp = {
  Component: Home,
  wantFeatures: [(0, _react.staticPropsFeature)({
    serverModule: require.resolve("./static-props")
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZW1vMSIsImNyZWF0ZUR5bmFtaWNDb21wb25lbnQiLCJuYW1lIiwiZ2V0TW9kdWxlIiwic3NyIiwiSG9tZSIsInByb3BzIiwidGV4dEFsaWduIiwiZWxlY3Ryb2RlUG5nIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJhcHAiLCJDb21wb25lbnQiLCJ3YW50RmVhdHVyZXMiLCJzdGF0aWNQcm9wc0ZlYXR1cmUiLCJzZXJ2ZXJNb2R1bGUiLCJyZXF1aXJlIiwicmVzb2x2ZSJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob21lL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdCwgUmVhY3RTdWJBcHAsIGNyZWF0ZUR5bmFtaWNDb21wb25lbnQsIHN0YXRpY1Byb3BzRmVhdHVyZSB9IGZyb20gXCJAeGFyYy9yZWFjdFwiO1xuaW1wb3J0IGVsZWN0cm9kZVBuZyBmcm9tIFwiLi4vLi4vc3RhdGljL2VsZWN0cm9kZS5wbmdcIjtcbmltcG9ydCB7IG1lc3NhZ2UgfSBmcm9tIFwiLi9tZXNzYWdlXCI7XG5cbmV4cG9ydCBjb25zdCBEZW1vMSA9IGNyZWF0ZUR5bmFtaWNDb21wb25lbnQoXG4gIHtcbiAgICBuYW1lOiBcImRlbW8xXCIsXG4gICAgZ2V0TW9kdWxlOiAoKSA9PiBpbXBvcnQoXCIuLi9kZW1vMVwiKSxcbiAgfSxcbiAgeyBzc3I6IHRydWUgfVxuKTtcblxuY29uc3QgSG9tZSA9IChwcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgPGgxPlxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuZWxlY3Ryb2RlLmlvXCI+XG4gICAgICAgICAgRWxlY3Ryb2RlIDxpbWcgc3JjPXtlbGVjdHJvZGVQbmd9IC8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvaDE+XG4gICAgICA8cD57bWVzc2FnZX08L3A+XG4gICAgICA8cD5wcm9wczoge0pTT04uc3RyaW5naWZ5KHByb3BzKX08L3A+XG4gICAgICA8aDE+RGVtbzEgc3ViYXBwIGFzIGEgZHluYW1pYyBjb21wb25lbnQgaW4gSG9tZTwvaDE+XG4gICAgICA8RGVtbzEgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdWJhcHA6IFJlYWN0U3ViQXBwID0ge1xuICBDb21wb25lbnQ6IEhvbWUsXG4gIHdhbnRGZWF0dXJlczogW1xuICAgIHN0YXRpY1Byb3BzRmVhdHVyZSh7XG4gICAgICBzZXJ2ZXJNb2R1bGU6IHJlcXVpcmUucmVzb2x2ZShcIi4vc3RhdGljLXByb3BzXCIpLFxuICAgIH0pLFxuICBdLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7QUFFTyxNQUFNQSxLQUFLLEdBQUcsSUFBQUMsNkJBQUEsRUFDbkI7RUFDRUMsSUFBSSxFQUFFLE9BRFI7RUFFRUMsU0FBUyxFQUFFLG1FQUFhLFVBQWI7QUFGYixDQURtQixFQUtuQjtFQUFFQyxHQUFHLEVBQUU7QUFBUCxDQUxtQixDQUFkOzs7QUFRUCxNQUFNQyxJQUFJLEdBQUlDLEtBQUQsSUFBVztFQUN0QixvQkFDRTtJQUFLLEtBQUssRUFBRTtNQUFFQyxTQUFTLEVBQUU7SUFBYjtFQUFaLGdCQUNFLG9EQUNFO0lBQUcsSUFBSSxFQUFDO0VBQVIsOEJBQ1k7SUFBSyxHQUFHLEVBQUVDO0VBQVYsRUFEWixDQURGLENBREYsZUFNRSxzQ0FBSUMsZ0JBQUosQ0FORixlQU9FLGlEQUFXQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUwsS0FBZixDQUFYLENBUEYsZUFRRSxxRkFSRixlQVNFLDJCQUFDLEtBQUQsT0FURixDQURGO0FBYUQsQ0FkRDs7QUFnQk8sTUFBTU0sTUFBbUIsR0FBRztFQUNqQ0MsU0FBUyxFQUFFUixJQURzQjtFQUVqQ1MsWUFBWSxFQUFFLENBQ1osSUFBQUMseUJBQUEsRUFBbUI7SUFDakJDLFlBQVksRUFBRUMsT0FBTyxDQUFDQyxPQUFSLENBQWdCLGdCQUFoQjtFQURHLENBQW5CLENBRFk7QUFGbUIsQ0FBNUIifQ==