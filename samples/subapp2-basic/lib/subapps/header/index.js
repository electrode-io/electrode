"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.subapp = exports.Demo1 = void 0;

var _react = require("@xarc/react");

var _electrode = _interopRequireDefault(require("../../../static/electrode.png"));

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

const Header = props => {
  return /*#__PURE__*/_react.React.createElement("div", {
    style: {
      padding: "5px",
      border: "solid",
      marginLeft: "15%",
      marginRight: "15%",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.React.createElement("h1", null, /*#__PURE__*/_react.React.createElement("a", {
    href: "https://www.electrode.io"
  }, "Electrode ", /*#__PURE__*/_react.React.createElement("img", {
    src: _electrode.default
  }))), /*#__PURE__*/_react.React.createElement("p", null, _message.message), /*#__PURE__*/_react.React.createElement("p", null, "props: ", JSON.stringify(props)), /*#__PURE__*/_react.React.createElement("h1", null, "Demo1 subapp as a dynamic component in Home"), /*#__PURE__*/_react.React.createElement(Demo1, null));
};

const subapp = {
  Component: Header,
  wantFeatures: [(0, _react.staticPropsFeature)({
    serverModule: require.resolve("./static-props")
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZW1vMSIsImNyZWF0ZUR5bmFtaWNDb21wb25lbnQiLCJuYW1lIiwiZ2V0TW9kdWxlIiwic3NyIiwiSGVhZGVyIiwicHJvcHMiLCJwYWRkaW5nIiwiYm9yZGVyIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwidGV4dEFsaWduIiwiZWxlY3Ryb2RlUG5nIiwibWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJhcHAiLCJDb21wb25lbnQiLCJ3YW50RmVhdHVyZXMiLCJzdGF0aWNQcm9wc0ZlYXR1cmUiLCJzZXJ2ZXJNb2R1bGUiLCJyZXF1aXJlIiwicmVzb2x2ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdWJhcHBzL2hlYWRlci9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhY3QsIFJlYWN0U3ViQXBwLCBjcmVhdGVEeW5hbWljQ29tcG9uZW50LCBzdGF0aWNQcm9wc0ZlYXR1cmUgfSBmcm9tIFwiQHhhcmMvcmVhY3RcIjtcbmltcG9ydCBlbGVjdHJvZGVQbmcgZnJvbSBcIi4uLy4uLy4uL3N0YXRpYy9lbGVjdHJvZGUucG5nXCI7XG5pbXBvcnQgeyBtZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZVwiO1xuXG5leHBvcnQgY29uc3QgRGVtbzEgPSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KFxuICB7XG4gICAgbmFtZTogXCJkZW1vMVwiLFxuICAgIGdldE1vZHVsZTogKCkgPT4gaW1wb3J0KFwiLi4vZGVtbzFcIiksXG4gIH0sXG4gIHsgc3NyOiB0cnVlIH1cbik7XG5cbmNvbnN0IEhlYWRlciA9IChwcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHBhZGRpbmc6IFwiNXB4XCIsXG4gICAgICAgIGJvcmRlcjogXCJzb2xpZFwiLFxuICAgICAgICBtYXJnaW5MZWZ0OiBcIjE1JVwiLFxuICAgICAgICBtYXJnaW5SaWdodDogXCIxNSVcIixcbiAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8aDE+XG4gICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5lbGVjdHJvZGUuaW9cIj5cbiAgICAgICAgICBFbGVjdHJvZGUgPGltZyBzcmM9e2VsZWN0cm9kZVBuZ30gLz5cbiAgICAgICAgPC9hPlxuICAgICAgPC9oMT5cbiAgICAgIDxwPnttZXNzYWdlfTwvcD5cbiAgICAgIDxwPnByb3BzOiB7SlNPTi5zdHJpbmdpZnkocHJvcHMpfTwvcD5cbiAgICAgIDxoMT5EZW1vMSBzdWJhcHAgYXMgYSBkeW5hbWljIGNvbXBvbmVudCBpbiBIb21lPC9oMT5cbiAgICAgIDxEZW1vMSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHN1YmFwcDogUmVhY3RTdWJBcHAgPSB7XG4gIENvbXBvbmVudDogSGVhZGVyLFxuICB3YW50RmVhdHVyZXM6IFtcbiAgICBzdGF0aWNQcm9wc0ZlYXR1cmUoe1xuICAgICAgc2VydmVyTW9kdWxlOiByZXF1aXJlLnJlc29sdmUoXCIuL3N0YXRpYy1wcm9wc1wiKSxcbiAgICB9KSxcbiAgXSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRU8sTUFBTUEsS0FBSyxHQUFHLElBQUFDLDZCQUFBLEVBQ25CO0VBQ0VDLElBQUksRUFBRSxPQURSO0VBRUVDLFNBQVMsRUFBRSxtRUFBYSxVQUFiO0FBRmIsQ0FEbUIsRUFLbkI7RUFBRUMsR0FBRyxFQUFFO0FBQVAsQ0FMbUIsQ0FBZDs7O0FBUVAsTUFBTUMsTUFBTSxHQUFJQyxLQUFELElBQVc7RUFDeEIsb0JBQ0U7SUFDRSxLQUFLLEVBQUU7TUFDTEMsT0FBTyxFQUFFLEtBREo7TUFFTEMsTUFBTSxFQUFFLE9BRkg7TUFHTEMsVUFBVSxFQUFFLEtBSFA7TUFJTEMsV0FBVyxFQUFFLEtBSlI7TUFLTEMsU0FBUyxFQUFFO0lBTE47RUFEVCxnQkFTRSxvREFDRTtJQUFHLElBQUksRUFBQztFQUFSLDhCQUNZO0lBQUssR0FBRyxFQUFFQztFQUFWLEVBRFosQ0FERixDQVRGLGVBY0Usc0NBQUlDLGdCQUFKLENBZEYsZUFlRSxpREFBV0MsSUFBSSxDQUFDQyxTQUFMLENBQWVULEtBQWYsQ0FBWCxDQWZGLGVBZ0JFLHFGQWhCRixlQWlCRSwyQkFBQyxLQUFELE9BakJGLENBREY7QUFxQkQsQ0F0QkQ7O0FBd0JPLE1BQU1VLE1BQW1CLEdBQUc7RUFDakNDLFNBQVMsRUFBRVosTUFEc0I7RUFFakNhLFlBQVksRUFBRSxDQUNaLElBQUFDLHlCQUFBLEVBQW1CO0lBQ2pCQyxZQUFZLEVBQUVDLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixnQkFBaEI7RUFERyxDQUFuQixDQURZO0FBRm1CLENBQTVCIn0=