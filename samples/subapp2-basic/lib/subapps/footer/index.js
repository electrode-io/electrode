"use strict";

exports.__esModule = true;
exports.subapp = void 0;

var _react = require("@xarc/react");

var _reactQuery = require("@xarc/react-query");

var _reactQueryFetch = require("./react-query-fetch");

var _displayInfo = require("./display-info");

//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//
const Footer = () => {
  const {
    data
  } = (0, _reactQuery.useQuery)("demo3", _reactQueryFetch.demo3QueryFn, {
    staleTime: 2000
  });
  return /*#__PURE__*/_react.React.createElement("div", null, /*#__PURE__*/_react.React.createElement("div", {
    style: {
      padding: "5px",
      marginTop: "15px",
      border: "solid",
      marginLeft: "15%",
      marginRight: "15%",
      textAlign: "center"
    }
  }, /*#__PURE__*/_react.React.createElement("h2", null, "Footer subApp with react-query"), "data: ", /*#__PURE__*/_react.React.createElement("pre", null, JSON.stringify(data)), /*#__PURE__*/_react.React.createElement(_displayInfo.DisplayInfo, null)));
};

const subapp = {
  Component: Footer,
  wantFeatures: [(0, _reactQuery.reactQueryFeature)({
    React: _react.React,
    serverModule: require.resolve("./react-query-fetch")
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGb290ZXIiLCJkYXRhIiwidXNlUXVlcnkiLCJkZW1vM1F1ZXJ5Rm4iLCJzdGFsZVRpbWUiLCJwYWRkaW5nIiwibWFyZ2luVG9wIiwiYm9yZGVyIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwidGV4dEFsaWduIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1YmFwcCIsIkNvbXBvbmVudCIsIndhbnRGZWF0dXJlcyIsInJlYWN0UXVlcnlGZWF0dXJlIiwiUmVhY3QiLCJzZXJ2ZXJNb2R1bGUiLCJyZXF1aXJlIiwicmVzb2x2ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdWJhcHBzL2Zvb3Rlci9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEEgbW9yZSBjb21wbGljYXRlIGRlbW8gc3ViYXBwIHVzaW5nIFJlZHV4XG4vL1xuLy8gTm90ZTogdXNpbmcgcmVkdXggcmVxdWlyZXMgdG9wIGxldmVsIFJlZHV4IHN0b3JlIGluaXRpYWxpemF0aW9uIHNvIGlmIGFub3RoZXJcbi8vIHN1YmFwcCB0cmllcyB0byB1c2UgdGhpcyBhcyBhIGR5bmFtaWMgY29tcG9uZW50LCB0aGVuIGl0IG11c3QgYWxzbyB1c2VzIHJlZHV4IGFuZFxuLy8gcHJvdmlkZXMgdGhlIHJlZHV4IHRvcCBsZXZlbCBzdG9yZSBmYWNpbGl0eS5cbi8vXG5cbmltcG9ydCB7IFJlYWN0LCBSZWFjdFN1YkFwcCB9IGZyb20gXCJAeGFyYy9yZWFjdFwiO1xuaW1wb3J0IHsgcmVhY3RRdWVyeUZlYXR1cmUsIHVzZVF1ZXJ5IH0gZnJvbSBcIkB4YXJjL3JlYWN0LXF1ZXJ5XCI7XG5pbXBvcnQgeyBkZW1vM1F1ZXJ5Rm4gfSBmcm9tIFwiLi9yZWFjdC1xdWVyeS1mZXRjaFwiO1xuaW1wb3J0IHsgRGlzcGxheUluZm8gfSBmcm9tIFwiLi9kaXNwbGF5LWluZm9cIjtcblxuY29uc3QgRm9vdGVyID0gKCkgPT4ge1xuICBjb25zdCB7IGRhdGEgfSA9IHVzZVF1ZXJ5KFwiZGVtbzNcIiwgZGVtbzNRdWVyeUZuLCB7IHN0YWxlVGltZTogMjAwMCB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcGFkZGluZzogXCI1cHhcIixcbiAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTVweFwiLFxuICAgICAgICAgIGJvcmRlcjogXCJzb2xpZFwiLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IFwiMTUlXCIsXG4gICAgICAgICAgbWFyZ2luUmlnaHQ6IFwiMTUlXCIsXG4gICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8aDI+Rm9vdGVyIHN1YkFwcCB3aXRoIHJlYWN0LXF1ZXJ5PC9oMj5cbiAgICAgICAgZGF0YTogPHByZT57SlNPTi5zdHJpbmdpZnkoZGF0YSl9PC9wcmU+XG4gICAgICAgIDxEaXNwbGF5SW5mbyAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3ViYXBwOiBSZWFjdFN1YkFwcCA9IHtcbiAgQ29tcG9uZW50OiBGb290ZXIsXG4gIHdhbnRGZWF0dXJlczogW1xuICAgIHJlYWN0UXVlcnlGZWF0dXJlKHtcbiAgICAgIFJlYWN0LFxuICAgICAgc2VydmVyTW9kdWxlOiByZXF1aXJlLnJlc29sdmUoXCIuL3JlYWN0LXF1ZXJ5LWZldGNoXCIpLFxuICAgIH0pLFxuICBdLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BLE1BQU1BLE1BQU0sR0FBRyxNQUFNO0VBQ25CLE1BQU07SUFBRUM7RUFBRixJQUFXLElBQUFDLG9CQUFBLEVBQVMsT0FBVCxFQUFrQkMsNkJBQWxCLEVBQWdDO0lBQUVDLFNBQVMsRUFBRTtFQUFiLENBQWhDLENBQWpCO0VBRUEsb0JBQ0UscURBQ0U7SUFDRSxLQUFLLEVBQUU7TUFDTEMsT0FBTyxFQUFFLEtBREo7TUFFTEMsU0FBUyxFQUFFLE1BRk47TUFHTEMsTUFBTSxFQUFFLE9BSEg7TUFJTEMsVUFBVSxFQUFFLEtBSlA7TUFLTEMsV0FBVyxFQUFFLEtBTFI7TUFNTEMsU0FBUyxFQUFFO0lBTk47RUFEVCxnQkFVRSx3RUFWRix5QkFXUSx3Q0FBTUMsSUFBSSxDQUFDQyxTQUFMLENBQWVYLElBQWYsQ0FBTixDQVhSLGVBWUUsMkJBQUMsd0JBQUQsT0FaRixDQURGLENBREY7QUFrQkQsQ0FyQkQ7O0FBdUJPLE1BQU1ZLE1BQW1CLEdBQUc7RUFDakNDLFNBQVMsRUFBRWQsTUFEc0I7RUFFakNlLFlBQVksRUFBRSxDQUNaLElBQUFDLDZCQUFBLEVBQWtCO0lBQ2hCQyxLQUFLLEVBQUxBLFlBRGdCO0lBRWhCQyxZQUFZLEVBQUVDLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixxQkFBaEI7RUFGRSxDQUFsQixDQURZO0FBRm1CLENBQTVCIn0=