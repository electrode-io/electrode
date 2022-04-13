"use strict";

exports.__esModule = true;
exports.Products = exports.Home = exports.Header = exports.Footer = void 0;

var _react = require("@xarc/react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Header = (0, _react.declareSubApp)({
  name: "header",
  getModule: () => Promise.resolve().then(() => _interopRequireWildcard(require("./subapps/header")))
});
exports.Header = Header;
const Home = (0, _react.declareSubApp)({
  name: "home",
  getModule: () => Promise.resolve().then(() => _interopRequireWildcard(require("./subapps/home")))
});
exports.Home = Home;
const Products = (0, _react.declareSubApp)({
  name: "products",
  getModule: () => Promise.resolve().then(() => _interopRequireWildcard(require("./subapps/products")))
});
exports.Products = Products;
const Footer = (0, _react.declareSubApp)({
  name: "footer",
  getModule: () => Promise.resolve().then(() => _interopRequireWildcard(require("./subapps/footer")))
});
exports.Footer = Footer;

_react.xarcV2.debug("app.tsx");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIZWFkZXIiLCJkZWNsYXJlU3ViQXBwIiwibmFtZSIsImdldE1vZHVsZSIsIkhvbWUiLCJQcm9kdWN0cyIsIkZvb3RlciIsInhhcmNWMiIsImRlYnVnIl0sInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVjbGFyZVN1YkFwcCwgeGFyY1YyIH0gZnJvbSBcIkB4YXJjL3JlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBIZWFkZXIgPSBkZWNsYXJlU3ViQXBwKHtcbiAgbmFtZTogXCJoZWFkZXJcIixcbiAgZ2V0TW9kdWxlOiAoKSA9PiBpbXBvcnQoXCIuL3N1YmFwcHMvaGVhZGVyXCIpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBIb21lID0gZGVjbGFyZVN1YkFwcCh7XG4gIG5hbWU6IFwiaG9tZVwiLFxuICBnZXRNb2R1bGU6ICgpID0+IGltcG9ydChcIi4vc3ViYXBwcy9ob21lXCIpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBQcm9kdWN0cyA9IGRlY2xhcmVTdWJBcHAoe1xuICBuYW1lOiBcInByb2R1Y3RzXCIsXG4gIGdldE1vZHVsZTogKCkgPT4gaW1wb3J0KFwiLi9zdWJhcHBzL3Byb2R1Y3RzXCIpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBGb290ZXIgPSBkZWNsYXJlU3ViQXBwKHtcbiAgbmFtZTogXCJmb290ZXJcIixcbiAgZ2V0TW9kdWxlOiAoKSA9PiBpbXBvcnQoXCIuL3N1YmFwcHMvZm9vdGVyXCIpLFxufSk7XG5cbnhhcmNWMi5kZWJ1ZyhcImFwcC50c3hcIik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7OztBQUVPLE1BQU1BLE1BQU0sR0FBRyxJQUFBQyxvQkFBQSxFQUFjO0VBQ2xDQyxJQUFJLEVBQUUsUUFENEI7RUFFbENDLFNBQVMsRUFBRSxtRUFBYSxrQkFBYjtBQUZ1QixDQUFkLENBQWY7O0FBS0EsTUFBTUMsSUFBSSxHQUFHLElBQUFILG9CQUFBLEVBQWM7RUFDaENDLElBQUksRUFBRSxNQUQwQjtFQUVoQ0MsU0FBUyxFQUFFLG1FQUFhLGdCQUFiO0FBRnFCLENBQWQsQ0FBYjs7QUFLQSxNQUFNRSxRQUFRLEdBQUcsSUFBQUosb0JBQUEsRUFBYztFQUNwQ0MsSUFBSSxFQUFFLFVBRDhCO0VBRXBDQyxTQUFTLEVBQUUsbUVBQWEsb0JBQWI7QUFGeUIsQ0FBZCxDQUFqQjs7QUFLQSxNQUFNRyxNQUFNLEdBQUcsSUFBQUwsb0JBQUEsRUFBYztFQUNsQ0MsSUFBSSxFQUFFLFFBRDRCO0VBRWxDQyxTQUFTLEVBQUUsbUVBQWEsa0JBQWI7QUFGdUIsQ0FBZCxDQUFmOzs7QUFLUEksYUFBQSxDQUFPQyxLQUFQLENBQWEsU0FBYiJ9