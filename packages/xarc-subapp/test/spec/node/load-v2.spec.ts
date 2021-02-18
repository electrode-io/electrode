import { loadSubApp } from "../../../src/node/load-v2";
import sinon from "sinon";
import { expect } from "chai";
import { describe, it } from "mocha";
import { _clearContainer, declareSubApp, getContainer } from "../../../src/node";

describe("Test load-v2", () => {
  beforeEach(() => {
    _clearContainer();
  });

  after(() => {
    _clearContainer();
  });

  it("shold loadSubApp return an object includes process function", () => {
    const res = loadSubApp({}, { props: { name: "test" } });
    expect(res).to.be.an("object");
    expect(res.process).to.be.a("function");
  });

  it("should process function calls subapp _start method", () => {
    declareSubApp({
      name: "test-subapp1",
      getModule: () => import("../../blah")
    });

    const res = loadSubApp({ user: { request: () => {} } }, { props: { name: "test-subapp1" } }); //  eslint-disable-line
    const subapp = getContainer().get("test-subapp1");
    subapp._start = sinon.spy();
    //  eslint-disable-next-line
    expect(res.process({ user: { request: () => {} } }, { props: { name: "test-subapp1" } })).eql(
      undefined
    );
    expect((subapp._start as any).calledOnce).true; //  eslint-disable-line
    sinon.restore();
  });
});
