"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _subappReact = require("subapp-react");
var _subappRedux = require("subapp-redux");
var _reactRouterDom = require("react-router-dom");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
const MoreProducts = props => {
  return /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_subappReact.React.createElement("h1", {
    className: "display-4"
  }, "More Products"));
};
MoreProducts.propTypes = {
  imagesData: _propTypes.default.array.isRequired
};
const MoreDeals = () => {
  return /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "jumbotron jumbotron-fluid"
  }, /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_subappReact.React.createElement("h1", {
    className: "display-4"
  }, "More Deals"), /*#__PURE__*/_subappReact.React.createElement("p", {
    className: "lead"
  }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")));
};
const Bottom = props => {
  return /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, {
    path: "/products",
    element: /*#__PURE__*/_subappReact.React.createElement(MoreProducts, (0, _extends2.default)({}, props, {
      imagesData: []
    }))
  }), /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, {
    path: "/deals",
    element: /*#__PURE__*/_subappReact.React.createElement(MoreDeals, null)
  }));
};
const Component = (0, _reactRedux.connect)(state => state, dispatch => ({
  dispatch
}))(Bottom);
var _default = (0, _subappRedux.reduxLoadSubApp)({
  name: "Bottom",
  useReactRouter: true,
  Component,
  StartComponent: props => {
    return /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_subappReact.React.createElement(Component, props));
  },
  reduxCreateStore: initialState => {
    return (0, _redux.createStore)(s => s, initialState);
  }
});
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNb3JlUHJvZHVjdHMiLCJwcm9wcyIsInByb3BUeXBlcyIsImltYWdlc0RhdGEiLCJQcm9wVHlwZXMiLCJhcnJheSIsImlzUmVxdWlyZWQiLCJNb3JlRGVhbHMiLCJCb3R0b20iLCJDb21wb25lbnQiLCJjb25uZWN0Iiwic3RhdGUiLCJkaXNwYXRjaCIsInJlZHV4TG9hZFN1YkFwcCIsIm5hbWUiLCJ1c2VSZWFjdFJvdXRlciIsIlN0YXJ0Q29tcG9uZW50IiwicmVkdXhDcmVhdGVTdG9yZSIsImluaXRpYWxTdGF0ZSIsImNyZWF0ZVN0b3JlIiwicyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdWJhcHBzLzAzLmJvdHRvbS9ib3R0b20uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0IH0gZnJvbSBcInN1YmFwcC1yZWFjdFwiO1xuaW1wb3J0IHsgcmVkdXhMb2FkU3ViQXBwIH0gZnJvbSBcInN1YmFwcC1yZWR1eFwiO1xuaW1wb3J0IHsgUm91dGUsIEJyb3dzZXJSb3V0ZXIsIFJvdXRlcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gXCJyZWR1eFwiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5cbmNvbnN0IE1vcmVQcm9kdWN0cyA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgPGgxIGNsYXNzTmFtZT1cImRpc3BsYXktNFwiPk1vcmUgUHJvZHVjdHM8L2gxPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuTW9yZVByb2R1Y3RzLnByb3BUeXBlcyA9IHtcbiAgaW1hZ2VzRGF0YTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbn07XG5cbmNvbnN0IE1vcmVEZWFscyA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImp1bWJvdHJvbiBqdW1ib3Ryb24tZmx1aWRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJkaXNwbGF5LTRcIj5Nb3JlIERlYWxzPC9oMT5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZFwiPlxuICAgICAgICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50XG4gICAgICAgICAgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdWEuIFV0IGVuaW0gYWQgbWluaW0gdmVuaWFtLCBxdWlzIG5vc3RydWQgZXhlcmNpdGF0aW9uXG4gICAgICAgICAgdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluXG4gICAgICAgICAgcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyXG4gICAgICAgICAgc2ludCBvY2NhZWNhdCBjdXBpZGF0YXQgbm9uIHByb2lkZW50LCBzdW50IGluIGN1bHBhIHF1aSBvZmZpY2lhIGRlc2VydW50IG1vbGxpdCBhbmltIGlkXG4gICAgICAgICAgZXN0IGxhYm9ydW0uXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgQm90dG9tID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxSb3V0ZXM+XG4gICAgICA8Um91dGUgcGF0aD1cIi9wcm9kdWN0c1wiIGVsZW1lbnQ9ezxNb3JlUHJvZHVjdHMgey4uLnByb3BzfSBpbWFnZXNEYXRhPXtbXX0gLz59IC8+XG4gICAgICA8Um91dGUgcGF0aD1cIi9kZWFsc1wiIGVsZW1lbnQ9ezxNb3JlRGVhbHMgLz59IC8+XG4gICAgPC9Sb3V0ZXM+XG4gICk7XG59O1xuXG5jb25zdCBDb21wb25lbnQgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiBzdGF0ZSxcbiAgZGlzcGF0Y2ggPT4gKHsgZGlzcGF0Y2ggfSlcbikoQm90dG9tKTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkdXhMb2FkU3ViQXBwKHtcbiAgbmFtZTogXCJCb3R0b21cIixcbiAgdXNlUmVhY3RSb3V0ZXI6IHRydWUsXG4gIENvbXBvbmVudCxcbiAgU3RhcnRDb21wb25lbnQ6IHByb3BzID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJyb3dzZXJSb3V0ZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnByb3BzfSAvPlxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgICk7XG4gIH0sXG4gIHJlZHV4Q3JlYXRlU3RvcmU6IGluaXRpYWxTdGF0ZSA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZVN0b3JlKHMgPT4gcywgaW5pdGlhbFN0YXRlKTtcbiAgfVxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLE1BQU1BLFlBQVksR0FBR0MsS0FBSyxJQUFJO0VBQzVCLG9CQUNFO0lBQUssU0FBUyxFQUFDO0VBQVcsZ0JBQ3hCO0lBQUksU0FBUyxFQUFDO0VBQVcsbUJBQW1CLENBQ3hDO0FBRVYsQ0FBQztBQUVERCxZQUFZLENBQUNFLFNBQVMsR0FBRztFQUN2QkMsVUFBVSxFQUFFQyxrQkFBUyxDQUFDQyxLQUFLLENBQUNDO0FBQzlCLENBQUM7QUFFRCxNQUFNQyxTQUFTLEdBQUcsTUFBTTtFQUN0QixvQkFDRTtJQUFLLFNBQVMsRUFBQztFQUEyQixnQkFDeEM7SUFBSyxTQUFTLEVBQUM7RUFBVyxnQkFDeEI7SUFBSSxTQUFTLEVBQUM7RUFBVyxnQkFBZ0IsZUFDekM7SUFBRyxTQUFTLEVBQUM7RUFBTSxtY0FPZixDQUNBLENBQ0Y7QUFFVixDQUFDO0FBRUQsTUFBTUMsTUFBTSxHQUFHUCxLQUFLLElBQUk7RUFDdEIsb0JBQ0UsaUNBQUMsc0JBQU0scUJBQ0wsaUNBQUMscUJBQUs7SUFBQyxJQUFJLEVBQUMsV0FBVztJQUFDLE9BQU8sZUFBRSxpQ0FBQyxZQUFZLDZCQUFLQSxLQUFLO01BQUUsVUFBVSxFQUFFO0lBQUc7RUFBSSxFQUFHLGVBQ2hGLGlDQUFDLHFCQUFLO0lBQUMsSUFBSSxFQUFDLFFBQVE7SUFBQyxPQUFPLGVBQUUsaUNBQUMsU0FBUztFQUFJLEVBQUcsQ0FDeEM7QUFFYixDQUFDO0FBRUQsTUFBTVEsU0FBUyxHQUFHLElBQUFDLG1CQUFPLEVBQ3ZCQyxLQUFLLElBQUlBLEtBQUssRUFDZEMsUUFBUSxLQUFLO0VBQUVBO0FBQVMsQ0FBQyxDQUFDLENBQzNCLENBQUNKLE1BQU0sQ0FBQztBQUFDLGVBRUssSUFBQUssNEJBQWUsRUFBQztFQUM3QkMsSUFBSSxFQUFFLFFBQVE7RUFDZEMsY0FBYyxFQUFFLElBQUk7RUFDcEJOLFNBQVM7RUFDVE8sY0FBYyxFQUFFZixLQUFLLElBQUk7SUFDdkIsb0JBQ0UsaUNBQUMsNkJBQWEscUJBQ1osaUNBQUMsU0FBUyxFQUFLQSxLQUFLLENBQUksQ0FDVjtFQUVwQixDQUFDO0VBQ0RnQixnQkFBZ0IsRUFBRUMsWUFBWSxJQUFJO0lBQ2hDLE9BQU8sSUFBQUMsa0JBQVcsRUFBQ0MsQ0FBQyxJQUFJQSxDQUFDLEVBQUVGLFlBQVksQ0FBQztFQUMxQztBQUNGLENBQUMsQ0FBQztBQUFBIn0=