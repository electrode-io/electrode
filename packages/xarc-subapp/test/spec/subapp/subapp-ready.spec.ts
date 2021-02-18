import { envHooks } from "../../../src/subapp/index";
import { SubAppContainer } from "../../../src/subapp/types";
import { isSubAppReady, subAppReady } from "../../../src/subapp/subapp-ready";
import { declareSubApp, _setupEnvHooks, _clearContainer } from "../../../src/node/index";
import { describe, it } from "mocha";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe("subapp-ready", () => {
  beforeEach(() => {
    _clearContainer();
    _setupEnvHooks();
  });

  describe("isSubAppReady", () => {
    it("should isSubAppReady return true", () => {
      expect(isSubAppReady()).true; //  eslint-disable-line
    });
  });

  describe("subAppReady", () => {
    beforeEach(() => {
      _clearContainer();
      _setupEnvHooks();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should subAppReady when container is ready", async () => {
      const res = subAppReady(false, [], 0);
      expect(res).to.be.a("promise");
      subAppReady(false, [], 0).should.eventually.equal(Promise.resolve());
    });

    it("should subAppReady return subappModules array when container is not ready", async () => {
      const subappDef = declareSubApp({
        name: "test-subapp1",
        getModule: () => import("../../blah")
      });

      const subappCon = new SubAppContainer({ test: subappDef });

      sinon.stub(envHooks, "getContainer").returns({
        ...subappCon,
        get: str => subappDef, //  eslint-disable-line
        declare: (str, def) => subappDef, //  eslint-disable-line
        isReady: () => false,
        updateReady: () => {}, //  eslint-disable-line
        getNames: () => ["test-subapp1", "test-subapp2"]
      });

      const res = subAppReady(true, [], 0);
      res.should.eventually.eql([]);
    });

    it("should subAppReady return subappModules array when container's declare count is not ready", async () => {
      const subappDef = declareSubApp({
        name: "test-subapp1",
        getModule: () => import("../../blah")
      });

      declareSubApp({
        name: "test-subapp2",
        getModule: () => import("../../blah")
      });

      const subappCon = new SubAppContainer({ test: subappDef });

      sinon.stub(envHooks, "getContainer").returns({
        ...subappCon,
        declareCount: 1,
        get: str => subappDef, //  eslint-disable-line
        declare: (str, def) => subappDef, //  eslint-disable-line
        isReady: () => false,
        updateReady: () => {}, //  eslint-disable-line
        getNames: () => []
      });

      const res = subAppReady(true, [], 0);
      res.should.eventually.eql([]);
    });
  });
});
