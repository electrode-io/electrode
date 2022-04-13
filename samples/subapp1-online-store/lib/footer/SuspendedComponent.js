"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

let data;

const SuspendedComponent = () => {
  if (!data) {
    throw new Promise(resolve => {
      setTimeout(() => {
        data = "demo data received from async call";
        resolve(data);
      }, 2500);
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", null, data);
};

var _default = SuspendedComponent;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRhIiwiU3VzcGVuZGVkQ29tcG9uZW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zvb3Rlci9TdXNwZW5kZWRDb21wb25lbnQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmxldCBkYXRhO1xuY29uc3QgU3VzcGVuZGVkQ29tcG9uZW50ID0gKCkgPT4ge1xuICBpZiAoIWRhdGEpIHtcbiAgICB0aHJvdyBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRhdGEgPSBcImRlbW8gZGF0YSByZWNlaXZlZCBmcm9tIGFzeW5jIGNhbGxcIjtcbiAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgIH0sIDI1MDApO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiA8ZGl2PntkYXRhfTwvZGl2Pjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1c3BlbmRlZENvbXBvbmVudDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBLElBQUlBLElBQUo7O0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsTUFBTTtFQUMvQixJQUFJLENBQUNELElBQUwsRUFBVztJQUNULE1BQU0sSUFBSUUsT0FBSixDQUFhQyxPQUFELElBQWE7TUFDN0JDLFVBQVUsQ0FBQyxNQUFNO1FBQ2ZKLElBQUksR0FBRyxvQ0FBUDtRQUNBRyxPQUFPLENBQUNILElBQUQsQ0FBUDtNQUNELENBSFMsRUFHUCxJQUhPLENBQVY7SUFJRCxDQUxLLENBQU47RUFNRDs7RUFDRCxvQkFBTywwQ0FBTUEsSUFBTixDQUFQO0FBQ0QsQ0FWRDs7ZUFZZUMsa0IifQ==