"use strict";

const { load } = require("../../lib");
const utils = require("../../lib/util");
const Path = require("path");
const reserveSpot = require("../../lib/ReserveSpot");
const RenderOutput = require("electrode-react-webapp/lib/render-output");

describe("load", function () {
  const statsPath = Path.join(__dirname, "../data/dev-stats.json");
  const { assets } = utils.loadAssetsFromStats(statsPath);
  let context;
  let setUpContext;
  let props;

  beforeEach(() => {
    setUpContext = {
      routeOptions: {
        cdn: {},
        __internals: {
          assets
        }
      }
    };
    context = {
      user: {
        request: { app: {} },
        assets,
        includedBundles: {}
      },
      transform: x => x
    };
    props = {
      props: {
        serverSideRendering: false
      }
    };
    utils.resetCdn();
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.APP_SRC_DIR;
  });

  it("should load bundles for the subapp", done => {
    process.env.APP_SRC_DIR = "test/subapps";
    const loadToken = load(setUpContext, { props: { name: "mainbody" } });

    context.send = results => {
      expect(results).to.not.be.empty;
      expect(context.user.includedBundles).to.include({ mainbody: true });
      expect(results).to.include(`<script src="mainbody.bundle.dev.js" async></script>`);
      expect(results).to.include(
        `<script src="ae56dc06d35e1170d047.vendors~280289005828299c685d173f73011e79.js" async></script>`
      );
      expect(context.user.headEntries).to.not.be.ok;
      done();
    };
    context.output = new RenderOutput(context);

    loadToken.process(context, props);
    context.output.close();
  });

  it("should load preload tags for scripts", done => {
    process.env.APP_SRC_DIR = "test/subapps";
    const loadToken = load(setUpContext, { props: { name: "mainbody" } });

    context.send = results => {
      expect(results).to.not.be.empty;
      expect(results).to.include(`<link rel="preload" href="mainbody.bundle.dev.js" as="script">`);
      expect(results).to.include(`<script src="mainbody.bundle.dev.js" async></script>`);
      expect(context.user.includedBundles).to.include({ mainbody: true });
      done();
    };
    context.output = new RenderOutput(context);
    reserveSpot({ saveId: "headEntries" }, context);

    loadToken.process(context, props);
    context.output.close();
  });
});
