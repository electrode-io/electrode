import { xarcV2 } from "../../../src/browser/xarcv2";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("xarcV2", () => {
  it("should xarcV2 be a function", () => {
    expect(xarcV2).to.be.a("object");
    expect(xarcV2.debug).to.be.a("function");
    expect(xarcV2.debug()).equal(undefined);
  });
});
