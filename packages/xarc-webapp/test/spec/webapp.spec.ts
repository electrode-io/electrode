import { expect } from "chai";
const xstdout = require("xstdout");
import { describe } from "mocha";
import * as Path from "path";
import * as Webapp from "../../src/Webapp";
describe("resolveContent", function () {
  it("should require module with relative path", () => {
    const f = "./test/data/foo.js";
    expect(Webapp.resolveContent({ module: f }).content).to.equal("hello");
  });

  it("should log error if resolving content fail", () => {
    const intercept = xstdout.intercept(true);
    const f = "./test/data/bad-content.js";
    const content = Webapp.resolveContent({ module: f });
    intercept.restore();
    expect(content.content).includes("test/data/bad-content.js failed");
    expect(intercept.stderr.join("")).includes("Error: Cannot find module 'foo-blah'");
  });
  it("should require module", () => {
    let mod;
    const fooRequire = x => (mod = x);
    fooRequire.resolve = x => x;
    const f = "test";
    const content = Webapp.resolveContent({ module: f }, fooRequire);
    expect(content.content).to.equal(f);
    expect(content.fullPath).to.equal(f);
    expect(mod).to.equal(f);
  });
  it("should require module", () => {
    let mod;
    const fooRequire = x => (mod = x);
    fooRequire.resolve = x => x;
    const f = "test";
    const content = Webapp.resolveContent({ module: f }, fooRequire);
    expect(content.content).to.equal(f);
    expect(content.fullPath).to.equal(f);
    expect(mod).to.equal(f);
  });
});

