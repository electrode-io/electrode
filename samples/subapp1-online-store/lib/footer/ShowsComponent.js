"use strict";

exports.__esModule = true;
exports.default = void 0;

var _subappReact = require("subapp-react");

var _Shows = require("./Shows");

const resource = (0, _Shows.fetchShows)();

const formatScore = number => {
  return Math.round(number * 100);
};

const ShowsComponent = () => {
  const shows = resource.read();
  return /*#__PURE__*/_subappReact.React.createElement("div", null, shows.map((show, index) => /*#__PURE__*/_subappReact.React.createElement("div", {
    key: index
  }, /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("img", {
    src: show.show.image ? show.show.image.original : "",
    alt: "Show Poster"
  })), /*#__PURE__*/_subappReact.React.createElement("div", null, /*#__PURE__*/_subappReact.React.createElement("div", null, show.show.name), /*#__PURE__*/_subappReact.React.createElement("div", null, "Score: ", formatScore(show.score)), /*#__PURE__*/_subappReact.React.createElement("div", null, "Status: ", show.show.status), /*#__PURE__*/_subappReact.React.createElement("div", null, "Network: ", show.show.network ? show.show.network.name : "N/A")))));
};

var _default = ShowsComponent;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXNvdXJjZSIsImZldGNoU2hvd3MiLCJmb3JtYXRTY29yZSIsIm51bWJlciIsIk1hdGgiLCJyb3VuZCIsIlNob3dzQ29tcG9uZW50Iiwic2hvd3MiLCJyZWFkIiwibWFwIiwic2hvdyIsImluZGV4IiwiaW1hZ2UiLCJvcmlnaW5hbCIsIm5hbWUiLCJzY29yZSIsInN0YXR1cyIsIm5ldHdvcmsiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZm9vdGVyL1Nob3dzQ29tcG9uZW50LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdCB9IGZyb20gXCJzdWJhcHAtcmVhY3RcIjtcblxuaW1wb3J0IHsgZmV0Y2hTaG93cyB9IGZyb20gXCIuL1Nob3dzXCI7XG5cbmNvbnN0IHJlc291cmNlID0gZmV0Y2hTaG93cygpO1xuXG5jb25zdCBmb3JtYXRTY29yZSA9IChudW1iZXIpID0+IHtcbiAgcmV0dXJuIE1hdGgucm91bmQobnVtYmVyICogMTAwKTtcbiB9O1xuXG5cbiBjb25zdCBTaG93c0NvbXBvbmVudCA9ICgpID0+IHtcbiAgICAgY29uc3Qgc2hvd3MgPSByZXNvdXJjZS5yZWFkKCk7XG4gICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgIHtzaG93cy5tYXAoKHNob3csIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBzcmM9e3Nob3cuc2hvdy5pbWFnZSA/IHNob3cuc2hvdy5pbWFnZS5vcmlnaW5hbCA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgYWx0PVwiU2hvdyBQb3N0ZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gIFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdj57c2hvdy5zaG93Lm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgU2NvcmU6IHtmb3JtYXRTY29yZShzaG93LnNjb3JlKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+U3RhdHVzOiB7c2hvdy5zaG93LnN0YXR1c308L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICBOZXR3b3JrOiB7c2hvdy5zaG93Lm5ldHdvcmsgPyBzaG93LnNob3cubmV0d29yay5uYW1lIDogXCJOL0FcIn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICAgKVxuIH1cbiAgXG4gZXhwb3J0IGRlZmF1bHQgU2hvd3NDb21wb25lbnQ7Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBLE1BQU1BLFFBQVEsR0FBRyxJQUFBQyxpQkFBQSxHQUFqQjs7QUFFQSxNQUFNQyxXQUFXLEdBQUlDLE1BQUQsSUFBWTtFQUM5QixPQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsTUFBTSxHQUFHLEdBQXBCLENBQVA7QUFDQSxDQUZGOztBQUtDLE1BQU1HLGNBQWMsR0FBRyxNQUFNO0VBQ3pCLE1BQU1DLEtBQUssR0FBR1AsUUFBUSxDQUFDUSxJQUFULEVBQWQ7RUFDQSxvQkFDRyw4Q0FDQ0QsS0FBSyxDQUFDRSxHQUFOLENBQVUsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLGtCQUNUO0lBQUssR0FBRyxFQUFFQTtFQUFWLGdCQUNFLDJEQUNFO0lBQ0UsR0FBRyxFQUFFRCxJQUFJLENBQUNBLElBQUwsQ0FBVUUsS0FBVixHQUFrQkYsSUFBSSxDQUFDQSxJQUFMLENBQVVFLEtBQVYsQ0FBZ0JDLFFBQWxDLEdBQTZDLEVBRHBEO0lBRUUsR0FBRyxFQUFDO0VBRk4sRUFERixDQURGLGVBUUUsMkRBQ0UsOENBQU1ILElBQUksQ0FBQ0EsSUFBTCxDQUFVSSxJQUFoQixDQURGLGVBRUUseURBQ1VaLFdBQVcsQ0FBQ1EsSUFBSSxDQUFDSyxLQUFOLENBRHJCLENBRkYsZUFLRSwwREFBY0wsSUFBSSxDQUFDQSxJQUFMLENBQVVNLE1BQXhCLENBTEYsZUFNRSwyREFDWU4sSUFBSSxDQUFDQSxJQUFMLENBQVVPLE9BQVYsR0FBb0JQLElBQUksQ0FBQ0EsSUFBTCxDQUFVTyxPQUFWLENBQWtCSCxJQUF0QyxHQUE2QyxLQUR6RCxDQU5GLENBUkYsQ0FERCxDQURELENBREg7QUF5QkgsQ0EzQkQ7O2VBNkJlUixjIn0=