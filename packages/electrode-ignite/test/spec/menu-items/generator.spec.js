"use strict";

const generatorItem = require("../../../lib/menu-items/generator");
const expect = require("chai").expect;
const { helpers } = require("ignite-core");
const doYo = require("../../../lib/do-yo");
const sinon = require("sinon");
const Promise = require("bluebird");

describe("menu-item generator", function() {
  it("should prompt user and run generator", () => {
    const runStub = sinon.stub(doYo, "run");
    const yesNoStub = sinon.stub(helpers, "yesNoPrompt").returns(Promise.resolve(true));
    expect(generatorItem).to.exist;
    const mi = generatorItem("test", {
      menuText: "test item"
    });
    return mi
      .execute({
        menu: {
          emit: evt => expect(evt).to.equal("done")
        }
      })
      .finally(() => {
        runStub.restore();
        yesNoStub.restore();
        expect(runStub.calledOnce).to.be.true;
      });
  });

  it("should not prompt user and run generator in clap mode", () => {
    const runStub = sinon.stub(doYo, "run");
    const yesNoStub = sinon.stub(helpers, "yesNoPrompt").returns(Promise.resolve(true));
    expect(generatorItem).to.exist;
    const mi = generatorItem("test", {
      menuText: "test item"
    });
    return mi
      .execute({
        menu: {
          _clap: true,
          emit: evt => expect(evt).to.equal("done")
        }
      })
      .finally(() => {
        runStub.restore();
        yesNoStub.restore();
        expect(yesNoStub.callCount).to.equal(0);
        expect(runStub.calledOnce).to.be.true;
      });
  });

  it("should not run generator if user answered no", () => {
    const runStub = sinon.stub(doYo, "run");

    const yesNoStub = sinon.stub(helpers, "yesNoPrompt").returns(Promise.resolve(false));

    expect(generatorItem).to.exist;
    const mi = generatorItem("test", {
      menuText: "test item"
    });
    return mi
      .execute({
        menu: {
          emit: msg => expect.fail(1, 1, `should not emit event ${msg}`)
        }
      })
      .finally(() => {
        runStub.restore();
        yesNoStub.restore();
        expect(runStub.callCount).to.equal(0);
      });
  });
});
