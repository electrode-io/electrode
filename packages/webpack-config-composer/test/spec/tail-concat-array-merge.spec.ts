"use strict";

const tailConcatArrayMerge = require("../../lib/tail-concat-array-merge");
const expect = require("chai").expect;

describe("tail concat array", function () {
  it("merge two arrays", () => {
    expect(tailConcatArrayMerge([1, 2, 3], [4, 5, 6])).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it("does nothing if one is not an array", () => {
    expect(tailConcatArrayMerge([1, 2, 3], "test")).to.equal(undefined);
  });

  it("does nothing if one is not an array", () => {
    expect(tailConcatArrayMerge("test", [1, 2, 3])).to.equal(undefined);
  });
});
