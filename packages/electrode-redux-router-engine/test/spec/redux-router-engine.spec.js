"use strict";

const Path = require("path");
const ReduxRouterEngine = require("../..");
const xstdout = require("xstdout");
const Url = require("url");
const expect = require("chai").expect;
require("babel-register");

const routes = require("../routes.jsx").default;

describe("redux-router-engine", function() {
  let testReq;

  beforeEach(() => {
    testReq = {
      method: "get",
      log: () => {},
      app: {}
    };
  });

  it("should return 404 for unknown index route", () => {
    const engine = new ReduxRouterEngine({ routes });
    testReq.url = Url.parse("/oop/blah");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(404);
    });
  });

  it("should return string error", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes });
    testReq.url = Url.parse("/test/init-not-found");

    return engine.render(testReq).then(result => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result.message).includes("Cannot find module");
    });
  });

  it("should return Error error", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes, routesHandlerPath: Path.join(__dirname, "..") });
    testReq.url = Url.parse("/throw-error");

    return engine.render(testReq).then(result => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result._err.message).includes("failed error");
    });
  });

  it("should handle a Promise returned from renderToString", () => {
    const testHtml = "test promise result from RTS";
    const engine = new ReduxRouterEngine({
      routes,
      renderToString: () => Promise.resolve(testHtml)
    });
    testReq.url = Url.parse("/test");

    return engine.render(testReq).then(result => {
      expect(result.html).to.equal(testHtml);
    });
  });

  it("should resolve index route", () => {
    const engine = new ReduxRouterEngine({ routes, routesHandlerPath: "test" });
    testReq.url = Url.parse("/test");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Home</div></div>");
      expect(result.prefetch).to.equal("window.__PRELOADED_STATE__ = {};");
    });
  });

  it("should parse req.path if req.url is missing", () => {
    const engine = new ReduxRouterEngine({ routes, routesHandlerPath: "test" });
    testReq.path = "/test?foo=bar";

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Home<!-- --> - Query: ?foo=bar</div></div>");
      expect(result.prefetch).to.equal("window.__PRELOADED_STATE__ = {};");
    });
  });

  it("should use options.location", () => {
    const engine = new ReduxRouterEngine({ routes, routesHandlerPath: "test" });
    testReq.url = Url.parse("/test?foo=bar");

    return engine.render(testReq, { location: Url.parse("/test?a=1") }).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Home<!-- --> - Query: ?a=1</div></div>");
      expect(result.prefetch).to.equal("window.__PRELOADED_STATE__ = {};");
    });
  });

  it("should load init without leading . from node_modules", () => {
    const engine = new ReduxRouterEngine({ routes, routesHandlerPath: "test" });
    testReq.url = Url.parse("/test-init-nm");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Home</div></div>");
      expect(result.prefetch).to.equal(`window.__PRELOADED_STATE__ = {"Page":["test-init-nm"]};`);
    });
  });

  it("should use top reducer exclusively if it's a function", () => {
    const engine = new ReduxRouterEngine({
      routes: Path.resolve(__dirname, "../routes"),
      routesHandlerPath: "./test"
    });
    testReq.url = Url.parse("/top-reducer/init");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Test</div></div>");
      expect(result.prefetch).to.equal(
        `window.__PRELOADED_STATE__ = {"top":"top-reducer","foo":["test-init"]};`
      );
    });
  });

  it("should take routes as name of module", () => {
    const engine = new ReduxRouterEngine({ routes: "./test/routes" });
    testReq.url = Url.parse("/test");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Home</div></div>");
      expect(result.prefetch).to.equal("window.__PRELOADED_STATE__ = {};");
    });
  });

  it("should resolve skip SSR if disabled", () => {
    const engine = new ReduxRouterEngine({ routes });
    testReq.url = Url.parse("/test");
    testReq.app.disableSSR = true;

    return engine.render(testReq).then(result => {
      expect(result.html).to.equal("<!-- SSR disabled by request -->");
    });
  });

  it("escapes troublesome characters in the state", () => {
    const engine = new ReduxRouterEngine({ routes, routesHandlerPath: Path.join(__dirname, "..") });
    testReq.url = Url.parse("/escape-chars");

    return engine.render(testReq).then(result => {
      expect(result.prefetch).to.contain(
        "window.__PRELOADED_STATE__ = " +
          `{"scriptTag":"\\u003C/script>\\u003Cscript>console.log(\\"Welcome to an XSS attack!\\")` +
          `\\u003C/script>","troublesomeEndings":"LineSeparator: \\u2028 ParagraphSeprator: \\u2029"}`
      );
    });
  });

  it("should return 302 for router Redirect component", () => {
    const engine = new ReduxRouterEngine({ routes, componentRedirect: true });
    testReq.url = Url.parse("/test/component-redirect");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(302);
      expect(result.html).to.equal("<div>Page<div><div>Test</div></div></div>");
      expect(result.path).to.equal("/redirect-target");
    });
  });

  it("should return 500 for invalid component", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes, production: true });
    testReq.url = Url.parse("/invalid-component");
    return engine.render(testReq).then(result => {
      intercept.restore();
      expect(result.status).to.equal(500);
      // React 18 renderToString method does not error out the same way as in previous versions.
      // "Nothing was returned from render" is not returned and neither is status 500.
      // Instead, status 500 has to be manually declared in routes.js
    });
  });

  it("should return 404 if component throws 404", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes });
    testReq.url = Url.parse("/error-component");

    return engine.render(testReq).then(result => {
      intercept.restore();
      expect(result.status).to.equal(404);
      expect(result._err).to.be.ok;
    });
  });

  it("Ensure engine renders page when withIds is requested", () => {
    const engine = new ReduxRouterEngine({ routes, withIds: true });
    testReq.url = Url.parse("/test");

    return engine.render(testReq).then(result => {
      // At one time, this would generate react-id and reactroot, but no longer
      expect(result.html).to.equal("<div>Page<div>Home</div></div>");
    });
  });

  it("should fail if path doesn't start with basename", () => {
    const engine = new ReduxRouterEngine({ routes, basename: "/my-base" });
    testReq.url = Url.parse("/wrong-base/test/basename");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(404);
    });
  });

  it("should render Link with no basename", () => {
    const engine = new ReduxRouterEngine({ routes });
    testReq.url = Url.parse("/test/basename");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal(`<div>Page<a href="/to-target">Test</a></div>`);
    });
  });

  it("should render Link with basename", () => {
    const engine = new ReduxRouterEngine({ routes, basename: "/my-base" });
    testReq.url = Url.parse("/my-base/test/basename");

    return engine.render(testReq).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal(`<div>Page<a href="/my-base/to-target">Test</a></div>`);
    });
  });

  it("should not populate react-id by default", () => {
    const engine = new ReduxRouterEngine({ routes });
    testReq.url = Url.parse("/test");

    return engine.render(testReq).then(result => {
      expect(result.html).to.not.contain("data-reactroot");
    });
  });

  it("should use optional callbacks to stringify preload state", () => {
    const engine = new ReduxRouterEngine({
      routes,
      stringifyPreloadedState: () => `window.__TEST_STATE__`,
      renderToString: () => "test"
    });
    testReq.url = Url.parse("/test");

    return engine.render(testReq).then(result => {
      expect(result.prefetch).to.equal(`window.__TEST_STATE__`);
    });
  });

  it("should use optional logError", () => {
    let error;
    testReq.url = Url.parse("/test/init-not-found");

    return new ReduxRouterEngine({
      routes,
      logError: (req, err) => {
        error = err;
      }
    })
      .render(testReq)
      .then(result => {
        expect(result.status).to.equal(500);
        expect(error).to.not.equal(undefined);
      });
  });

  it("Ensure engine renders page when withIds construction option is overridden", () => {
    const engine = new ReduxRouterEngine({ routes, withIds: true });
    testReq.url = Url.parse("/test");

    return engine.render(testReq, { withIds: false }).then(result => {
      // At one time, this would generate react-id and reactroot, but no longer
      expect(result.html).to.equal("<div>Page<div>Home</div></div>");
    });
  });

  it("should return 500 for method not allowed", () => {
    const intercept = xstdout.intercept(true);
    const req = {
      path: "/not-post",
      method: "post",
      log: () => {},
      app: {},
      url: Url.parse("/not-post")
    };

    const engine = new ReduxRouterEngine({ routes });

    return engine.render(req).then(result => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result.message).to.include(`doesn't allow request method post`);
    });
  });

  it("should return 200 for allowed method", () => {
    const intercept = xstdout.intercept(true);
    const req = {
      path: "/head-only",
      method: "head",
      log: () => {},
      app: {},
      url: Url.parse("/head-only")
    };

    const engine = new ReduxRouterEngine({ routes });

    return engine.render(req).then(result => {
      intercept.restore();
      expect(result.status).to.equal(200);
    });
  });

  it("should load custom handler using path", () => {
    const req = {
      path: "/test/init",
      method: "get",
      log: () => {},
      app: {},
      url: Url.parse("/test/init")
    };

    const engine = new ReduxRouterEngine({
      routes,
      routesHandlerPath: Path.join(__dirname, "..")
    });

    return engine.render(req).then(result => {
      expect(result.status).to.equal(200);
      expect(result.prefetch).include("test-init");
    });
  });

  it("should allow top init to awaitInits on multiple matching child routes", () => {
    const req = {
      path: "/top-wait/init",
      method: "get",
      log: () => {},
      app: {},
      url: Url.parse("/top-wait/init")
    };

    const engine = new ReduxRouterEngine({
      routes: Path.join(__dirname, "../routes"),
      routesHandlerPath: "./test"
    });

    return engine.render(req).then(result => {
      expect(result.status).to.equal(200);
      expect(result.html).to.equal("<div>Page<div>Test</div><div>Test Redux</div></div>");
      //
      // Note that the correct prefetch should've included the data for
      // test-redux but was not since react-router-config matchRoutes
      // stops after the first matched route.
      //
      // This is an open question on what the behavior should be.
      //
      // https://github.com/ReactTraining/react-router/issues/6224
      //
      expect(result.prefetch).include(
        `window.__PRELOADED_STATE__ = {"top-wait":["top-wait"],"bar":["test-init"]};`
      );
    });
  });

  it("should load init by path if init is true", () => {
    const req = {
      path: "/test-init2",
      method: "get",
      log: () => {},
      app: {},
      url: Url.parse("/test-init2")
    };

    const engine = new ReduxRouterEngine({
      routes: "./test/routes",
      routesHandlerPath: "./test"
    });

    return engine.render(req).then(result => {
      expect(result.status).to.equal(200);
      expect(result.prefetch).include("test-init2");
    });
  });

  it("should load init by path if init is true and url is string", () => {
    const req = {
      path: "/test-init2",
      method: "get",
      log: () => {},
      app: {},
      url: "/test-init2"
    };

    const engine = new ReduxRouterEngine({
      routes: "./test/routes",
      routesHandlerPath: "./test"
    });

    return engine.render(req).then(result => {
      expect(result.status).to.equal(200);
      expect(result.prefetch).include("test-init2");
    });
  });

  it("should load init by path if init is true and url is hapi@18 WHATWG url format", () => {
    const req = {
      path: "/test-init2",
      method: "get",
      log: () => {},
      app: {},
      url: {
        href: "/test-init2",
        origin: "",
        protocol: "http:",
        username: "",
        password: "",
        host: "",
        hostname: "",
        port: "80",
        pathname: "/test-init2",
        search: "",
        searchParams: {},
        hash: ""
      }
    };

    const engine = new ReduxRouterEngine({
      routes: "./test/routes",
      routesHandlerPath: "./test"
    });

    return engine.render(req).then(result => {
      expect(result.status).to.equal(200);
      expect(result.prefetch).include("test-init2");
    });
  });

  it("should have state preloaded after rendering", () => {
    process.env.NODE_ENV = "production";
    const req = {
      path: "/test/redux",
      method: "get",
      log: () => {},
      app: {},
      url: Url.parse("/test/redux")
    };

    const engine = new ReduxRouterEngine({
      routes,
      routesHandlerPath: Path.join(__dirname, "..")
    });

    return engine.render(req).then(result => {
      expect(result.prefetch).include("52");
    });
  });
});
