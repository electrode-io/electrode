"use strict";

const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiShallowly = require("chai-shallowly");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiShallowly);

chai.config.includeStack = true;

global.expect = chai.expect;
