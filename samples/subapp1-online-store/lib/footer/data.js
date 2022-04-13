"use strict";

exports.__esModule = true;
exports.DataProvider = DataProvider;
exports.createServerData = createServerData;
exports.useData = useData;
exports.useDataHook = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.
const DataContext = /*#__PURE__*/(0, _react.createContext)(null);

function DataProvider({
  children,
  data
}) {
  return /*#__PURE__*/_react.default.createElement(DataContext.Provider, {
    value: data
  }, children);
} // In a real implementation the data would be streamed with the HTML.
// We haven't integrated this part yet, so we'll just use fake data.


const fakeData = ["This is a user comment,", "This is a another user comment.", "This too... I like marshmallows."];

function useData() {
  const ctx = (0, _react.useContext)(DataContext);

  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    ctx.read();
  }

  return fakeData;
}

function createServerData() {
  let done = false;
  let promise = null;
  return {
    read() {
      if (done) {
        return;
      }

      if (promise) {
        throw promise;
      }

      promise = new Promise(resolve => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, 2500);
      });
      throw promise;
    }

  };
}

const useDataHook = () => {
  const [data, setData] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      setData({
        foo: "bar"
      });
    }, 2500);
  }, []);
  return {
    data,
    isLoading: !data
  };
};

exports.useDataHook = useDataHook;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEYXRhQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJEYXRhUHJvdmlkZXIiLCJjaGlsZHJlbiIsImRhdGEiLCJmYWtlRGF0YSIsInVzZURhdGEiLCJjdHgiLCJ1c2VDb250ZXh0IiwicmVhZCIsImNyZWF0ZVNlcnZlckRhdGEiLCJkb25lIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInVzZURhdGFIb29rIiwic2V0RGF0YSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiZm9vIiwiaXNMb2FkaW5nIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zvb3Rlci9kYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIE5vdGU6IHRoaXMgZmlsZSBkb2VzIG5vdCBkZW1vbnN0cmF0ZSBhIHJlYWwgZGF0YSBmZXRjaGluZyBzdHJhdGVneS5cbi8vIFdlIG9ubHkgdXNlIHRoaXMgdG8gc2ltdWxhdGUgZGF0YSBmZXRjaGluZyBoYXBwZW5pbmcgb24gdGhlIHNlcnZlclxuLy8gd2hpbGUgdGhlIGNhY2hlIGlzIHBvcHVsYXRlZCBvbiB0aGUgY2xpZW50LiBJbiBhIHJlYWwgYXBwLCB5b3Ugd291bGRcbi8vIGluc3RlYWQgdXNlIGEgZGF0YSBmZXRjaGluZyBsaWJyYXJ5IG9yIFNlcnZlciBDb21wb25lbnRzIGZvciB0aGlzLlxuXG5jb25zdCBEYXRhQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhUHJvdmlkZXIoeyBjaGlsZHJlbiwgZGF0YSB9KSB7XG4gIHJldHVybiA8RGF0YUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2RhdGF9PntjaGlsZHJlbn08L0RhdGFDb250ZXh0LlByb3ZpZGVyPjtcbn1cblxuLy8gSW4gYSByZWFsIGltcGxlbWVudGF0aW9uIHRoZSBkYXRhIHdvdWxkIGJlIHN0cmVhbWVkIHdpdGggdGhlIEhUTUwuXG4vLyBXZSBoYXZlbid0IGludGVncmF0ZWQgdGhpcyBwYXJ0IHlldCwgc28gd2UnbGwganVzdCB1c2UgZmFrZSBkYXRhLlxuY29uc3QgZmFrZURhdGEgPSBbXG4gIFwiVGhpcyBpcyBhIHVzZXIgY29tbWVudCxcIixcbiAgXCJUaGlzIGlzIGEgYW5vdGhlciB1c2VyIGNvbW1lbnQuXCIsXG4gIFwiVGhpcyB0b28uLi4gSSBsaWtlIG1hcnNobWFsbG93cy5cIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VEYXRhKCkge1xuICBjb25zdCBjdHggPSB1c2VDb250ZXh0KERhdGFDb250ZXh0KTtcbiAgaWYgKGN0eCAhPT0gbnVsbCkge1xuICAgIC8vIFRoaXMgY29udGV4dCBpcyBvbmx5IHByb3ZpZGVkIG9uIHRoZSBzZXJ2ZXIuXG4gICAgLy8gSXQgaXMgaGVyZSB0byBzaW11bGF0ZSBhIHN1c3BlbmRpbmcgZGF0YSBmZXRjaC5cbiAgICBjdHgucmVhZCgpO1xuICB9XG4gIHJldHVybiBmYWtlRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcnZlckRhdGEoKSB7XG4gIGxldCBkb25lID0gZmFsc2U7XG4gIGxldCBwcm9taXNlID0gbnVsbDtcbiAgcmV0dXJuIHtcbiAgICByZWFkKCkge1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgdGhyb3cgcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICBwcm9taXNlID0gbnVsbDtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0sMjUwMCk7XG4gICAgICB9KTtcbiAgICAgIHRocm93IHByb21pc2U7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZURhdGFIb29rID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCk9PntcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBzZXREYXRhKHtmb286IFwiYmFyXCJ9KVxuICAgIH0sMjUwMClcbiAgfSxbXSlcblxuICByZXR1cm4geyBkYXRhLCBpc0xvYWRpbmc6ICFkYXRhIH1cbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsTUFBTUEsV0FBVyxnQkFBRyxJQUFBQyxvQkFBQSxFQUFjLElBQWQsQ0FBcEI7O0FBRU8sU0FBU0MsWUFBVCxDQUFzQjtFQUFFQyxRQUFGO0VBQVlDO0FBQVosQ0FBdEIsRUFBMEM7RUFDL0Msb0JBQU8sNkJBQUMsV0FBRCxDQUFhLFFBQWI7SUFBc0IsS0FBSyxFQUFFQTtFQUE3QixHQUFvQ0QsUUFBcEMsQ0FBUDtBQUNELEMsQ0FFRDtBQUNBOzs7QUFDQSxNQUFNRSxRQUFRLEdBQUcsQ0FDZix5QkFEZSxFQUVmLGlDQUZlLEVBR2Ysa0NBSGUsQ0FBakI7O0FBTU8sU0FBU0MsT0FBVCxHQUFtQjtFQUN4QixNQUFNQyxHQUFHLEdBQUcsSUFBQUMsaUJBQUEsRUFBV1IsV0FBWCxDQUFaOztFQUNBLElBQUlPLEdBQUcsS0FBSyxJQUFaLEVBQWtCO0lBQ2hCO0lBQ0E7SUFDQUEsR0FBRyxDQUFDRSxJQUFKO0VBQ0Q7O0VBQ0QsT0FBT0osUUFBUDtBQUNEOztBQUVNLFNBQVNLLGdCQUFULEdBQTRCO0VBQ2pDLElBQUlDLElBQUksR0FBRyxLQUFYO0VBQ0EsSUFBSUMsT0FBTyxHQUFHLElBQWQ7RUFDQSxPQUFPO0lBQ0xILElBQUksR0FBRztNQUNMLElBQUlFLElBQUosRUFBVTtRQUNSO01BQ0Q7O01BQ0QsSUFBSUMsT0FBSixFQUFhO1FBQ1gsTUFBTUEsT0FBTjtNQUNEOztNQUNEQSxPQUFPLEdBQUcsSUFBSUMsT0FBSixDQUFhQyxPQUFELElBQWE7UUFDakNDLFVBQVUsQ0FBQyxNQUFNO1VBQ2ZKLElBQUksR0FBRyxJQUFQO1VBQ0FDLE9BQU8sR0FBRyxJQUFWO1VBQ0FFLE9BQU87UUFDUixDQUpTLEVBSVIsSUFKUSxDQUFWO01BS0QsQ0FOUyxDQUFWO01BT0EsTUFBTUYsT0FBTjtJQUNEOztFQWhCSSxDQUFQO0FBa0JEOztBQUVNLE1BQU1JLFdBQVcsR0FBRyxNQUFNO0VBQy9CLE1BQU0sQ0FBQ1osSUFBRCxFQUFPYSxPQUFQLElBQWtCLElBQUFDLGVBQUEsRUFBUyxJQUFULENBQXhCO0VBRUEsSUFBQUMsZ0JBQUEsRUFBVSxNQUFJO0lBQ1pKLFVBQVUsQ0FBQyxNQUFJO01BQ2JFLE9BQU8sQ0FBQztRQUFDRyxHQUFHLEVBQUU7TUFBTixDQUFELENBQVA7SUFDRCxDQUZTLEVBRVIsSUFGUSxDQUFWO0VBR0QsQ0FKRCxFQUlFLEVBSkY7RUFNQSxPQUFPO0lBQUVoQixJQUFGO0lBQVFpQixTQUFTLEVBQUUsQ0FBQ2pCO0VBQXBCLENBQVA7QUFDRCxDQVZNIn0=