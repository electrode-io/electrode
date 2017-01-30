"use strict";

var chai = require("chai");
var sinonChai = require("sinon-chai");
var chaiShallowly = require("chai-shallowly");

chai.use(sinonChai);
chai.use(chaiShallowly);

chai.config.includeStack = true;

global.expect = chai.expect;
