import { munchyHandleStreamError } from "../../src/utils";

import { describe, it } from "mocha";
import { expect } from "chai";

describe("utils munchyHandleStreamError", function () {
  let saveEnv;

  before(() => {
    saveEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    if (saveEnv) {
      process.env.NODE_ENV = saveEnv;
    } else {
      delete process.env.NODE_ENV;
    }
  });

  it("should return only error message in production", function () {
    process.env.NODE_ENV = "production";
    const { result } = munchyHandleStreamError(new Error("Error1"));
    expect(result).contains(`Error1
</pre>`);
  });

  it("should return stack trace on non-production", function () {
    process.env.NODE_ENV = "development";
    const { result } = munchyHandleStreamError(new Error("e"));
    expect(result).contains("test/spec/utils.spec.ts"); // stack
  });

  it("should not replace with CWD if it's less than 3 chars", function () {
    const { result } = munchyHandleStreamError(new Error("1"), "/a");
    expect(result).to.not.contain("CWD");
  });

  it("should handle empty error message", () => {
    const { result } = munchyHandleStreamError(new Error(""));
    expect(result).to.not.contain("CWD");
  });
});
