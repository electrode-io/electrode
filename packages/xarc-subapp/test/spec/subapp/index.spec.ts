import {
  declareSubApp,
  getContainer,
  _setupEnvHooks,
  _clearContainer
} from "../../../src/node/index";
import { describe, it } from "mocha";
import sinon from "sinon";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe("declareSubApp", () => {
  beforeEach(() => {
    _clearContainer();
    _setupEnvHooks();
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

  it("should add the subapp with wantFeatures", () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const container = getContainer();
    const subapp = declareSubApp({
      name: "test",
      getModule: () => import("../../blah"),
      wantFeatures: [
        { id: "1", add: spy1 },
        { id: "2", add: spy2 }
      ]
    });
    expect(container.getNames()).contains("test");
    expect(container.get("test")).to.equal(subapp);
    expect(subapp._module).to.equal(undefined);

    expect(spy1.calledOnce).true; //  eslint-disable-line
    expect(spy2.calledOnce).true; //  eslint-disable-line
    expect(spy1.calledBefore(spy2)).true; //  eslint-disable-line

    sinon.restore();
  });

  it("should add the subapp into container", async () => {
    const container = getContainer();

    const subapp = declareSubApp({
      name: "test",
      getModule: "test"
    } as any);
    expect(container.getNames()).contains("test");
    expect(container.get("test")).to.equal(subapp);
    expect(subapp._module).to.equal(undefined);

    expect(subapp._getModule()).to.be.an("promise");
    subapp._getModule().should.eventually.eql(subapp._getModule());
  });

  it("should get empty object when calling _getExport without _module on subapp", async () => {
    const subapp = declareSubApp({
      name: "test",
      getModule: "test"
    } as any);

    expect(subapp._module).to.equal(undefined);
    expect(subapp._getExport()).eql({});
  });

  it("should get empty object when calling _getExport without _module on subapp", async () => {
    const subapp = declareSubApp({
      name: "test",
      getModule: "test"
    } as any);

    expect(subapp._module).to.equal(undefined);
    expect(subapp._getExport()).eql({});
  });

  it("should get named module when calling _getExport with resolve name", async () => {
    const subapp = declareSubApp({
      name: "test",
      getModule: "test"
    } as any);

    subapp._module = { test: "Hello World" };
    subapp.resolveName = "test";

    expect(subapp._getExport()).eql("Hello World");
  });
});
