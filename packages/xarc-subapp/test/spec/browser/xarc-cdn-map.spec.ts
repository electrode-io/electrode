import { xarcCdnMap } from "../../../src/browser/xarc-cdn-map";
import { xarcV2Client } from "../../../src/browser/xarc-subapp-v2";

import { describe, it } from "mocha";
import { expect } from "chai";
require("jsdom-global")("", { url: "https://localhost/" }); //  eslint-disable-line

let mockWindow;
describe("xarcCdnMap", () => {
  beforeEach(() => {
    mockWindow = Object.assign({}, window);
  });

  it("should xarcCdnMap return undefined when window not having xarcV2 attribute", () => {
    expect(xarcCdnMap(mockWindow)).undefined; //  eslint-disable-line
  });

  it("should xarcCdnMap add subapp2 global attribute and method on window object", () => {
    xarcV2Client(mockWindow);
    mockWindow._wml = undefined;
    xarcCdnMap(mockWindow);
    const xarcV2 = (mockWindow as any).xarcV2;
    expect(xarcV2).to.be.an("object");
    expect(xarcV2.cdnInit).to.be.a("function");
    expect(xarcV2.cdnUpdate).to.be.a("function");
    expect(xarcV2.cdnMap).to.be.a("function");
    expect((mockWindow as any)._wml.cdn.map).equal(xarcV2.cdnMap);
    expect((mockWindow as any)._wml.cdn.update).equal(xarcV2.cdnUpdate);
    expect((mockWindow as any)._wml.cdn.md)
      .equal(xarcV2.rt.md)
      .eql({});
  });

  it("should cdnUpdate", () => {
    xarcV2Client(mockWindow);
    xarcCdnMap(mockWindow);
    const xarcV2 = (mockWindow as any).xarcV2;
    xarcV2.rt = { md: {} };
    xarcV2.cdnUpdate(
      {
        md: {
          a: "1",
          b: "2"
        }
      },
      true
    );

    expect(xarcV2.rt.md).eql({
      a: "1",
      b: "2"
    });
  });

  it("should cdnMap return CDN URL for key in the mapping", () => {
    xarcV2Client(mockWindow);
    xarcCdnMap(mockWindow);
    const xarcV2 = (mockWindow as any).xarcV2;
    xarcV2.rt = {
      md: {
        file: "content"
      }
    };
    expect(xarcV2.cdnMap("file2")).eql(undefined);
    expect(xarcV2.cdnMap("file")).eql("content");
  });
});
