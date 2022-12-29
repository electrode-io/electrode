"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _subappRedux = require("subapp-redux");
var _subappReact = require("subapp-react");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _reduxLogger = _interopRequireDefault(require("redux-logger"));
var _redux = require("redux");
var _Products = require("../components/Products");
var _deals = require("../components/deals");
var _Navigation = require("../components/Navigation");
var _reducers = _interopRequireWildcard(require("./reducers"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const mapStateToProps = state => state;
const HomeComp = props => {
  return /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "container-fluid text-center"
  }, /*#__PURE__*/_subappReact.React.createElement("p", null, "HOME"), /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("span", {
    style: {
      color: "orange",
      fontSize: "large"
    }
  }, "Redux State Demo", /*#__PURE__*/_subappReact.React.createElement("br", null), "Check out the number below and footer's submit.", /*#__PURE__*/_subappReact.React.createElement("br", null), "You can do the same on other tabs too, if available.", /*#__PURE__*/_subappReact.React.createElement("br", null), /*#__PURE__*/_subappReact.React.createElement("button", {
    onClick: () => props.dispatch((0, _reducers.decNumber)())
  }, "\u226A"), /*#__PURE__*/_subappReact.React.createElement("span", {
    style: {
      color: "black",
      fontWeight: "bold",
      padding: "0 1rem 0 1rem"
    }
  }, props.number), /*#__PURE__*/_subappReact.React.createElement("button", {
    onClick: () => props.dispatch((0, _reducers.incNumber)())
  }, "\u226B"))));
};
const Stores = () => `Stores`;
const Contact = () => `Contact`;
const MainBody = props => {
  return /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement(_Navigation.Navigation, null), /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_subappReact.React.createElement(Home, null)
  }), /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, {
    path: "/products",
    element: /*#__PURE__*/_subappReact.React.createElement(_Products.Products, null)
  }), /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, (0, _extends2.default)({
    path: "/deals",
    element: /*#__PURE__*/_subappReact.React.createElement(_deals.Deals, null)
  }, props)), /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, (0, _extends2.default)({
    path: "/stores",
    element: /*#__PURE__*/_subappReact.React.createElement(Stores, null)
  }, props)), /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.Route, (0, _extends2.default)({
    path: "/contact",
    element: /*#__PURE__*/_subappReact.React.createElement(Contact, null)
  }, props))));
};
const Home = (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
  dispatch
}))(HomeComp);
const Component = (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
  dispatch
}))(MainBody);
var _default = (0, _subappRedux.reduxLoadSubApp)({
  name: "MainBody",
  Component,
  useReactRouter: true,
  reduxEnhancer: () => (0, _redux.applyMiddleware)(_reduxLogger.default),
  StartComponent: props => {
    return /*#__PURE__*/_subappReact.React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_subappReact.React.createElement(Component, props));
  },
  prepare: async () => {},
  reduxShareStore: true,
  reduxReducers: _reducers.default
});
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIkhvbWVDb21wIiwicHJvcHMiLCJjb2xvciIsImZvbnRTaXplIiwiZGlzcGF0Y2giLCJkZWNOdW1iZXIiLCJmb250V2VpZ2h0IiwicGFkZGluZyIsIm51bWJlciIsImluY051bWJlciIsIlN0b3JlcyIsIkNvbnRhY3QiLCJNYWluQm9keSIsIkhvbWUiLCJjb25uZWN0IiwiQ29tcG9uZW50IiwicmVkdXhMb2FkU3ViQXBwIiwibmFtZSIsInVzZVJlYWN0Um91dGVyIiwicmVkdXhFbmhhbmNlciIsImFwcGx5TWlkZGxld2FyZSIsImxvZ2dlciIsIlN0YXJ0Q29tcG9uZW50IiwicHJlcGFyZSIsInJlZHV4U2hhcmVTdG9yZSIsInJlZHV4UmVkdWNlcnMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvMDIubWFpbi1ib2R5L21haW4tYm9keS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVkdXhMb2FkU3ViQXBwIH0gZnJvbSBcInN1YmFwcC1yZWR1eFwiO1xuaW1wb3J0IHsgUmVhY3QgfSBmcm9tIFwic3ViYXBwLXJlYWN0XCI7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5pbXBvcnQgeyBSb3V0ZSwgUm91dGVzLCBCcm93c2VyUm91dGVyIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcInJlZHV4LWxvZ2dlclwiO1xuaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSBcInJlZHV4XCI7XG5pbXBvcnQgeyBQcm9kdWN0cyB9IGZyb20gXCIuLi9jb21wb25lbnRzL1Byb2R1Y3RzXCI7XG5pbXBvcnQgeyBEZWFscyB9IGZyb20gXCIuLi9jb21wb25lbnRzL2RlYWxzXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvTmF2aWdhdGlvblwiO1xuaW1wb3J0IHJlZHV4UmVkdWNlcnMsIHsgZGVjTnVtYmVyLCBpbmNOdW1iZXIgfSBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHN0YXRlO1xuXG5jb25zdCBIb21lQ29tcCA9IChwcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkIHRleHQtY2VudGVyXCI+XG4gICAgICA8cD5IT01FPC9wPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3tjb2xvcjogXCJvcmFuZ2VcIiwgZm9udFNpemU6IFwibGFyZ2VcIn19PlxuICAgICAgICAgIFJlZHV4IFN0YXRlIERlbW9cbiAgICAgICAgICA8YnIvPlxuICAgICAgICAgIENoZWNrIG91dCB0aGUgbnVtYmVyIGJlbG93IGFuZCBmb290ZXIncyBzdWJtaXQuXG4gICAgICAgICAgPGJyLz5cbiAgICAgICAgICBZb3UgY2FuIGRvIHRoZSBzYW1lIG9uIG90aGVyIHRhYnMgdG9vLCBpZiBhdmFpbGFibGUuXG4gICAgICAgICAgPGJyLz5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHByb3BzLmRpc3BhdGNoKGRlY051bWJlcigpKX0+JiM4ODEwOzwvYnV0dG9uPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7Y29sb3I6IFwiYmxhY2tcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIHBhZGRpbmc6IFwiMCAxcmVtIDAgMXJlbVwifX0+e3Byb3BzLm51bWJlcn08L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBwcm9wcy5kaXNwYXRjaChpbmNOdW1iZXIoKSl9PiYjODgxMTs8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICApO1xufTtcblxuY29uc3QgU3RvcmVzID0gKCkgPT4gYFN0b3Jlc2A7XG5jb25zdCBDb250YWN0ID0gKCkgPT4gYENvbnRhY3RgO1xuXG5jb25zdCBNYWluQm9keSA9IChwcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8TmF2aWdhdGlvbiAvPlxuICAgICAgPFJvdXRlcz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PEhvbWUgLz59IC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL3Byb2R1Y3RzXCIgZWxlbWVudD17PFByb2R1Y3RzIC8+fSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cIi9kZWFsc1wiIGVsZW1lbnQ9ezxEZWFscyAvPn0gey4uLnByb3BzfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cIi9zdG9yZXNcIiBlbGVtZW50PXs8U3RvcmVzIC8+fSB7Li4ucHJvcHN9IC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiL2NvbnRhY3RcIiBlbGVtZW50PXs8Q29udGFjdCAvPn0gey4uLnByb3BzfSAvPlxuICAgICAgPC9Sb3V0ZXM+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBIb21lID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIChkaXNwYXRjaCkgPT4gKHsgZGlzcGF0Y2ggfSkpKEhvbWVDb21wKTtcbmNvbnN0IENvbXBvbmVudCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCAoZGlzcGF0Y2gpID0+ICh7IGRpc3BhdGNoIH0pKShNYWluQm9keSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHV4TG9hZFN1YkFwcCh7XG4gIG5hbWU6IFwiTWFpbkJvZHlcIixcbiAgQ29tcG9uZW50LFxuICB1c2VSZWFjdFJvdXRlcjogdHJ1ZSxcbiAgcmVkdXhFbmhhbmNlcjogKCkgPT4gYXBwbHlNaWRkbGV3YXJlKGxvZ2dlciksXG4gIFN0YXJ0Q29tcG9uZW50OiAocHJvcHMpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJyb3dzZXJSb3V0ZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnByb3BzfSAvPlxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgICk7XG4gIH0sXG4gIHByZXBhcmU6IGFzeW5jICgpID0+IHt9LFxuICByZWR1eFNoYXJlU3RvcmU6IHRydWUsXG4gIHJlZHV4UmVkdWNlcnMsXG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBaUU7QUFBQTtBQUVqRSxNQUFNQSxlQUFlLEdBQUlDLEtBQUssSUFBS0EsS0FBSztBQUV4QyxNQUFNQyxRQUFRLEdBQUlDLEtBQUssSUFBSztFQUMxQixvQkFDRTtJQUFLLFNBQVMsRUFBQztFQUE2QixnQkFDMUMsbURBQVcsZUFDWCwyREFDRTtJQUFNLEtBQUssRUFBRTtNQUFDQyxLQUFLLEVBQUUsUUFBUTtNQUFFQyxRQUFRLEVBQUU7SUFBTztFQUFFLG9DQUVoRCw0Q0FBSyxrRUFFTCw0Q0FBSyx1RUFFTCw0Q0FBSyxlQUNMO0lBQVEsT0FBTyxFQUFFLE1BQU1GLEtBQUssQ0FBQ0csUUFBUSxDQUFDLElBQUFDLG1CQUFTLEdBQUU7RUFBRSxZQUFpQixlQUNwRTtJQUFNLEtBQUssRUFBRTtNQUFDSCxLQUFLLEVBQUUsT0FBTztNQUFFSSxVQUFVLEVBQUUsTUFBTTtNQUFFQyxPQUFPLEVBQUU7SUFBZTtFQUFFLEdBQUVOLEtBQUssQ0FBQ08sTUFBTSxDQUFRLGVBQ2xHO0lBQVEsT0FBTyxFQUFFLE1BQU1QLEtBQUssQ0FBQ0csUUFBUSxDQUFDLElBQUFLLG1CQUFTLEdBQUU7RUFBRSxZQUFpQixDQUM3RCxDQUNMLENBQ0Y7QUFHVixDQUFDO0FBRUQsTUFBTUMsTUFBTSxHQUFHLE1BQU8sUUFBTztBQUM3QixNQUFNQyxPQUFPLEdBQUcsTUFBTyxTQUFRO0FBRS9CLE1BQU1DLFFBQVEsR0FBSVgsS0FBSyxJQUFLO0VBQzFCLG9CQUNFLDJEQUNFLGlDQUFDLHNCQUFVLE9BQUcsZUFDZCxpQ0FBQyxzQkFBTSxxQkFDTCxpQ0FBQyxxQkFBSztJQUFDLElBQUksRUFBQyxHQUFHO0lBQUMsT0FBTyxlQUFFLGlDQUFDLElBQUk7RUFBSSxFQUFHLGVBQ3JDLGlDQUFDLHFCQUFLO0lBQUMsSUFBSSxFQUFDLFdBQVc7SUFBQyxPQUFPLGVBQUUsaUNBQUMsa0JBQVE7RUFBSSxFQUFHLGVBQ2pELGlDQUFDLHFCQUFLO0lBQUMsSUFBSSxFQUFDLFFBQVE7SUFBQyxPQUFPLGVBQUUsaUNBQUMsWUFBSztFQUFJLEdBQUtBLEtBQUssRUFBSSxlQUN0RCxpQ0FBQyxxQkFBSztJQUFDLElBQUksRUFBQyxTQUFTO0lBQUMsT0FBTyxlQUFFLGlDQUFDLE1BQU07RUFBSSxHQUFLQSxLQUFLLEVBQUksZUFDeEQsaUNBQUMscUJBQUs7SUFBQyxJQUFJLEVBQUMsVUFBVTtJQUFDLE9BQU8sZUFBRSxpQ0FBQyxPQUFPO0VBQUksR0FBS0EsS0FBSyxFQUFJLENBQ25ELENBQ0w7QUFFVixDQUFDO0FBRUQsTUFBTVksSUFBSSxHQUFHLElBQUFDLG1CQUFPLEVBQUNoQixlQUFlLEVBQUdNLFFBQVEsS0FBTTtFQUFFQTtBQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNKLFFBQVEsQ0FBQztBQUM3RSxNQUFNZSxTQUFTLEdBQUcsSUFBQUQsbUJBQU8sRUFBQ2hCLGVBQWUsRUFBR00sUUFBUSxLQUFNO0VBQUVBO0FBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ1EsUUFBUSxDQUFDO0FBQUMsZUFFcEUsSUFBQUksNEJBQWUsRUFBQztFQUM3QkMsSUFBSSxFQUFFLFVBQVU7RUFDaEJGLFNBQVM7RUFDVEcsY0FBYyxFQUFFLElBQUk7RUFDcEJDLGFBQWEsRUFBRSxNQUFNLElBQUFDLHNCQUFlLEVBQUNDLG9CQUFNLENBQUM7RUFDNUNDLGNBQWMsRUFBR3JCLEtBQUssSUFBSztJQUN6QixvQkFDRSxpQ0FBQyw2QkFBYSxxQkFDWixpQ0FBQyxTQUFTLEVBQUtBLEtBQUssQ0FBSSxDQUNWO0VBRXBCLENBQUM7RUFDRHNCLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztFQUN2QkMsZUFBZSxFQUFFLElBQUk7RUFDckJDLGFBQWEsRUFBYkE7QUFDRixDQUFDLENBQUM7QUFBQSJ9