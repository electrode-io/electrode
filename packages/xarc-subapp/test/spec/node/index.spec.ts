import "jsdom-global/register";
import {
  declareSubApp,
  getContainer,
  _clearContainer,
  _setupEnvHooks,
  IS_BROWSER,
  refreshAllSubApps2
} from "../../../src/node/index";
import { envHooks } from "../../../src/subapp/index";
import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

describe("node index", () => {
  before(() => {
    envHooks.getContainer = undefined;
  });

  afterEach(() => {
    _clearContainer();
    _setupEnvHooks();
  });

  it("should getContainer create a new subapp container at first time", () => {
    const container = getContainer();
    expect(container).is.an("object");

    const container2 = getContainer();
    expect(container).equal(container2);
  });

  it("should _setupEnvHooks set getContainer to envHooks", () => {
    _setupEnvHooks();
    expect(envHooks.getContainer).equal(getContainer);

    const getCon = envHooks.getContainer;
    _setupEnvHooks();
    expect(envHooks.getContainer).equal(getCon);
  });

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

  it("should IS_BROWSER be false", () => {
    expect(IS_BROWSER).false; //  eslint-disable-line
  });

  it("should refreshAllSubApps2 fresh all the subapp2 components", () => {
    const container1 = getContainer();

    declareSubApp({
      name: "test1",
      getModule: () => import("../../blah")
    });

    declareSubApp({
      name: "test2",
      getModule: () => import("../../blah")
    });

    const spy1 = sinon.spy(container1, "getNames");
    const spy2 = sinon.spy(container1, "get");
    const spy3 = sinon.spy(container1, "updateReady");

    refreshAllSubApps2();

    expect(spy1.calledOnce).true; //  eslint-disable-line
    expect(spy2.calledTwice).true; //  eslint-disable-line
    expect(spy3.calledOnce).true; //  eslint-disable-line
    expect(spy1.calledBefore(spy2)).true; //  eslint-disable-line
    expect(spy2.calledBefore(spy3)).true; //  eslint-disable-line
    sinon.restore();
  });

  it("serverOverrideMethods exist", () => {
    getContainer();
    const subapp = declareSubApp({
      name: "test",
      getModule: () => import("../../blah")
    });

    expect(subapp._start).to.be.a("function");
    expect(subapp._pipelineFactory).to.be.a("function");
  });
});
