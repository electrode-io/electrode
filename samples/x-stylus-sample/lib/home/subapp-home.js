"use strict";

exports.__esModule = true;
exports.default = void 0;

var _subappReact = require("subapp-react");

var _electrode = _interopRequireDefault(require("../../static/electrode.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Home = () => {
  return /*#__PURE__*/_subappReact.React.createElement("h1", {
    style: {
      textAlign: "center"
    }
  }, "Hello from", " ", /*#__PURE__*/_subappReact.React.createElement("a", {
    href: "https://www.electrode.io"
  }, "Electrode ", /*#__PURE__*/_subappReact.React.createElement("img", {
    src: _electrode.default
  })));
};

var _default = (0, _subappReact.loadSubApp)({
  Component: Home,
  name: "Home"
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ob21lL3N1YmFwcC1ob21lLmpzIl0sIm5hbWVzIjpbIkhvbWUiLCJ0ZXh0QWxpZ24iLCJlbGVjdHJvZGVQbmciLCJDb21wb25lbnQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsSUFBSSxHQUFHLE1BQU07QUFDakIsc0JBQ0U7QUFBSSxJQUFBLEtBQUssRUFBRTtBQUFFQyxNQUFBQSxTQUFTLEVBQUU7QUFBYjtBQUFYLG1CQUNhLEdBRGIsZUFFRTtBQUFHLElBQUEsSUFBSSxFQUFDO0FBQVIsZ0NBQ1k7QUFBSyxJQUFBLEdBQUcsRUFBRUM7QUFBVixJQURaLENBRkYsQ0FERjtBQVFELENBVEQ7O2VBV2UsNkJBQVc7QUFBRUMsRUFBQUEsU0FBUyxFQUFFSCxJQUFiO0FBQW1CSSxFQUFBQSxJQUFJLEVBQUU7QUFBekIsQ0FBWCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhY3QsIGxvYWRTdWJBcHAgfSBmcm9tIFwic3ViYXBwLXJlYWN0XCI7XG5pbXBvcnQgZWxlY3Ryb2RlUG5nIGZyb20gXCIuLi8uLi9zdGF0aWMvZWxlY3Ryb2RlLnBuZ1wiO1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxoMSBzdHlsZT17eyB0ZXh0QWxpZ246IFwiY2VudGVyXCIgfX0+XG4gICAgICBIZWxsbyBmcm9te1wiIFwifVxuICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmVsZWN0cm9kZS5pb1wiPlxuICAgICAgICBFbGVjdHJvZGUgPGltZyBzcmM9e2VsZWN0cm9kZVBuZ30gLz5cbiAgICAgIDwvYT5cbiAgICA8L2gxPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFN1YkFwcCh7IENvbXBvbmVudDogSG9tZSwgbmFtZTogXCJIb21lXCIgfSk7XG4iXX0=