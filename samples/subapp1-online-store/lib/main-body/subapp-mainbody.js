"use strict";

exports.__esModule = true;
exports.default = void 0;

var _subappRedux = require("subapp-redux");

var _subappReact = require("subapp-react");

var _reactRedux = require("react-redux");

var _reducers = _interopRequireWildcard(require("./reducers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const mapStateToProps = state => state;

const MainBody = props => {
  return /*#__PURE__*/_subappReact.React.createElement("div", {
    className: "container-fluid text-center"
  }, /*#__PURE__*/_subappReact.React.createElement("h2", null, "SubApp Main Body"), /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("span", {
    style: {
      fontSize: "large"
    }
  }, "Redux State Demo", /*#__PURE__*/_subappReact.React.createElement("br", null), /*#__PURE__*/_subappReact.React.createElement("button", {
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

const Component = (0, _reactRedux.connect)(mapStateToProps, dispatch => ({
  dispatch
}))(MainBody);

var _default = (0, _subappRedux.reduxLoadSubApp)({
  name: "MainBody",
  Component,
  useReactRouter: true,
  StartComponent: props => {
    return /*#__PURE__*/_subappReact.React.createElement(Component, props);
  },
  prepare: async () => {},
  reduxShareStore: true,
  reduxReducers: _reducers.default
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsIk1haW5Cb2R5IiwicHJvcHMiLCJmb250U2l6ZSIsImRpc3BhdGNoIiwiZGVjTnVtYmVyIiwiY29sb3IiLCJmb250V2VpZ2h0IiwicGFkZGluZyIsIm51bWJlciIsImluY051bWJlciIsIkNvbXBvbmVudCIsImNvbm5lY3QiLCJyZWR1eExvYWRTdWJBcHAiLCJuYW1lIiwidXNlUmVhY3RSb3V0ZXIiLCJTdGFydENvbXBvbmVudCIsInByZXBhcmUiLCJyZWR1eFNoYXJlU3RvcmUiLCJyZWR1eFJlZHVjZXJzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4tYm9keS9zdWJhcHAtbWFpbmJvZHkuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZHV4TG9hZFN1YkFwcCB9IGZyb20gXCJzdWJhcHAtcmVkdXhcIjtcbmltcG9ydCB7IFJlYWN0IH0gZnJvbSBcInN1YmFwcC1yZWFjdFwiO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuXG5pbXBvcnQgcmVkdXhSZWR1Y2VycywgeyBkZWNOdW1iZXIsIGluY051bWJlciB9IGZyb20gXCIuL3JlZHVjZXJzXCI7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHN0YXRlO1xuXG5jb25zdCBNYWluQm9keSA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZCB0ZXh0LWNlbnRlclwiPlxuICAgICAgPGgyPlN1YkFwcCBNYWluIEJvZHk8L2gyPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IFwibGFyZ2VcIiB9fT5cbiAgICAgICAgICBSZWR1eCBTdGF0ZSBEZW1vXG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBwcm9wcy5kaXNwYXRjaChkZWNOdW1iZXIoKSl9PiYjODgxMDs8L2J1dHRvbj5cbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogXCJibGFja1wiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgcGFkZGluZzogXCIwIDFyZW0gMCAxcmVtXCIgfX0+XG4gICAgICAgICAgICB7cHJvcHMubnVtYmVyfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHByb3BzLmRpc3BhdGNoKGluY051bWJlcigpKX0+JiM4ODExOzwvYnV0dG9uPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5jb25zdCBDb21wb25lbnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgZGlzcGF0Y2ggPT4gKHsgZGlzcGF0Y2ggfSkpKE1haW5Cb2R5KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkdXhMb2FkU3ViQXBwKHtcbiAgbmFtZTogXCJNYWluQm9keVwiLFxuICBDb21wb25lbnQsXG4gIHVzZVJlYWN0Um91dGVyOiB0cnVlLFxuICBTdGFydENvbXBvbmVudDogcHJvcHMgPT4ge1xuICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XG4gIH0sXG4gIHByZXBhcmU6IGFzeW5jICgpID0+IHt9LFxuICByZWR1eFNoYXJlU3RvcmU6IHRydWUsXG4gIHJlZHV4UmVkdWNlcnNcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7QUFFQSxNQUFNQSxlQUFlLEdBQUdDLEtBQUssSUFBSUEsS0FBakM7O0FBRUEsTUFBTUMsUUFBUSxHQUFHQyxLQUFLLElBQUk7RUFDeEIsb0JBQ0U7SUFBSyxTQUFTLEVBQUM7RUFBZixnQkFDRSxnRUFERixlQUVFLDJEQUNFO0lBQU0sS0FBSyxFQUFFO01BQUVDLFFBQVEsRUFBRTtJQUFaO0VBQWIsb0NBRUUsNENBRkYsZUFHRTtJQUFRLE9BQU8sRUFBRSxNQUFNRCxLQUFLLENBQUNFLFFBQU4sQ0FBZSxJQUFBQyxtQkFBQSxHQUFmO0VBQXZCLFlBSEYsZUFJRTtJQUFNLEtBQUssRUFBRTtNQUFFQyxLQUFLLEVBQUUsT0FBVDtNQUFrQkMsVUFBVSxFQUFFLE1BQTlCO01BQXNDQyxPQUFPLEVBQUU7SUFBL0M7RUFBYixHQUNHTixLQUFLLENBQUNPLE1BRFQsQ0FKRixlQU9FO0lBQVEsT0FBTyxFQUFFLE1BQU1QLEtBQUssQ0FBQ0UsUUFBTixDQUFlLElBQUFNLG1CQUFBLEdBQWY7RUFBdkIsWUFQRixDQURGLENBRkYsQ0FERjtBQWdCRCxDQWpCRDs7QUFrQkEsTUFBTUMsU0FBUyxHQUFHLElBQUFDLG1CQUFBLEVBQVFiLGVBQVIsRUFBeUJLLFFBQVEsS0FBSztFQUFFQTtBQUFGLENBQUwsQ0FBakMsRUFBcURILFFBQXJELENBQWxCOztlQUVlLElBQUFZLDRCQUFBLEVBQWdCO0VBQzdCQyxJQUFJLEVBQUUsVUFEdUI7RUFFN0JILFNBRjZCO0VBRzdCSSxjQUFjLEVBQUUsSUFIYTtFQUk3QkMsY0FBYyxFQUFFZCxLQUFLLElBQUk7SUFDdkIsb0JBQU8saUNBQUMsU0FBRCxFQUFlQSxLQUFmLENBQVA7RUFDRCxDQU40QjtFQU83QmUsT0FBTyxFQUFFLFlBQVksQ0FBRSxDQVBNO0VBUTdCQyxlQUFlLEVBQUUsSUFSWTtFQVM3QkMsYUFBYSxFQUFiQTtBQVQ2QixDQUFoQixDIn0=