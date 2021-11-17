import { initSubApp } from "../../../src/node/init-v2";
import sinon from "sinon";
import { expect } from "chai";
import Fs from "fs";
import Path from "path";

const statContent = Fs.readFileSync(Path.join(__dirname, "../../fixtures/stats.json"));

describe("Test init-v2", () => {
  let sandbox;
  let prevNodeEnv;
  let prevWebpack;

  beforeEach(() => {
    prevNodeEnv = process.env.NODE_ENV;
    prevWebpack = process.env.WEBPACK_DEV;
    sandbox = sinon.createSandbox();
    const fsStub = sandbox.stub(Fs, "readFileSync");
    fsStub.withArgs(sinon.match(/^.*stats.json$/)).returns(statContent);
    fsStub.callThrough();
  });

  afterEach(() => {
    sandbox.restore();
    process.env.NODE_ENV = prevNodeEnv;
    process.env.WEBPACK_DEV = prevWebpack;
  });

  it("test initSubApp prod", () => {
    process.env.WEBPACK_DEV = "";
    process.env.NODE_ENV = "production";
    const tokens = {
      props: {
        prodAssetData: {
          pathMap: { base: "/prod-js" },
          cdnMap: { "poc1.subapp-home.style.5faa52f5a3012ca195e2.css": "ABC.css" }
        }
      }
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {},
        scriptNonceAttr: " cowabunga",
        styleNonceAttr: " mincer-shredder"
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).contains(`<script${context.user.scriptNonceAttr}`);
    expect(result).contains(`src="/prod-js`);
    expect(result).contains(`<link${context.user.styleNonceAttr} rel="stylesheet" href="ABC.css"`);
    expect(result).contains(`cdn-map-`);
    expect(result).contains(`"poc1.subapp-home.style.5faa52f5a3012ca195e2.css":"ABC.css"`);
    expect(result).contains(
      `<script${context.user.scriptNonceAttr} src="/prod-js/poc1.main.bundle.2ce93434dd0e0b9f6d2e.js"`
    );
  });

  it("test initSubApp uses default js pathMap", () => {
    const tokens = {
      props: {}
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {},
        scriptNonceAttr: " cowabunga",
        styleNonceAttr: " mincer-shredder"
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).contains(`<script${context.user.scriptNonceAttr}`);
    expect(result).contains(`src="/js`);
  });

  it("test initSubApp with no scriptNonce or styleNonce", () => {
    const tokens = {
      props: {
        prodAssetData: {
          cdnMap: { "base.js": "ABC.js" }
        }
      }
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {}
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).to.not.contain(`<script{{SCRIPT_NONCE}}`);
    expect(result).to.not.contain(`<link{{STYLE_NONCE}}`);
  });

  it("test initSubApp without CDN Map", () => {
    const tokens = {
      props: {
        prodAssetData: {}
      }
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {}
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).not.contains(`cdn-map-`);
  });

  it("test initSubApp with CDN Map from file", () => {
    process.env.WEBPACK_DEV = "";
    const tokens = {
      props: {
        prodAssetData: {
          cdnMap: Path.join(__dirname, "../../fixtures/assets.json")
        }
      }
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {},
        styleNonceAttr: " from-file"
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).contains(
      `<link${context.user.styleNonceAttr} rel="stylesheet" href="AE1234.css"`
    );
    expect(result).contains(`cdn-map-`);
    expect(result).contains(`"poc1.subapp-home.style.5faa52f5a3012ca195e2.css":"AE1234.css"`);
  });

  it("test initSubApp dev", () => {
    process.env.WEBPACK_DEV = "true";
    process.env.NODE_ENV = "development";
    const tokens = {
      props: {
        devAssetData: {
          pathMap: { base: "/dev-js" },
          cdnMap: { "home.js": "DEF.js" }
        }
      }
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {},
        scriptNonceAttr: " dev-cowabunga",
        styleNonceAttr: " dev-mincer-shredder"
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).contains(`<script${context.user.scriptNonceAttr}`);
    expect(result).contains(`src="/dev-js`);
    expect(result).contains(`<link${context.user.styleNonceAttr}`);
    expect(result).contains(`"home.js":"DEF.js"`);
  });

  it("test initSubApp dev without devAssetData", () => {
    process.env.WEBPACK_DEV = "true";
    process.env.NODE_ENV = "development";
    const tokens = {
      props: {}
    };
    const initializer = initSubApp(null, tokens);

    const context: any = {
      user: {
        request: {},
        scriptNonceAttr: " dev-cowabunga",
        styleNonceAttr: " dev-mincer-shredder"
      },
      options: {
        request: { bingo: true }
      }
    };
    const result = initializer.process(context);
    expect(result).contains(`<script${context.user.scriptNonceAttr}`);
    expect(result).contains(`src="/js/poc1.main.bundle.2ce93434dd0e0b9f6d2e.js`);
    expect(result).contains(`<link${context.user.styleNonceAttr}`);
    expect(result).contains(`href="/js/poc1.subapp-home.style.5faa52f5a3012ca195e2.css"`);
  });
});
