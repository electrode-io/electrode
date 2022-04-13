"use strict";

exports.__esModule = true;
exports.subapp = void 0;

var _react = require("@xarc/react");

var _reactQuery = require("@xarc/react-query");

var _reactQueryFetch = require("./react-query-fetch");

var _info = require("../info");

var _displayInfo = require("./display-info");

//
// A more complicate demo subapp using Redux
//
// Note: using redux requires top level Redux store initialization so if another
// subapp tries to use this as a dynamic component, then it must also uses redux and
// provides the redux top level store facility.
//
const Demo3 = () => {
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
      marginRight: "15%"
    }
  }, /*#__PURE__*/_react.React.createElement("h2", null, "subapp demo3 with react-query"), "data: ", /*#__PURE__*/_react.React.createElement("pre", null, JSON.stringify(data)), /*#__PURE__*/_react.React.createElement(_displayInfo.DisplayInfo, null)), /*#__PURE__*/_react.React.createElement("p", {
    style: {
      textAlign: "center"
    }
  }, _info.copyRightMessage));
};

const subapp = {
  Component: Demo3,
  wantFeatures: [(0, _reactQuery.reactQueryFeature)({
    React: _react.React,
    serverModule: require.resolve("./react-query-fetch")
  })]
};
exports.subapp = subapp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZW1vMyIsImRhdGEiLCJ1c2VRdWVyeSIsImRlbW8zUXVlcnlGbiIsInN0YWxlVGltZSIsInBhZGRpbmciLCJtYXJnaW5Ub3AiLCJib3JkZXIiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJKU09OIiwic3RyaW5naWZ5IiwidGV4dEFsaWduIiwiY29weVJpZ2h0TWVzc2FnZSIsInN1YmFwcCIsIkNvbXBvbmVudCIsIndhbnRGZWF0dXJlcyIsInJlYWN0UXVlcnlGZWF0dXJlIiwiUmVhY3QiLCJzZXJ2ZXJNb2R1bGUiLCJyZXF1aXJlIiwicmVzb2x2ZSJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZW1vMy9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEEgbW9yZSBjb21wbGljYXRlIGRlbW8gc3ViYXBwIHVzaW5nIFJlZHV4XG4vL1xuLy8gTm90ZTogdXNpbmcgcmVkdXggcmVxdWlyZXMgdG9wIGxldmVsIFJlZHV4IHN0b3JlIGluaXRpYWxpemF0aW9uIHNvIGlmIGFub3RoZXJcbi8vIHN1YmFwcCB0cmllcyB0byB1c2UgdGhpcyBhcyBhIGR5bmFtaWMgY29tcG9uZW50LCB0aGVuIGl0IG11c3QgYWxzbyB1c2VzIHJlZHV4IGFuZFxuLy8gcHJvdmlkZXMgdGhlIHJlZHV4IHRvcCBsZXZlbCBzdG9yZSBmYWNpbGl0eS5cbi8vXG5cbmltcG9ydCB7IFJlYWN0LCBSZWFjdFN1YkFwcCB9IGZyb20gXCJAeGFyYy9yZWFjdFwiO1xuaW1wb3J0IHsgcmVhY3RRdWVyeUZlYXR1cmUsIHVzZVF1ZXJ5IH0gZnJvbSBcIkB4YXJjL3JlYWN0LXF1ZXJ5XCI7XG5pbXBvcnQgeyBkZW1vM1F1ZXJ5Rm4gfSBmcm9tIFwiLi9yZWFjdC1xdWVyeS1mZXRjaFwiO1xuaW1wb3J0IHsgY29weVJpZ2h0TWVzc2FnZSB9IGZyb20gXCIuLi9pbmZvXCI7XG5pbXBvcnQgeyBEaXNwbGF5SW5mbyB9IGZyb20gXCIuL2Rpc3BsYXktaW5mb1wiO1xuXG5jb25zdCBEZW1vMyA9ICgpID0+IHtcbiAgY29uc3QgeyBkYXRhIH0gPSB1c2VRdWVyeShcImRlbW8zXCIsIGRlbW8zUXVlcnlGbiwgeyBzdGFsZVRpbWU6IDIwMDAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBhZGRpbmc6IFwiNXB4XCIsXG4gICAgICAgICAgbWFyZ2luVG9wOiBcIjE1cHhcIixcbiAgICAgICAgICBib3JkZXI6IFwic29saWRcIixcbiAgICAgICAgICBtYXJnaW5MZWZ0OiBcIjE1JVwiLFxuICAgICAgICAgIG1hcmdpblJpZ2h0OiBcIjE1JVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8aDI+c3ViYXBwIGRlbW8zIHdpdGggcmVhY3QtcXVlcnk8L2gyPlxuICAgICAgICBkYXRhOiA8cHJlPntKU09OLnN0cmluZ2lmeShkYXRhKX08L3ByZT5cbiAgICAgICAgPERpc3BsYXlJbmZvIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxwIHN0eWxlPXt7IHRleHRBbGlnbjogXCJjZW50ZXJcIiB9fT57Y29weVJpZ2h0TWVzc2FnZX08L3A+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3ViYXBwOiBSZWFjdFN1YkFwcCA9IHtcbiAgQ29tcG9uZW50OiBEZW1vMyxcbiAgd2FudEZlYXR1cmVzOiBbXG4gICAgcmVhY3RRdWVyeUZlYXR1cmUoe1xuICAgICAgUmVhY3QsXG4gICAgICBzZXJ2ZXJNb2R1bGU6IHJlcXVpcmUucmVzb2x2ZShcIi4vcmVhY3QtcXVlcnktZmV0Y2hcIiksXG4gICAgfSksXG4gIF0sXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQVFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUUEsTUFBTUEsS0FBSyxHQUFHLE1BQU07RUFDbEIsTUFBTTtJQUFFQztFQUFGLElBQVcsSUFBQUMsb0JBQUEsRUFBUyxPQUFULEVBQWtCQyw2QkFBbEIsRUFBZ0M7SUFBRUMsU0FBUyxFQUFFO0VBQWIsQ0FBaEMsQ0FBakI7RUFFQSxvQkFDRSxxREFDRTtJQUNFLEtBQUssRUFBRTtNQUNMQyxPQUFPLEVBQUUsS0FESjtNQUVMQyxTQUFTLEVBQUUsTUFGTjtNQUdMQyxNQUFNLEVBQUUsT0FISDtNQUlMQyxVQUFVLEVBQUUsS0FKUDtNQUtMQyxXQUFXLEVBQUU7SUFMUjtFQURULGdCQVNFLHVFQVRGLHlCQVVRLHdDQUFNQyxJQUFJLENBQUNDLFNBQUwsQ0FBZVYsSUFBZixDQUFOLENBVlIsZUFXRSwyQkFBQyx3QkFBRCxPQVhGLENBREYsZUFjRTtJQUFHLEtBQUssRUFBRTtNQUFFVyxTQUFTLEVBQUU7SUFBYjtFQUFWLEdBQW9DQyxzQkFBcEMsQ0FkRixDQURGO0FBa0JELENBckJEOztBQXVCTyxNQUFNQyxNQUFtQixHQUFHO0VBQ2pDQyxTQUFTLEVBQUVmLEtBRHNCO0VBRWpDZ0IsWUFBWSxFQUFFLENBQ1osSUFBQUMsNkJBQUEsRUFBa0I7SUFDaEJDLEtBQUssRUFBTEEsWUFEZ0I7SUFFaEJDLFlBQVksRUFBRUMsT0FBTyxDQUFDQyxPQUFSLENBQWdCLHFCQUFoQjtFQUZFLENBQWxCLENBRFk7QUFGbUIsQ0FBNUIifQ==