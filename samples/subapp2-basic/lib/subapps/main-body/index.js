"use strict";

exports.__esModule = true;
exports.subapp = void 0;

var _react = require("@xarc/react");

var _reactRouter = require("@xarc/react-router");

var _app = require("../../app");

const MainBody = () => {
  return /*#__PURE__*/_react.React.createElement(Switch, null, /*#__PURE__*/_react.React.createElement(Route, {
    path: "/",
    exact: true,
    element: _app.Home
  }), /*#__PURE__*/_react.React.createElement(Route, {
    path: "/products",
    element: _app.Products
  }));
};

const subapp = {
  Component: MainBody,
  wantFeatures: [(0, _reactRouter.reactRouterFeature)({
    React: _react.React
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYWluQm9keSIsIkhvbWUiLCJQcm9kdWN0cyIsInN1YmFwcCIsIkNvbXBvbmVudCIsIndhbnRGZWF0dXJlcyIsInJlYWN0Um91dGVyRmVhdHVyZSIsIlJlYWN0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N1YmFwcHMvbWFpbi1ib2R5L2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdCwgUmVhY3RTdWJBcHAgfSBmcm9tIFwiQHhhcmMvcmVhY3RcIjtcbmltcG9ydCB7IHJlYWN0Um91dGVyRmVhdHVyZSB9IGZyb20gXCJAeGFyYy9yZWFjdC1yb3V0ZXJcIjtcbmltcG9ydCB7IEhvbWUsIFByb2R1Y3RzIH0gZnJvbSBcIi4uLy4uL2FwcFwiO1xuXG5jb25zdCBNYWluQm9keSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3dpdGNoPlxuICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZXhhY3QgZWxlbWVudD17SG9tZX0gLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiL3Byb2R1Y3RzXCIgZWxlbWVudD17UHJvZHVjdHN9IC8+XG4gICAgPC9Td2l0Y2g+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3ViYXBwOiBSZWFjdFN1YkFwcCA9IHtcbiAgQ29tcG9uZW50OiBNYWluQm9keSxcbiAgd2FudEZlYXR1cmVzOiBbcmVhY3RSb3V0ZXJGZWF0dXJlKHsgUmVhY3QgfSldLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxRQUFRLEdBQUcsTUFBTTtFQUNyQixvQkFDRSwyQkFBQyxNQUFELHFCQUNFLDJCQUFDLEtBQUQ7SUFBTyxJQUFJLEVBQUMsR0FBWjtJQUFnQixLQUFLLE1BQXJCO0lBQXNCLE9BQU8sRUFBRUM7RUFBL0IsRUFERixlQUVFLDJCQUFDLEtBQUQ7SUFBTyxJQUFJLEVBQUMsV0FBWjtJQUF3QixPQUFPLEVBQUVDO0VBQWpDLEVBRkYsQ0FERjtBQU1ELENBUEQ7O0FBU08sTUFBTUMsTUFBbUIsR0FBRztFQUNqQ0MsU0FBUyxFQUFFSixRQURzQjtFQUVqQ0ssWUFBWSxFQUFFLENBQUMsSUFBQUMsK0JBQUEsRUFBbUI7SUFBRUMsS0FBSyxFQUFMQTtFQUFGLENBQW5CLENBQUQ7QUFGbUIsQ0FBNUIifQ==