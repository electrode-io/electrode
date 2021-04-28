import headConcatArrayMerge from "../../src/head-concat-array-merge";
import { expect } from "chai";

describe("head concat array", () => {
  it("merge two arrays", () => {
    expect(headConcatArrayMerge([1, 2, 3], [4, 5, 6])).to.deep.equal([4, 5, 6, 1, 2, 3]);
  });

  it("does nothing if one is not an array", () => {
    expect(headConcatArrayMerge([1, 2, 3], "test")).to.equal(undefined);
  });

  it("does nothing if one is not an array", () => {
    expect(headConcatArrayMerge("test", [1, 2, 3])).to.equal(undefined);
  });
});
