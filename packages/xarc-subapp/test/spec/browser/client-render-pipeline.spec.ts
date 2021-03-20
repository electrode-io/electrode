import "jsdom-global/register";
import { ClientRenderPipeline } from "../../../src/browser/client-render-pipeline";
import { declareSubApp } from "../../../src/browser/index";
import sinon from "sinon";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("client-render-pipeline", () => {
  /* eslint-disable */
  let spy1;
  let spy2;
  let subASRP;
  let data;
  before(() => {
    spy1 = sinon.spy();
    spy2 = sinon.spy();
    const options = declareSubApp({
      name: "test",
      getModule: () => import("../../blah")
    });

    (options as any)._frameworkFactory = () => {
      return {
        prepareCSR: (data, that) => {
          return {
            then: cb => {
              spy1();
              cb(data);
            }
          };
        },
        startSubAppSync: spy2
      };
    };

    data = {
      ...options,
      prepareOnly: false
    };
    subASRP = new ClientRenderPipeline(data);
  });

  it("ClientRenderPipeline", () => {
    expect(subASRP).to.be.an("object");

    subASRP.startPrepare();

    expect(subASRP.waitForPrepare()).to.be.a("promise");
    expect(subASRP.getPrepResult()).eql(data);
    expect(subASRP.isPrepared()).true;
    subASRP.executeRender();
    expect(spy1.called).true;
    expect(spy2.called).true;
    expect(subASRP.start).to.be.an("function");
    expect(subASRP._mount).to.be.an("function");
    expect(subASRP._unmount).to.be.an("function");
    expect(subASRP._reload).to.be.an("function");
    /* eslint-enable */
  });
});
