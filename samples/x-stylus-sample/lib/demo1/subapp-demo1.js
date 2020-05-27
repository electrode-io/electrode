"use strict";

exports.__esModule = true;
exports.default = void 0;

var _subappReact = require("subapp-react");

const Demo1 = props => {
  return /*#__PURE__*/_subappReact.React.createElement("div", {
    style: {
      padding: "5px",
      border: "solid",
      marginLeft: "15%",
      marginRight: "15%"
    }
  }, /*#__PURE__*/_subappReact.React.createElement("p", null, "subapp demo1"), "props: ", JSON.stringify(props), /*#__PURE__*/_subappReact.React.createElement("p", null, /*#__PURE__*/_subappReact.React.createElement("a", {
    href: "http://docs.electrode.io"
  }, "Electrode Docs")));
};

var _default = (0, _subappReact.loadSubApp)({
  Component: Demo1,
  name: "Demo1",
  prepare: () => {
    return {
      data: "hello from demo1"
    };
  }
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZW1vMS9zdWJhcHAtZGVtbzEuanMiXSwibmFtZXMiOlsiRGVtbzEiLCJwcm9wcyIsInBhZGRpbmciLCJib3JkZXIiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJKU09OIiwic3RyaW5naWZ5IiwiQ29tcG9uZW50IiwibmFtZSIsInByZXBhcmUiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBLE1BQU1BLEtBQUssR0FBR0MsS0FBSyxJQUFJO0FBQ3JCLHNCQUNFO0FBQUssSUFBQSxLQUFLLEVBQUU7QUFBRUMsTUFBQUEsT0FBTyxFQUFFLEtBQVg7QUFBa0JDLE1BQUFBLE1BQU0sRUFBRSxPQUExQjtBQUFtQ0MsTUFBQUEsVUFBVSxFQUFFLEtBQS9DO0FBQXNEQyxNQUFBQSxXQUFXLEVBQUU7QUFBbkU7QUFBWixrQkFDRSwyREFERixhQUVVQyxJQUFJLENBQUNDLFNBQUwsQ0FBZU4sS0FBZixDQUZWLGVBR0UseURBQ0U7QUFBRyxJQUFBLElBQUksRUFBQztBQUFSLHNCQURGLENBSEYsQ0FERjtBQVNELENBVkQ7O2VBWWUsNkJBQVc7QUFDeEJPLEVBQUFBLFNBQVMsRUFBRVIsS0FEYTtBQUV4QlMsRUFBQUEsSUFBSSxFQUFFLE9BRmtCO0FBR3hCQyxFQUFBQSxPQUFPLEVBQUUsTUFBTTtBQUNiLFdBQU87QUFBRUMsTUFBQUEsSUFBSSxFQUFFO0FBQVIsS0FBUDtBQUNEO0FBTHVCLENBQVgsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0LCBsb2FkU3ViQXBwIH0gZnJvbSBcInN1YmFwcC1yZWFjdFwiO1xuXG5jb25zdCBEZW1vMSA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6IFwiNXB4XCIsIGJvcmRlcjogXCJzb2xpZFwiLCBtYXJnaW5MZWZ0OiBcIjE1JVwiLCBtYXJnaW5SaWdodDogXCIxNSVcIiB9fT5cbiAgICAgIDxwPnN1YmFwcCBkZW1vMTwvcD5cbiAgICAgIHByb3BzOiB7SlNPTi5zdHJpbmdpZnkocHJvcHMpfVxuICAgICAgPHA+XG4gICAgICAgIDxhIGhyZWY9XCJodHRwOi8vZG9jcy5lbGVjdHJvZGUuaW9cIj5FbGVjdHJvZGUgRG9jczwvYT5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRTdWJBcHAoe1xuICBDb21wb25lbnQ6IERlbW8xLFxuICBuYW1lOiBcIkRlbW8xXCIsXG4gIHByZXBhcmU6ICgpID0+IHtcbiAgICByZXR1cm4geyBkYXRhOiBcImhlbGxvIGZyb20gZGVtbzFcIiB9O1xuICB9XG59KTtcbiJdfQ==