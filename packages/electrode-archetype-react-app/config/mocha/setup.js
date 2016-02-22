"use strict";

var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.use(sinonChai);

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
