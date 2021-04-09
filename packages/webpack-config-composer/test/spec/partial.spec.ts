import { Partial, DATA, OVERRIDE } from "../../lib/partial";
import { expect } from "chai";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");

describe("partial", () => {
  it("should default partials to {}", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fn = () => {};
    const partial = new Partial("test", fn);
    expect(partial[DATA].config).to.deep.equal(fn);
    expect(partial[OVERRIDE]).to.deep.equal(_.identity);
  });
});
