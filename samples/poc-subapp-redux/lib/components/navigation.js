"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.Navigation = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
const NavItem = props => {
  const {
    to,
    children
  } = props;
  return /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: to
  }, /*#__PURE__*/_react.default.createElement("div", null, children)));
};
const Navigation = () => {
  return /*#__PURE__*/_react.default.createElement("nav", {
    className: "navbar navbar-inverse"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "container-fluid"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "navbar-header"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "navbar-toggle",
    "data-toggle": "collapse",
    "data-target": "#myNavbar"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "icon-bar"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "icon-bar"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "icon-bar"
  })), /*#__PURE__*/_react.default.createElement("a", {
    className: "navbar-brand",
    href: "#"
  }, "Logo")), /*#__PURE__*/_react.default.createElement("div", {
    className: "collapse navbar-collapse",
    id: "myNavbar"
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: "nav navbar-nav"
  }, /*#__PURE__*/_react.default.createElement(NavItem, {
    exact: true,
    to: "/"
  }, "Home"), /*#__PURE__*/_react.default.createElement(NavItem, {
    to: "/products"
  }, "Products"), /*#__PURE__*/_react.default.createElement(NavItem, {
    to: "/deals"
  }, "Deals"), /*#__PURE__*/_react.default.createElement(NavItem, {
    to: "/stores"
  }, "Stores"), /*#__PURE__*/_react.default.createElement(NavItem, {
    to: "/contact"
  }, "Contact")), /*#__PURE__*/_react.default.createElement("ul", {
    className: "nav navbar-nav navbar-right"
  }, /*#__PURE__*/_react.default.createElement(NavItem, {
    to: "/account"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "glyphicon glyphicon-user"
  }), " Your Account"), /*#__PURE__*/_react.default.createElement(NavItem, {
    to: "/cart"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "glyphicon glyphicon-shopping-cart"
  }), " Cart")))));
};
exports.Navigation = Navigation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJOYXZJdGVtIiwicHJvcHMiLCJ0byIsImNoaWxkcmVuIiwiTmF2aWdhdGlvbiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL25hdmlnYXRpb24uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5jb25zdCBOYXZJdGVtID0gcHJvcHMgPT4ge1xuICBjb25zdCB7IHRvLCBjaGlsZHJlbiB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGxpPlxuICAgICAgPExpbmsgdG89e3RvfT5cbiAgICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgICA8L0xpbms+XG4gICAgPC9saT5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBOYXZpZ2F0aW9uID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1pbnZlcnNlXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVcIlxuICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXG4gICAgICAgICAgICBkYXRhLXRhcmdldD1cIiNteU5hdmJhclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICBMb2dvXG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm15TmF2YmFyXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2XCI+XG4gICAgICAgICAgICA8TmF2SXRlbSBleGFjdD17dHJ1ZX0gdG89XCIvXCI+XG4gICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgIDwvTmF2SXRlbT5cbiAgICAgICAgICAgIDxOYXZJdGVtIHRvPVwiL3Byb2R1Y3RzXCI+UHJvZHVjdHM8L05hdkl0ZW0+XG4gICAgICAgICAgICA8TmF2SXRlbSB0bz1cIi9kZWFsc1wiPkRlYWxzPC9OYXZJdGVtPlxuICAgICAgICAgICAgPE5hdkl0ZW0gdG89XCIvc3RvcmVzXCI+U3RvcmVzPC9OYXZJdGVtPlxuICAgICAgICAgICAgPE5hdkl0ZW0gdG89XCIvY29udGFjdFwiPkNvbnRhY3Q8L05hdkl0ZW0+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0XCI+XG4gICAgICAgICAgICA8TmF2SXRlbSB0bz1cIi9hY2NvdW50XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdXNlclwiIC8+IFlvdXIgQWNjb3VudFxuICAgICAgICAgICAgPC9OYXZJdGVtPlxuICAgICAgICAgICAgPE5hdkl0ZW0gdG89XCIvY2FydFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXNob3BwaW5nLWNhcnRcIiAvPiBDYXJ0XG4gICAgICAgICAgICA8L05hdkl0ZW0+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25hdj5cbiAgKTtcbn07Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFFQSxNQUFNQSxPQUFPLEdBQUdDLEtBQUssSUFBSTtFQUN2QixNQUFNO0lBQUVDLEVBQUU7SUFBRUM7RUFBUyxDQUFDLEdBQUdGLEtBQUs7RUFDOUIsb0JBQ0Usc0RBQ0UsNkJBQUMsb0JBQUk7SUFBQyxFQUFFLEVBQUVDO0VBQUcsZ0JBQ1gsMENBQU1DLFFBQVEsQ0FBTyxDQUNoQixDQUNKO0FBRVQsQ0FBQztBQUVNLE1BQU1DLFVBQVUsR0FBRyxNQUFNO0VBQzlCLG9CQUNFO0lBQUssU0FBUyxFQUFDO0VBQXVCLGdCQUNwQztJQUFLLFNBQVMsRUFBQztFQUFpQixnQkFDOUI7SUFBSyxTQUFTLEVBQUM7RUFBZSxnQkFDNUI7SUFDRSxJQUFJLEVBQUMsUUFBUTtJQUNiLFNBQVMsRUFBQyxlQUFlO0lBQ3pCLGVBQVksVUFBVTtJQUN0QixlQUFZO0VBQVcsZ0JBRXZCO0lBQU0sU0FBUyxFQUFDO0VBQVUsRUFBRyxlQUM3QjtJQUFNLFNBQVMsRUFBQztFQUFVLEVBQUcsZUFDN0I7SUFBTSxTQUFTLEVBQUM7RUFBVSxFQUFHLENBQ3RCLGVBQ1Q7SUFBRyxTQUFTLEVBQUMsY0FBYztJQUFDLElBQUksRUFBQztFQUFHLFVBRWhDLENBQ0EsZUFDTjtJQUFLLFNBQVMsRUFBQywwQkFBMEI7SUFBQyxFQUFFLEVBQUM7RUFBVSxnQkFDckQ7SUFBSSxTQUFTLEVBQUM7RUFBZ0IsZ0JBQzVCLDZCQUFDLE9BQU87SUFBQyxLQUFLLEVBQUUsSUFBSztJQUFDLEVBQUUsRUFBQztFQUFHLFVBRWxCLGVBQ1YsNkJBQUMsT0FBTztJQUFDLEVBQUUsRUFBQztFQUFXLGNBQW1CLGVBQzFDLDZCQUFDLE9BQU87SUFBQyxFQUFFLEVBQUM7RUFBUSxXQUFnQixlQUNwQyw2QkFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDO0VBQVMsWUFBaUIsZUFDdEMsNkJBQUMsT0FBTztJQUFDLEVBQUUsRUFBQztFQUFVLGFBQWtCLENBQ3JDLGVBQ0w7SUFBSSxTQUFTLEVBQUM7RUFBNkIsZ0JBQ3pDLDZCQUFDLE9BQU87SUFBQyxFQUFFLEVBQUM7RUFBVSxnQkFDcEI7SUFBTSxTQUFTLEVBQUM7RUFBMEIsRUFBRyxrQkFDckMsZUFDViw2QkFBQyxPQUFPO0lBQUMsRUFBRSxFQUFDO0VBQU8sZ0JBQ2pCO0lBQU0sU0FBUyxFQUFDO0VBQW1DLEVBQUcsVUFDOUMsQ0FDUCxDQUNELENBQ0YsQ0FDRjtBQUVWLENBQUM7QUFBQyJ9