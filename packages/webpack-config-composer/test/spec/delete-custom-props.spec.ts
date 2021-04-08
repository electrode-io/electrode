"use strict";

const deleteCustomProps = require("../../lib/delete-custom-props");
const expect = require("chai").expect;

describe("delete custom props", function () {
  it("should preserve __dirname and delete _ prefixed", () => {
    const o = {
      module: {
        __dirname: "/test",
        _name: "test"
      }
    };
    const x = deleteCustomProps(o);
    expect(x.module.__dirname).to.equal("/test");
    expect(x.module._name).to.equal(undefined);
  });

  it("should preserve __filename and delete _ prefixed", () => {
    const o = {
      module: {
        __filename: "/test",
        _name: "test"
      }
    };
    const x = deleteCustomProps(o);
    expect(x.module.__filename).to.equal("/test");
    expect(x.module._name).to.equal(undefined);
  });

  it("should ignore non-object", () => {
    expect(deleteCustomProps(false)).to.equal(false);
  });
});
