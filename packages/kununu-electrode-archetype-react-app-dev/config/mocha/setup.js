"use strict";

const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiShallowly = require("chai-shallowly");

chai.use(sinonChai);
chai.use(chaiShallowly);

chai.config.includeStack = true;

global.expect = chai.expect;
