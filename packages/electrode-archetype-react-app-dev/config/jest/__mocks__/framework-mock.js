"use strict";
const optionalRequire = require("optional-require")(require);

const Enzyme = optionalRequire("enzyme");
const EnzymeAdapter = optionalRequire("enzyme-adapter-react-16");

if (Enzyme && EnzymeAdapter) {
  // Setup enzyme's react adapter
  Enzyme.configure({ adapter: new EnzymeAdapter() });
}
