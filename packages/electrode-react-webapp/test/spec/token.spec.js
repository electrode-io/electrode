"use strict";

const Token = require("../../lib/token");
const expect = require("chai").expect;
const xstdout = require("xstdout");

describe("token", function() {
  it("should create token as internal", () => {
    const tk = new Token("test", 50);
    expect(tk.id).to.equal("test");
    expect(tk.isModule).to.equal(false);
    expect(tk.pos).to.equal(50);
    tk.load();
    expect(tk.custom).to.equal(undefined);
  });

  it("should invoke _call of a module", () => {
    const tk = new Token("#./test/fixtures/custom-call", 0, { _call: "setup" });
    expect(tk.id).to.equal("#./test/fixtures/custom-call");
    expect(tk.isModule).to.equal(true);
    tk.load();
    expect(tk.process()).to.equal("_call");
  });

  it("should create token as custom", () => {
    const tk = new Token("#./test/fixtures/custom-count");
    expect(tk.id).to.equal("#./test/fixtures/custom-count");
    expect(tk.isModule).to.equal(true);
    tk.load();
    expect(tk.process()).to.equal("1");
    tk.load();
    expect(tk.process()).to.equal("2");
  });

  it("should handle custom module not found", () => {
    const tk = new Token("#./test/fixtures/not-found");
    expect(tk.id).to.equal("#./test/fixtures/not-found");
    expect(tk.isModule).to.equal(true);
    const intercept = xstdout.intercept(true);
    tk.load();
    intercept.restore();
    expect(tk.process()).to.equal("\ntoken process module ./test/fixtures/not-found not found\n");
  });

  it("should handle custom module load failure", () => {
    const tk = new Token("#./test/fixtures/custom-fail");
    expect(tk.id).to.equal("#./test/fixtures/custom-fail");
    expect(tk.isModule).to.equal(true);
    const intercept = xstdout.intercept(true);
    tk.load();
    intercept.restore();
    expect(tk.process()).to.equal(
      "\ntoken process module ./test/fixtures/custom-fail failed to load\n"
    );
  });
});
