"use strict";

const Profile = require("../../lib/profile");
const expect = require("chai").expect;

describe("profile", function() {
  it("should default partials to {}", () => {
    const prof = new Profile("test");
    expect(prof.partials).to.deep.equal({});
  });

  it("should have name", () => {
    const prof = new Profile("test");
    expect(prof.name).to.equal("test");
  });

  it("should handle set/get/del partial", () => {
    const prof = new Profile("test", { foo: {} });
    prof.setPartial("bar");
    prof.setPartial("blah", { order: 10 });
    expect(prof.getPartial("foo")).to.deep.equal({});
    expect(prof.getPartial("bar")).to.deep.equal({});
    expect(prof.getPartial("blah")).to.deep.equal({ order: 10 });
    prof.delPartial("blah");
    expect(prof.getPartial("blah")).to.not.exist;
  });
});
