import Profile from "../../src/profile";
import { expect } from "chai";

describe("profile", () => {
  it("should default partials to {}", () => {
    const prof = new Profile("test", null);
    expect(prof.partials).to.deep.equal({});
  });

  it("should have name", () => {
    const prof = new Profile("test", {});
    expect(prof.name).to.equal("test");
  });

  it("should handle set/get/del partial", () => {
    const prof = new Profile("test", { foo: {} });
    prof.setPartial("bar", null);
    prof.setPartial("blah", { order: 10 });
    expect(prof.getPartial("foo")).to.deep.equal({});
    expect(prof.getPartial("bar")).to.deep.equal({});
    expect(prof.getPartial("blah")).to.deep.equal({ order: 10 });
    prof.delPartial("blah");
    // eslint-disable-next-line no-unused-expressions
    expect(prof.getPartial("blah")).to.not.exist;
  });
});
