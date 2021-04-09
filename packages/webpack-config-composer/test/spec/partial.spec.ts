import { Partial, DATA, OVERRIDE } from "../../lib/partial";
import { expect } from "chai";
// import sinon from "sinon";

const _ = require("lodash");

describe("partial", () => {
  it("should default partials to {}", () => {
    const fn = () => {};
    const partial = new Partial("test", fn);
    expect(partial[DATA].config).to.deep.equal(fn);
    expect(partial[OVERRIDE]).to.deep.equal(_.identity);
  });
});
