import { initSubApp } from "../../../src/node/init-v2";
import sinon from "sinon";
import { expect } from "chai";
import fs from "fs";
import path from "path";

const statContent = fs.readFileSync(path.resolve(__dirname, "./dist/server/stats.json"));

describe("Test init-v2", () => {
  let sandbox;
  let prevNodeEnv;
  let prevWebpack;

  beforeEach(() => {
    prevNodeEnv = process.env.NODE_ENV;
    prevWebpack = process.env.WEBPACK_DEV;
    sandbox = sinon.createSandbox();
    const fsStub = sandbox.stub(fs, "readFileSync");
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
          cdnMap: { "demo1.style.css": "ABC.css" }
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
    expect(result).contains(`"demo1.style.css":"ABC.css"`);
    expect(result).contains(`<script${context.user.scriptNonceAttr} src="/prod-js/main.js"`);
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
    expect(result).contains(`<script{{SCRIPT_NONCE}}`);
    expect(result).contains(`<link{{STYLE_NONCE}}`);
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
          cdnMap: path.join(__dirname, "./dist/server/assets.json")
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
    expect(result).contains(`"demo1.style.css":"AE1234.css"`);
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
    expect(result).contains(`src="/js/main.js`);
    expect(result).contains(`<link${context.user.styleNonceAttr}`);
    expect(result).contains(`href="/js/demo1.style.css"`);
  });
});
