"use strict";

exports.__esModule = true;
exports.default = void 0;
var _subappReact = require("subapp-react");
/* eslint-disable no-magic-numbers */

let data;
class Data1 extends _subappReact.React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!data) {
      throw new Promise(resolve => {
        setTimeout(() => {
          data = "demo data received from async call";
          resolve(data);
        }, 2500);
      });
    }
    return /*#__PURE__*/_subappReact.React.createElement("div", null, data);
  }
}
class SuspenseDemo extends _subappReact.React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/_subappReact.React.createElement(_subappReact.AppContext.Consumer, null, ({
      isSsr,
      ssr,
      subApp
    }) => {
      return /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("div", null, "IS_SSR: ", `${Boolean(isSsr)}`, " HAS_REQUEST: ", ssr && ssr.request ? "yes" : "no"), /*#__PURE__*/_subappReact.React.createElement(_subappReact.React.Suspense, {
        fallback: /*#__PURE__*/_subappReact.React.createElement("div", null, "suspense demo waiting for data...")
      }, /*#__PURE__*/_subappReact.React.createElement("div", null, "Suspense Demo Received Data", /*#__PURE__*/_subappReact.React.createElement(Data1, null))));
    });
  }
}
var _default = (0, _subappReact.loadSubApp)({
  name: "SuspenseDemo",
  Component: SuspenseDemo
});
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRhIiwiRGF0YTEiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJyZW5kZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJTdXNwZW5zZURlbW8iLCJpc1NzciIsInNzciIsInN1YkFwcCIsIkJvb2xlYW4iLCJyZXF1ZXN0IiwibG9hZFN1YkFwcCIsIm5hbWUiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvMDYuc3VzcGVuc2UtZGVtby9zdWJhcHAtc3VzcGVuc2UtZGVtby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1tYWdpYy1udW1iZXJzICovXG5cbmltcG9ydCB7IFJlYWN0LCBsb2FkU3ViQXBwLCBBcHBDb250ZXh0IH0gZnJvbSBcInN1YmFwcC1yZWFjdFwiO1xuXG5sZXQgZGF0YTtcblxuY2xhc3MgRGF0YTEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBkYXRhID0gXCJkZW1vIGRhdGEgcmVjZWl2ZWQgZnJvbSBhc3luYyBjYWxsXCI7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSwgMjUwMCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIDxkaXY+e2RhdGF9PC9kaXY+O1xuICB9XG59XG5cbmNsYXNzIFN1c3BlbnNlRGVtbyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QXBwQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgeyh7IGlzU3NyLCBzc3IsIHN1YkFwcCB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgSVNfU1NSOiB7YCR7Qm9vbGVhbihpc1Nzcil9YH0gSEFTX1JFUVVFU1Q6IHtzc3IgJiYgc3NyLnJlcXVlc3QgPyBcInllc1wiIDogXCJub1wifVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPFJlYWN0LlN1c3BlbnNlIGZhbGxiYWNrPXs8ZGl2PnN1c3BlbnNlIGRlbW8gd2FpdGluZyBmb3IgZGF0YS4uLjwvZGl2Pn0+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIFN1c3BlbnNlIERlbW8gUmVjZWl2ZWQgRGF0YVxuICAgICAgICAgICAgICAgICAgPERhdGExIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvUmVhY3QuU3VzcGVuc2U+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9fVxuICAgICAgPC9BcHBDb250ZXh0LkNvbnN1bWVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZFN1YkFwcCh7XG4gIG5hbWU6IFwiU3VzcGVuc2VEZW1vXCIsXG4gIENvbXBvbmVudDogU3VzcGVuc2VEZW1vXG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBO0FBRkE7O0FBSUEsSUFBSUEsSUFBSTtBQUVSLE1BQU1DLEtBQUssU0FBU0Msa0JBQUssQ0FBQ0MsU0FBUyxDQUFDO0VBQ2xDQyxXQUFXLENBQUNDLEtBQUssRUFBRTtJQUNqQixLQUFLLENBQUNBLEtBQUssQ0FBQztFQUNkO0VBRUFDLE1BQU0sR0FBRztJQUNQLElBQUksQ0FBQ04sSUFBSSxFQUFFO01BQ1QsTUFBTSxJQUFJTyxPQUFPLENBQUNDLE9BQU8sSUFBSTtRQUMzQkMsVUFBVSxDQUFDLE1BQU07VUFDZlQsSUFBSSxHQUFHLG9DQUFvQztVQUMzQ1EsT0FBTyxDQUFDUixJQUFJLENBQUM7UUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ1YsQ0FBQyxDQUFDO0lBQ0o7SUFDQSxvQkFBTyw4Q0FBTUEsSUFBSSxDQUFPO0VBQzFCO0FBQ0Y7QUFFQSxNQUFNVSxZQUFZLFNBQVNSLGtCQUFLLENBQUNDLFNBQVMsQ0FBQztFQUN6Q0MsV0FBVyxDQUFDQyxLQUFLLEVBQUU7SUFDakIsS0FBSyxDQUFDQSxLQUFLLENBQUM7RUFDZDtFQUVBQyxNQUFNLEdBQUc7SUFDUCxvQkFDRSxpQ0FBQyx1QkFBVSxDQUFDLFFBQVEsUUFDakIsQ0FBQztNQUFFSyxLQUFLO01BQUVDLEdBQUc7TUFBRUM7SUFBTyxDQUFDLEtBQUs7TUFDM0Isb0JBQ0UsMkRBQ0UsMERBQ1ksR0FBRUMsT0FBTyxDQUFDSCxLQUFLLENBQUUsRUFBQyxvQkFBZ0JDLEdBQUcsSUFBSUEsR0FBRyxDQUFDRyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FDekUsZUFDTixpQ0FBQyxrQkFBSyxDQUFDLFFBQVE7UUFBQyxRQUFRLGVBQUU7TUFBNkMsZ0JBQ3JFLDBGQUVFLGlDQUFDLEtBQUssT0FBRyxDQUNMLENBQ1MsQ0FDYjtJQUVWLENBQUMsQ0FDbUI7RUFFMUI7QUFDRjtBQUFDLGVBRWMsSUFBQUMsdUJBQVUsRUFBQztFQUN4QkMsSUFBSSxFQUFFLGNBQWM7RUFDcEJkLFNBQVMsRUFBRU87QUFDYixDQUFDLENBQUM7QUFBQSJ9