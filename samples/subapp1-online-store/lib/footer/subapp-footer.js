"use strict";

exports.__esModule = true;
exports.default = void 0;

var _subappReact = require("subapp-react");

var _data = require("./data");

var _Shows = require("./Shows");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Comments = _subappReact.React.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require("./Comments"))));

const data = (0, _data.createServerData)();

const Spinner = () => {
  return /*#__PURE__*/_subappReact.React.createElement("div", null, "FAKE SPINNER...");
};

const ShowsComponent = _subappReact.React.lazy(() => Promise.resolve().then(() => _interopRequireWildcard(require("./Shows"))));

const Footer = () => {
  return (
    /*#__PURE__*/
    // <React.StrictMode>  
    //   <DataProvider data={data}>
    //     <div className="container-fluid text-center">
    //       <h2>SubApp Footer</h2>
    //       <React.Suspense fallback={<Spinner />}>                  
    //         <Comments />
    //       </React.Suspense>
    //     </div>
    //   </DataProvider>
    // </React.StrictMode>
    _subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement(_subappReact.React.Suspense, {
      fallback: /*#__PURE__*/_subappReact.React.createElement("p", null, "Could not fetch TV shows.")
    }, /*#__PURE__*/_subappReact.React.createElement(ShowsComponent, null)))
  );
};

var _default = (0, _subappReact.loadSubApp)({
  name: "Footer",
  Component: Footer
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb21tZW50cyIsIlJlYWN0IiwibGF6eSIsImRhdGEiLCJjcmVhdGVTZXJ2ZXJEYXRhIiwiU3Bpbm5lciIsIlNob3dzQ29tcG9uZW50IiwiRm9vdGVyIiwibG9hZFN1YkFwcCIsIm5hbWUiLCJDb21wb25lbnQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZm9vdGVyL3N1YmFwcC1mb290ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhY3QsIGxvYWRTdWJBcHAsIEFwcENvbnRleHQgfSBmcm9tIFwic3ViYXBwLXJlYWN0XCI7XG5pbXBvcnQgeyBEYXRhUHJvdmlkZXIsIGNyZWF0ZVNlcnZlckRhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBmZXRjaFNob3dzIH0gZnJvbSBcIi4vU2hvd3NcIjtcblxuXG5jb25zdCBDb21tZW50cyA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KFwiLi9Db21tZW50c1wiKSk7XG5cbmNvbnN0IGRhdGEgPSBjcmVhdGVTZXJ2ZXJEYXRhKCk7XG5cbmNvbnN0IFNwaW5uZXIgID0gKCkgPT4ge1xuICByZXR1cm4gPGRpdj5GQUtFIFNQSU5ORVIuLi48L2Rpdj5cbn1cbiBjb25zdCBTaG93c0NvbXBvbmVudCA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KFwiLi9TaG93c1wiKSk7XG5cblxuXG5jb25zdCBGb290ZXIgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgLy8gPFJlYWN0LlN0cmljdE1vZGU+ICBcbiAgICAvLyAgIDxEYXRhUHJvdmlkZXIgZGF0YT17ZGF0YX0+XG4gICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyLWZsdWlkIHRleHQtY2VudGVyXCI+XG4gICAgLy8gICAgICAgPGgyPlN1YkFwcCBGb290ZXI8L2gyPlxuICAgIC8vICAgICAgIDxSZWFjdC5TdXNwZW5zZSBmYWxsYmFjaz17PFNwaW5uZXIgLz59PiAgICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgPENvbW1lbnRzIC8+XG4gICAgLy8gICAgICAgPC9SZWFjdC5TdXNwZW5zZT5cbiAgICAvLyAgICAgPC9kaXY+XG4gICAgLy8gICA8L0RhdGFQcm92aWRlcj5cbiAgICAvLyA8L1JlYWN0LlN0cmljdE1vZGU+XG4gICAgPGRpdj5cbiAgICAgIDxSZWFjdC5TdXNwZW5zZSBmYWxsYmFjaz17PHA+Q291bGQgbm90IGZldGNoIFRWIHNob3dzLjwvcD59PlxuICAgICAgICA8U2hvd3NDb21wb25lbnQgLz5cbiAgICAgIDwvUmVhY3QuU3VzcGVuc2U+XG4gICAgPC9kaXY+XG4gICk7IFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZFN1YkFwcCh7XG4gIG5hbWU6IFwiRm9vdGVyXCIsXG4gIENvbXBvbmVudDogRm9vdGVyLFxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUdBLE1BQU1BLFFBQVEsR0FBR0Msa0JBQUEsQ0FBTUMsSUFBTixDQUFXLG1FQUFhLFlBQWIsR0FBWCxDQUFqQjs7QUFFQSxNQUFNQyxJQUFJLEdBQUcsSUFBQUMsc0JBQUEsR0FBYjs7QUFFQSxNQUFNQyxPQUFPLEdBQUksTUFBTTtFQUNyQixvQkFBTyxnRUFBUDtBQUNELENBRkQ7O0FBR0MsTUFBTUMsY0FBYyxHQUFHTCxrQkFBQSxDQUFNQyxJQUFOLENBQVcsbUVBQWEsU0FBYixHQUFYLENBQXZCOztBQUlELE1BQU1LLE1BQU0sR0FBRyxNQUFNO0VBQ25CO0lBQUE7SUFDRTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLDJEQUNFLGlDQUFDLGtCQUFELENBQU8sUUFBUDtNQUFnQixRQUFRLGVBQUU7SUFBMUIsZ0JBQ0UsaUNBQUMsY0FBRCxPQURGLENBREY7RUFYRjtBQWlCRCxDQWxCRDs7ZUFvQmUsSUFBQUMsdUJBQUEsRUFBVztFQUN4QkMsSUFBSSxFQUFFLFFBRGtCO0VBRXhCQyxTQUFTLEVBQUVIO0FBRmEsQ0FBWCxDIn0=