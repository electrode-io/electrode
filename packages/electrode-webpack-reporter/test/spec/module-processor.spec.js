"use strict";

const ModuleProcessor = require("../../lib/module-processor");
const expect = require("chai").expect;

describe("process modules", function () {

  it("_splitPath should handle files under CWD", () => {
    const mp = new ModuleProcessor({});
    const split = mp._splitPathName("./client/apps.jsx");
    expect(split.name).to.equal(".");
    expect(split.file).to.equal("client/apps.jsx");
    expect(split.parents).to.be.empty;
  });

  it("_splitPath should handle files with private npm scope", () => {
    const mp = new ModuleProcessor({});
    const split2 = mp._splitPathName("./~/@foo/bar/lib/foo.js");
    expect(split2.name).to.equal("@foo/bar");
    expect(split2.file).to.equal("lib/foo.js");
    expect(split2.parents).to.be.empty;
  });

  it("_splitPath should handle files with multiple nested parents", () => {
    const mp = new ModuleProcessor({});
    const split3 = mp._splitPathName("./~/@scope/foo/~/bar/~/@scope/fooA/~/barA/lib/test1.js");
    expect(split3.name).to.equal("barA");
    expect(split3.file).to.equal("lib/test1.js");
    expect(split3.parents).to.deep.equal(["@scope/foo", "bar", "@scope/fooA"]);
  });

  it("makeModulesByName should read from modules first", () => {
    const mp = new ModuleProcessor({
      modules: [
        {
          name: "./client/test.jsx"
        },
        {
          name: "./~/foo/bar.js"
        }
      ]
    });
    const mbn = mp.makeModulesByName();
    expect(mbn).to.have.all.keys(["./client/test.jsx", "./~/foo/bar.js"]);
  });

  it("makeModulesByName should read from chunks that have modules", () => {
    const mp = new ModuleProcessor({
      chunks: [
        {
          modules: [
            {
              name: "./client/test.jsx"
            },
            {
              name: "./~/foo/bar.js"
            }
          ]
        },
        {}
      ]
    });
    const mbn = mp.makeModulesByName();
    expect(mbn).to.have.all.keys(["./client/test.jsx", "./~/foo/bar.js"]);
  });

  it("should generate modules by NPM package names", function () {
    const stats = require("../../server/stats.json");

    const mp = new ModuleProcessor(stats);
    const byPkg = mp.makeModulesByPackage();
    const expectedPkgs = [".", "react", "object-assign", "fbjs", "react-router",
      "warning", "invariant", "history", "deep-equal", "query-string",
      "strict-uri-encode", "hoist-non-react-statics", "babel-runtime", "core-js",
      "react-resolver", "react-dom", "process"];
    expect(byPkg).to.have.all.keys(expectedPkgs);

    const childrenByPkg = stats.children.map((c) => {
      const cmp = new ModuleProcessor(c);
      return cmp.makeModulesByPackage();
    });

    expect(childrenByPkg[0]).to.have.all.keys([".", "css-loader"]);
    expect(byPkg.warning).to.have.all.keys(["$", "$react-router:history", "size"]);
    const warningName = byPkg.warning["$react-router:history"].modules["browser.js"].name;
    expect(warningName).to.equal("./~/react-router/~/history/~/warning/browser.js");
  });
});
