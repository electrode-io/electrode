const d3 = require("d3");

const scheme = {
  name: "Original",
  background: "#6A4A3C",
  specials: {
    node_modules: "#FF8553" //eslint-disable-line camelcase
  },
  main: [
    "#00A0B0",
    "#CC333F",
    "#EB6841",
    "#EDC951"
  ]
};
const lighten = (n) => (c) => String(d3.rgb(c).brighter(n));
scheme.main = []
  .concat(scheme.main.map(lighten(0.7)))
  .concat(scheme.main.map(lighten(1.4)))
  .concat(scheme.main.map(lighten(2.0)));
scheme.all = scheme.main.slice();
scheme.modifier = (a) => a;

module.exports = scheme;
