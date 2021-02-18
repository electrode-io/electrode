import "jsdom-global/register";
import {
  declareSubApp,
  getContainer,
  _setupEnvHooks,
  IS_BROWSER
} from "../../../src/browser/index";
import { envHooks } from "../../../src/subapp/index";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("browser index", () => {
  afterEach(() => {
    (window as any)._subapps = undefined;
  });

  describe("getContainer", () => {
    it("should getContainer create a new subapp container at first time", () => {
      const container = getContainer();
      expect(container).is.an("object");

      const container2 = getContainer();
      expect(container).equal(container2);
    });
  });

  describe("_setupEnvHooks", () => {
    it("should _setupEnvHooks set getContainer to envHooks", () => {
      _setupEnvHooks();
      expect(envHooks.getContainer).equal(getContainer);

      const getCon = envHooks.getContainer;
      _setupEnvHooks();
      expect(envHooks.getContainer).equal(getCon);
    });
  });

  describe("declareSubApp", () => {
    it("should add the subapp into container", async () => {
      const container = getContainer();

      const subapp = declareSubApp({
        name: "test",
        getModule: () => import("../../blah")
      });
      expect(container.getNames()).contains("test");
      expect(container.get("test")).to.equal(subapp);
      expect(subapp._module).to.equal(undefined);

      const mod = await subapp._getModule();

      expect(subapp._module).to.equal(mod);
      expect(mod.subapp.Component()).to.equal("hello"); // eslint-disable-line
    });
  });

  describe("IS_BROWSER", () => {
    it("should IS_BROWSER be true", () => {
      expect(IS_BROWSER).true; //  eslint-disable-line
    });
  });

  it("serverOverrideMethods exist", () => {
    getContainer();
    const subapp = declareSubApp({
      name: "test",
      getModule: () => import("../../blah")
    });

    expect(subapp._start).to.be.a("function");
  });
});
