"use strict";

const optionalRequire = require("optional-require")(require);
const chai = require("chai");
const sinonChai = optionalRequire("sinon-chai");
const chaiShallowly = require("chai-shallowly");
const chaiAsPromised = require("chai-as-promised");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiAsPromised);
if (sinonChai) {
  chai.use(sinonChai);
}
chai.use(chaiShallowly);

chai.config.includeStack = true;

global.expect = chai.expect;
