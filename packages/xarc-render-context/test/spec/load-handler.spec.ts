import { loadTokenModuleHandler } from "../../src";
import { expect } from "chai";
import * as Path from "path";

describe("loadTokenModuleHandler", function () {
  it("should handle module is not found", () => {
    try {
      const tokenMod = loadTokenModuleHandler("foo");
      expect(tokenMod().process()).contains("module foo not found");
    } catch (e) {
      //expected
    }
  });

  it("should handle load module fail", () => {
    try {
      const tokenMod = loadTokenModuleHandler("./bad-mod", Path.join(__dirname, "../fixtures"));
      expect(tokenMod().process()).contains("module ./bad-mod failed to load");
    } catch (e) {
      expect(e).to.exist;
    }
  });

  it("should load token module handler from default (ESM)", () => {
    const tokenMod = loadTokenModuleHandler(
      "./token-module-01",
      Path.join(__dirname, "../fixtures")
    );
    expect(tokenMod().process()).contains("hello from token 01");
  });

  it("should load token module handler from tokenHandler (ESM)", () => {
    const tokenMod = loadTokenModuleHandler(
      "./token-module-02",
      Path.join(__dirname, "../fixtures")
    );
    expect(tokenMod().process()).contains("hello from token 02");
  });

  it("should load token module handler", () => {
    const tokenMod = loadTokenModuleHandler(
      "./token-module-03",
      Path.join(__dirname, "../fixtures")
    );
    expect(tokenMod().process()).contains("hello from token 03");
  });

  it("should fail if token module is invalid", () => {
    expect(() =>
      loadTokenModuleHandler("./token-module-04", Path.join(__dirname, "../fixtures"))
    ).to.throw("token module invalid");
  });
});
