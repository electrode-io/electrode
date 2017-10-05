"use strict";

const makeSpinner = require("../../../lib/util/helpers").makeSpinner;
const expect = require("chai").expect;

describe("make-spinner", function() {
  it("should create a spinner", () => {
    const spinner = makeSpinner("hello");
    expect(spinner.start).to.exist;
  });
});
