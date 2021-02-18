import { webpack4JsonP } from "../../../src/browser/webpack4-jsonp";
import { describe, it } from "mocha";
import { expect } from "chai";

const mockWindow: any = {};
describe("webpack4JsonP", () => {
  it("should webpack4JsonP set __webpack_get_script_src__ method on window", () => {
    webpack4JsonP(mockWindow);
    expect(mockWindow.__webpack_get_script_src__).to.be.a("function");
  });

  it("should __webpack_get_script_src__ return original src when CDN is enabled", () => {
    mockWindow.xarcV2 = {
      cdnMap: src => "cdnMap" + src
    };

    expect(mockWindow.__webpack_get_script_src__("chunkId", "publicPath", "/test/src")).equal(
      "cdnMap/test/src"
    );
  });

  it("should __webpack_get_script_src__ return original src when CDN is disabled", () => {
    mockWindow.xarcV2 = {
      cdnMap: str => undefined //  eslint-disable-line
    };

    expect(mockWindow.__webpack_get_script_src__("chunkId", "publicPath", "/test/src")).equal(
      "/test/src"
    );
  });
});
