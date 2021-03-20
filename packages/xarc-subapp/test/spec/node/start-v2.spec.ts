import { startSubApp } from "../../../src/node/start-v2";
import { SSR_PIPELINES } from "../../../src/node/utils";
import sinon from "sinon";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("start-v2", () => {
  it("startSubApp", () => {
    const sSA = startSubApp();
    expect(sSA).to.be.an("object");
    const mockPSubAppFRes = new Promise((resolve, reject) => {
      resolve({
        Component: "test-component",
        props: "test-props"
      });
    });
    const context = {
      user: {
        scriptNonceAttr: "test-nonce",
        request: {
          [SSR_PIPELINES]: [
            {
              /* eslint-disable */
              startPrepare: () => {},
              waitForPrepare: () => mockPSubAppFRes,
              isPrepared: () => false,
              getPrepResult: () => {},
              executeRender: sinon.spy(),
              start: reload => new Promise((resolve, reject) => {}),
              _reload: () => new Promise((resolve, reject) => {}),
              _mount: info => {},
              _unmount: info => {}
              /* eslint-enable */
            }
          ]
        }
      }
    };
    expect(sSA.process(context)).eql(
      `<!-- Starting SubApp -->\n<scripttest-nonce>window.xarcV2.start()</script>\n`
    );
    // expect(context.user.request[SSR_PIPELINES][0].executeRender.called).equal(true);
  });
});
