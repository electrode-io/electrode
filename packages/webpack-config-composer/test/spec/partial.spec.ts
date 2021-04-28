import CONSTANT from "../../src/constants";
import Partial from "../../src/partial";
import { expect } from "chai";
const { DATA, OVERRIDE } = CONSTANT;

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

  it("should handle config returned from function", () => {
    const partial = new Partial("test", {
      config: () => {
        return { test: 1 };
      },
    });
    const config = partial.compose({});
    expect(config.test).equal(1);
  });

  it("should handle using webpackPartial from config returned from function", () => {
    const partial = new Partial("test", {
      config: () => {
        return { webpackPartial: { test: 1 } };
      },
    });
    const config = partial.compose({});
    expect(config.test).equal(1);
  });

  it("should setOverride", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fn = () => {};
    const partial = new Partial("test", {});
    expect(partial[OVERRIDE]).not.to.equals(fn);
    partial.setOverride(fn);
    expect(partial[OVERRIDE]).to.deep.equals(fn);
    partial.setOverride(null);
    expect(partial[OVERRIDE]).to.deep.equal(_.identity);
  });
});
