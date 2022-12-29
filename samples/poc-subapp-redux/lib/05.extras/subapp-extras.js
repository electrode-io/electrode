"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _subappRedux = require("subapp-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
const Extras = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid text-center"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Extras Extras Extras"), /*#__PURE__*/_react.default.createElement("div", null, props.message));
};
Extras.propTypes = {
  message: _propTypes.default.string
};
const Component = (0, _reactRedux.connect)(state => state, dispatch => ({
  dispatch
}))(Extras);
var _default = (0, _subappRedux.reduxLoadSubApp)({
  name: "Extras",
  Component,
  prepare: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          message: "what other buyers are looking at"
        });
      }, 1000);
    });
  }
});
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFeHRyYXMiLCJwcm9wcyIsIm1lc3NhZ2UiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJDb21wb25lbnQiLCJjb25uZWN0Iiwic3RhdGUiLCJkaXNwYXRjaCIsInJlZHV4TG9hZFN1YkFwcCIsIm5hbWUiLCJwcmVwYXJlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjLzA1LmV4dHJhcy9zdWJhcHAtZXh0cmFzLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyByZWR1eExvYWRTdWJBcHAgfSBmcm9tIFwic3ViYXBwLXJlZHV4XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5cbmNvbnN0IEV4dHJhcyA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZCB0ZXh0LWNlbnRlclwiPlxuICAgICAgPHA+RXh0cmFzIEV4dHJhcyBFeHRyYXM8L3A+XG4gICAgICA8ZGl2Pntwcm9wcy5tZXNzYWdlfTwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuRXh0cmFzLnByb3BUeXBlcyA9IHtcbiAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZ1xufTtcblxuY29uc3QgQ29tcG9uZW50ID0gY29ubmVjdChcbiAgc3RhdGUgPT4gc3RhdGUsXG4gIGRpc3BhdGNoID0+ICh7IGRpc3BhdGNoIH0pXG4pKEV4dHJhcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlZHV4TG9hZFN1YkFwcCh7XG4gIG5hbWU6IFwiRXh0cmFzXCIsXG4gIENvbXBvbmVudCxcbiAgcHJlcGFyZTogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICBtZXNzYWdlOiBcIndoYXQgb3RoZXIgYnV5ZXJzIGFyZSBsb29raW5nIGF0XCJcbiAgICAgICAgfSk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxNQUFNLEdBQUdDLEtBQUssSUFBSTtFQUN0QixvQkFDRTtJQUFLLFNBQVMsRUFBQztFQUE2QixnQkFDMUMsK0RBQTJCLGVBQzNCLDBDQUFNQSxLQUFLLENBQUNDLE9BQU8sQ0FBTyxDQUN0QjtBQUVWLENBQUM7QUFFREYsTUFBTSxDQUFDRyxTQUFTLEdBQUc7RUFDakJELE9BQU8sRUFBRUUsa0JBQVMsQ0FBQ0M7QUFDckIsQ0FBQztBQUVELE1BQU1DLFNBQVMsR0FBRyxJQUFBQyxtQkFBTyxFQUN2QkMsS0FBSyxJQUFJQSxLQUFLLEVBQ2RDLFFBQVEsS0FBSztFQUFFQTtBQUFTLENBQUMsQ0FBQyxDQUMzQixDQUFDVCxNQUFNLENBQUM7QUFBQyxlQUVLLElBQUFVLDRCQUFlLEVBQUM7RUFDN0JDLElBQUksRUFBRSxRQUFRO0VBQ2RMLFNBQVM7RUFDVE0sT0FBTyxFQUFFLE1BQU07SUFDYixPQUFPLElBQUlDLE9BQU8sQ0FBQ0MsT0FBTyxJQUFJO01BQzVCQyxVQUFVLENBQUMsTUFBTTtRQUNmRCxPQUFPLENBQUM7VUFDTlosT0FBTyxFQUFFO1FBQ1gsQ0FBQyxDQUFDO01BQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNWLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQyxDQUFDO0FBQUEifQ==