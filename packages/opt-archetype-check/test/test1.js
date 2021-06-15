"use strict";

const assert = require("assert");

const { isSameMajorVersion } = require("../optional-check");

assert(isSameMajorVersion("1.0.0", "1.2.1") === true);

assert(isSameMajorVersion("~1.0.0", "1.2.1") === true);

assert(isSameMajorVersion("^1.1.0", "1.2.1") === true);

assert(isSameMajorVersion("0.1.0", "0.1.2") === true);
assert(isSameMajorVersion("~0.1.1", "0.1.3") === true);
assert(isSameMajorVersion("^0.1.1", "0.1.3") === true);

assert(isSameMajorVersion("1.0.0", "2.2.1") === false);
assert(isSameMajorVersion("~1.0.0", "2.2.1") === false);
assert(isSameMajorVersion("^1.0.0", "2.2.1") === false);
//# fynSourceMap=false
