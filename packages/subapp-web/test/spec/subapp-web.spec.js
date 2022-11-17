"use strict";

/* eslint-disable max-len */

const { asyncVerify } = require("run-verify");
const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");
const { JSDOM } = require("jsdom");
const { delay } = require("xaa");

describe("subapp-web xarc client v1", function () {
  let xarcV1;
  const dom = new JSDOM(`<!DOCTYPE html><html><head>
<script id="bundleAssets" type="application/json">
{"jsChunksById":{"bottom":"/js/bottom.bundle.dev.js","deal":"/js/deal.bundle.dev.js","extras":"/js/extras.bundle.dev.js","footer":"/js/footer.bundle.dev.js","header":"/js/header.bundle.dev.js","mainbody":"/js/mainbody.bundle.dev.js","runtime":"/js/runtime.bundle.dev.js","suspensedemo":"/js/suspensedemo.bundle.dev.js","vendors.~199adadd":"/js/vendors.~199adadd.bundle.dev.js","vendors.~73011e79":"/js/vendors.~73011e79.bundle.dev.js","vendors.~a8cff946":"/js/vendors.~a8cff946.bundle.dev.js"},"md":{},"entryPoints":{"mainbody":["runtime","vendors.~73011e79","vendors.~a8cff946","vendors.~199adadd","mainbody"],"bottom":["runtime","vendors.~73011e79","vendors.~a8cff946","vendors.~199adadd","bottom"],"header":["runtime","vendors.~73011e79","header"],"footer":["runtime","vendors.~73011e79","vendors.~a8cff946","footer"],"extras":["runtime","vendors.~73011e79","vendors.~a8cff946","extras"],"suspensedemo":["runtime","vendors.~73011e79","suspensedemo"],"deal":["runtime","vendors.~73011e79","deal"]},"basePath":""}
</script>
</head>
<body>
    <p>Hello world</p>
</body>
</html>`);

  const jsLoaded = {};

  before(() => {
    const xarc = "../../src/subapp-web.js";
    delete require.cache[require.resolve(xarc)];
    global.window = dom.window;
    global.document = dom.window.document;
    global.loadjs = (asset, id, options) => {
      if (jsLoaded[id]) {
        throw new Error(`loadjs ${id} already loaded`);
      }
      jsLoaded[id] = true;
      setTimeout(() => options.success(), 20);
    };
    require(xarc);
    xarcV1 = global.window.xarcV1;
  });

  after(() => {
    delete global.window;
    delete global.document;
    delete global.loadjs;
  });

  it("should handle loadSubAppBundles multiple times", () => {
    return asyncVerify(
      () => {
        xarcV1.loadSubAppBundles("deal", () => {});
        xarcV1.loadSubAppBundles("deal", () => {});
      },
      () => delay(50),
      () => {
        expect(jsLoaded).to.deep.equal({ runtime: true, "vendors.~73011e79": true, deal: true });
      }
    );
  });
});
