import { xarcV2Client } from "../../../src/browser/xarc-subapp-v2";
import { describe, it } from "mocha";
import { expect } from "chai";
require("jsdom-global")("", { url: "https://localhost/" });

const mockWindow = Object.assign({}, window);

describe("xarcV2Client", () => {
  it("should xarcV2Client add attribute and method on window object", () => {
    //  eslint-disable max-len
    xarcV2Client(mockWindow);
    const xarcV2 = (mockWindow as any).xarcV2;
    expect(xarcV2).to.be.an("object");
    expect(xarcV2.IS_BROWSER).true;
    expect(xarcV2.HAS_WINDOW).true;
    expect(xarcV2.version).equal(2000000);
    expect(xarcV2.rt).eql({
      instId: 1,
      subApps: {},
      onLoadStart: {},
      started: false,
      md: {}
    });
    expect(xarcV2.cdnInit).to.be.a("function");
    expect(xarcV2.cdnUpdate).to.be.a("function");
    expect(xarcV2.getOnLoadStart).to.be.a("function");
    expect(xarcV2.cdnMap).to.be.a("function");
    expect(xarcV2.addOnLoadStart).to.be.a("function");
    expect(xarcV2.startSubAppOnLoad).to.be.a("function");
    expect(xarcV2._start).to.be.a("function");
    expect(xarcV2.start).to.be.a("function");
    expect(xarcV2.dyn).to.be.a("function");
    expect(xarcV2.debug).to.be.a("function");
  });
});
