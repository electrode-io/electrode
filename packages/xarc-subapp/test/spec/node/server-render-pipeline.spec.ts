import { SubAppServerRenderPipeline } from "../../../src/node/server-render-pipeline";
import { declareSubApp } from "../../../src/node/index";
import sinon from "sinon";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("sever-render-pipeline", () => {
  it("SubAppServerRenderPipeline", () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const options = declareSubApp({
      name: "test",
      getModule: () => import("../../blah")
    });

    const data = {
      context: {
        output: {
          reserve: () => {
            return {
              add: spy1,
              close: spy2
            };
          }
        },
        user: {
          namespace: "test-namespace",
          scriptNonceAttr: "nonce-test"
        }
      },
      subapp: {
        ...options,
        _frameworkFactory: () => {
          return {
            prepareSSR: data1 => {
              return {
                then: cb => cb(data1)
              };
            }
          };
        }
      },
      options: options
    };
    const subASRP = new SubAppServerRenderPipeline(data);

    expect(subASRP).to.be.an("object");

    subASRP.startPrepare();

    expect(subASRP.waitForPrepare()).to.be.a("promise");
    expect(subASRP.getPrepResult()).eql(data);
    /*  eslint-disable  */
    expect(subASRP.isPrepared()).to.be.true;
    subASRP.executeRender();
    expect(spy1.called).true;
    expect(spy2.called).true;
    /*  eslint-enable  */
  });
});
