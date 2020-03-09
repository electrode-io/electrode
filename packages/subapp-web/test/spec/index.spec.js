"use strict";

const { JSDOM } = require("jsdom");
const mockRequire = require("mock-require");
const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

let clock;

describe("subapp-web", function() {
  beforeEach(() => {
    const dom = new JSDOM("");
    clock = sinon.useFakeTimers();
    global.window = dom.window;
    global.document = dom.window.document;
    delete require.cache[require.resolve("../../src/index")];
    delete require.cache[require.resolve("../../src/xarc")];
    delete require.cache[require.resolve("../../src/subapp-web")];
  });

  afterEach(() => {
    try {
      mockRequire.stop("../../src/xarc");
    } catch (e) {} // eslint-disable-line
    try {
      clock.restore();
    } catch (e) {} // eslint-disable-line
    delete global.window;
    delete global.document;
  });

  it("lazyLoadSubApp should return inline if no id or onLoad are specified and both subapp and bundle are available", () => {
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    require("../../src/subapp-web");
    xarc.setSubApp("phantom-subapp", { start: () => "test string" });
    xarc.setBundle("phantom-subapp", {});
    const ret = index.lazyLoadSubApp({ name: "phantom-subapp" });
    expect(ret).to.equal("test string");
  });

  it("lazyLoadSubApp should run onLoad if it is specified but not id and both subapp and bundle are available", async () => {
    let called = false;
    mockRequire("../../src/xarc", {
      getBundle: () => true,
      getSubApp: () => true,
      startSubApp: () => Promise.resolve()
    });
    const index = require("../../src/index");
    index.lazyLoadSubApp({
      name: "phantom-subapp",
      onLoad: () => {
        called = true;
      }
    });
    expect(called).to.equal(false);
    await clock.runAll();
    expect(called).to.equal(true);
  });

  it("lazyLoadSubApp should call loadSubAppBundles if the bundle is not available", async () => {
    let called = false;
    global.window = {};
    mockRequire("../../src/xarc", {
      getBundle: () => undefined,
      loadSubAppBundles: () => {
        called = true;
      }
    });
    const index = require("../../src/index");
    index.lazyLoadSubApp({ name: "phantom-subapp" });
    expect(called).to.equal(true);
  });

  it("lazyLoadSubApp should run subapp.start if id is specified", async () => {
    let called = false;
    global.window = {};
    global.document = {
      getElementById: () => true
    };
    mockRequire("../../src/xarc", {
      getBundle: () => true,
      getSubApp: () => ({
        start: () => {
          called = true;
        }
      }),
      startSubApp: () => Promise.resolve()
    });
    const index = require("../../src/index");
    index.lazyLoadSubApp({ name: "phantom-subapp", id: "test-id" });
    expect(called).to.equal(false);
    await clock.runAll();
    expect(called).to.equal(true);
  });

  it("waitForSubApp should resolve promise if sub app is available", async () => {
    mockRequire("../../src/xarc", {
      getBundle: () => true,
      getSubApp: () => true,
      startSubApp: () => Promise.resolve()
    });
    const index = require("../../src/index");
    const ret = index.waitForSubApp("phantom-subapp");
    await clock.runAll();
    await ret;
  });

  it("waitForSubApp should reject promise if startSubApp fails to complete", async () => {
    mockRequire("../../src/xarc", {
      getBundle: () => true,
      getSubApp: () => false
    });
    const index = require("../../src/index");
    const ret = index.waitForSubApp("phantom-subapp", 51);
    await clock.runAll();
    return expect(ret).to.be.rejected;
  });

  it("getBrowserHistory should create and return xarc.rt.history", async () => {
    const xarc = {
      rt: {}
    };
    mockRequire("../../src/xarc", xarc);
    const index = require("../../src/index");
    const history = index.getBrowserHistory();
    expect(history).to.exist;
    expect(xarc.rt.history).to.exist;
    expect(history).to.equal(xarc.rt.history);
  });

  it("loadSubApp should run load subapp", async () => {
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "asdf"
    };
    index.loadSubApp(subAppInfo);
    const subApp = xarc.getSubApp("testsubapp");
    expect(subApp._started).to.exist;
  });

  it("loadSubApp should call preStart, preRender, signalReady", async () => {
    let preStartCalled = false;
    let preRenderCalled = false;
    let signalReadyCalled = false;
    let startCalled = false;
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    index.setupFramework(
      class {
        renderStart() {}
      }
    );
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "asdf"
    };
    index.loadSubApp(subAppInfo);
    xarc.startSubAppOnLoad({
      name: "testsubapp"
    });
    const subApp = xarc.getSubApp("testsubapp");
    subApp.preStart = () => {
      preStartCalled = true;
      return {};
    };
    subApp.preRender = () => {
      preRenderCalled = true;
    };
    subApp.signalReady = () => {
      signalReadyCalled = true;
    };
    subApp.start = () => {
      startCalled = true;
    };
    expect(preStartCalled).to.equal(false);
    expect(preRenderCalled).to.equal(false);
    expect(signalReadyCalled).to.equal(false);
    expect(startCalled).to.equal(false);
    await clock.runAll();
    clock.restore();
    return new Promise(accept => {
      setTimeout(() => {
        expect(preStartCalled).to.equal(true);
        expect(preRenderCalled).to.equal(true);
        expect(signalReadyCalled).to.equal(true);
        expect(startCalled).to.equal(true);
        accept();
      }, 100);
    });
  });

  it("loadSubApp should create a getInstance method", async () => {
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "testcontent"
    };
    index.loadSubApp(subAppInfo);
    const subApp = xarc.getSubApp("testsubapp");
    const instance = subApp.getInstance({ id: "testid" });
    expect(instance).to.exist;
  });

  it("loadSubApp should create a start method", async () => {
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "testcontent"
    };
    index.loadSubApp(subAppInfo);
    const subApp = xarc.getSubApp("testsubapp");
    expect(subApp.start).to.not.throw;
  });

  it("loadSubApp should create a inline method", async () => {
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "testcontent"
    };
    index.loadSubApp(subAppInfo);
    const subApp = xarc.getSubApp("testsubapp");
    expect(subApp.inline).to.not.throw;
  });

  it("hotReloadSubApp should run subapp.start", async () => {
    let called = false;
    require("../../src/subapp-web");
    const xarc = require("../../src/xarc").default;
    const index = require("../../src/index");
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "asdf"
    };
    index.loadSubApp(subAppInfo);
    const subApp = xarc.getSubApp(subAppInfo.name);
    subApp.start = () => {
      called = true;
    };
    subApp._started = [true];
    index.hotReloadSubApp(subAppInfo);
    expect(called).to.equal(false);
    await clock.runAll();
    expect(called).to.equal(true);
  });

  it("hotReloadSubApp should return true if subapp is loaded", async () => {
    require("../../src/subapp-web");
    const index = require("../../src/index");
    const subAppInfo = {
      name: "testsubapp",
      Component: () => "asdf"
    };
    expect(index.isLoaded(subAppInfo.name)).to.equal(false);
    index.loadSubApp(subAppInfo);
    expect(index.isLoaded(subAppInfo.name)).to.equal(true);
  });
});
