//  eslint-disable max-statements
import { xarcV2Client } from "../../../src/browser/xarc-subapp-v2";
import { describe, it } from "mocha";
import { expect } from "chai";
require("jsdom-global")("", { url: "https://localhost/" }); //  eslint-disable-line

const mockWindow = Object.assign({}, window);
let xarcV2;
describe("xarcV2Client", () => {
  before(() => {
    xarcV2Client(mockWindow);
    xarcV2 = (mockWindow as any).xarcV2;
  });
  it("should xarcV2Client add attributes on window object", () => {
    expect(xarcV2).to.be.an("object");
    expect(xarcV2.IS_BROWSER).true; //  eslint-disable-line
    expect(xarcV2.HAS_WINDOW).true; //  eslint-disable-line
    expect(xarcV2.version).equal(2000000); //  eslint-disable-line
    expect(xarcV2.rt).eql({
      instId: 1,
      subApps: {},
      onLoadStart: {},
      started: false,
      md: {}
    });
  });

  it("should xarcV2Client add methods on window object", () => {
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
