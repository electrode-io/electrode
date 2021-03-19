import { xarcV2 } from "../../../src/node/xarc-subapp-v2-node";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("xarc-subapp-v2-node", () => {
  it("xarcV2", () => {
    expect(xarcV2).to.be.an("object");
    /*  eslint-disable  */
    expect(xarcV2.IS_BROWSER).false;
    expect(xarcV2.HAS_WINDOW).false;
    /*  eslint-enable  */

    expect(xarcV2.version).eql(2000000);
    expect(xarcV2.rt).eql({});
    expect(xarcV2.cdnInit).to.be.a("function");
    expect(xarcV2.cdnUpdate).to.be.a("function");
    expect(xarcV2.addOnLoadStart).to.be.a("function");
    expect(xarcV2.startSubAppOnLoad).to.be.a("function");
    expect(xarcV2.dyn).to.be.a("function");
    expect(xarcV2.debug).to.be.a("function");
    expect(xarcV2.cdnMap("123")).eql("123");
    expect(xarcV2.getOnLoadStart("name")).eql([]);
    expect(xarcV2.start()).to.be.a("promise");
  });
});
