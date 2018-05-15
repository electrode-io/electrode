"use strict";

const Promise = require("bluebird");
const Path = require("path");
const ReduxRouterEngine = require("../..");
const xstdout = require("xstdout");

const expect = require("chai").expect;

require("babel-register");

const createStore = require("redux").createStore;

const routes = require("../routes.jsx").default;
const badRoutes = require("../bad-routes.jsx").default;
const errorRoutes = require("../error-routes.jsx").default;
const RedirectRoute = require("../error-routes.jsx").RedirectRoute;
const getIndexRoutes = require("../get-index-routes.jsx").default;
const ErrorRoute = require("../get-index-routes.jsx").ErrorRoute;

const createReduxStore = () => Promise.resolve(createStore((state) => state, ["Use Redux"]));

describe("redux-router-engine", function () {

  let testReq;

  beforeEach(() => {
    testReq = {
      method: "get",
      log: () => {
      },
      app: {},
      url: {}
    };
  });

  it("should return 404 for unknown index route", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore });
    testReq.url.path = "/test/blah";

    return engine.render(testReq).then((result) => {
      expect(result.status).to.equal(404);
    });
  });

  it("should return string error", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes: getIndexRoutes, createReduxStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result._err).to.equal("failed");
    });
  });


  it("should return Error error", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes: ErrorRoute, createReduxStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result._err.message).to.equal("failed error");
    });
  });

  it("should handle a Promise returned from renderToString", () => {
    const testHtml = "test promise result from RTS";
    const engine = new ReduxRouterEngine({
      routes, createReduxStore, renderToString: () => Promise.resolve(testHtml)
    });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      expect(result.html).to.equal(testHtml);
    });

  });

  it("should resolve index route", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      expect(result.status).to.equal(200);
    });
  });

  it("should resolve skip SSR if disabled", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore });
    testReq.url.path = "/test";
    testReq.app.disableSSR = true;

    return engine.render(testReq).then((result) => {
      expect(result.html).to.be.empty;
    });
  });

  it("should bootstrap a redux store if redux option is passed in", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      expect(result.prefetch).to.contain(`window.__PRELOADED_STATE__ = ["Use Redux"];`);
    });
  });

  it("escapes troublesome characters in the state", () => {
    const createTestLocalStore = () => Promise.resolve(createStore((state) => state, {
      scriptTag: "</script><script>console.log(\"Welcome to an XSS attack!\")</script>",
      troublesomeEndings: "LineSeparator: \u2028 ParagraphSeprator: \u2029"
    }));
    const engine = new ReduxRouterEngine({ routes, createReduxStore: createTestLocalStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      expect(result.prefetch).to.contain("window.__PRELOADED_STATE__ = " +
      "{\"scriptTag\":\"\\u003C/script>\\u003Cscript>console.log(\\\"Welcome to an XSS attack!\\\")" +
      "\\u003C/script>\",\"troublesomeEndings\":\"LineSeparator: \\u2028 ParagraphSeprator: \\u2029\"}");
    });
  });

  it("should redirect redirect route", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore });
    testReq.url.path = "/test/source";

    return engine.render(testReq).then((result) => {
      expect(result.status).to.equal(302);
      expect(result.path).to.equal("/test/target");
    });
  });

  it("should return 500 for invalid component", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes: badRoutes, createReduxStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result._err.message)
        .to.contain("Nothing was returned from render");
    });
  });

  it("should return 404 if component throws 404", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes: errorRoutes, createReduxStore });
    testReq.url.path = "/";

    return engine.render(testReq).then((result) => {
      intercept.restore();
      expect(result.status).to.equal(404);
      expect(result._err).to.be.ok;
    });
  });

  it("should return 302 and redirect path if component throws related error", () => {
    const intercept = xstdout.intercept(true);
    const engine = new ReduxRouterEngine({ routes: RedirectRoute, createReduxStore });
    testReq.url.path = "/redirect";

    return engine.render(testReq).then((result) => {
      intercept.restore();
      expect(result.status).to.equal(302);
      expect(result.path).to.equal("/new/location");
      expect(result._err).to.be.ok;
    });
  });

  it("should populate react-id when requested", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore, withIds: true });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      expect(result.html).to.contain("data-reactroot");
    });
  });

  it("should not populate react-id by default", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore });
    testReq.url.path = "/test";

    return engine.render(testReq).then((result) => {
      expect(result.html).to.not.contain("data-reactroot");
    });
  });

  it("should use optional callbacks", () => {
    let error;
    const engine = new ReduxRouterEngine({
      routes,
      createReduxStore,
      stringifyPreloadedState: () => `window.__TEST_STATE__`,
      renderToString: () => "test"
    });
    testReq.url.path = "/test";

    return engine.render(testReq)
      .then((result) => {
        expect(result.prefetch).to.equal(`window.__TEST_STATE__`);
        expect(result.html).to.equal("test");
        return new ReduxRouterEngine({
          routes: badRoutes,
          createReduxStore,
          logError: (req, err) => {
            error = err;
          }
        }).render(testReq);
      })
      .then((result) => {
        expect(result.status).to.equal(500);
        expect(error).to.not.equal(undefined);
      });
  });

  it("should override constructor prop with render prop", () => {
    const engine = new ReduxRouterEngine({ routes, createReduxStore, withIds: true });
    testReq.url.path = "/test";

    return engine.render(testReq, { withIds: false }).then((result) => {
      expect(result.html).to.not.contain("data-reactroot");
    });
  });

  it("should return 500 for method not allowed", () => {
    const intercept = xstdout.intercept(true);
    const req = {
      path: "/test",
      method: "post",
      log: () => {
      },
      app: {},
      url: {}
    };

    const engine = new ReduxRouterEngine({ routes, createReduxStore });

    return engine.render(req).then((result) => {
      intercept.restore();
      expect(result.status).to.equal(500);
      expect(result.message).to.include(`doesn't allow request method post`);
    });
  });

  it("should load custom handler using path", () => {
    const req = {
      path: "/test-init",
      method: "get",
      log: () => {
      },
      app: {},
      url: {}
    };

    const engine = new ReduxRouterEngine({ routes, createReduxStore, routesHandlerPath: Path.join(__dirname, "..") });

    return engine.render(req).then((result) => {
      expect(result.prefetch).include("test-init");
    });
  });

  it("should load custom handler as specified", () => {
    const req = {
      path: "/test-init2",
      method: "get",
      log: () => {
      },
      app: {},
      url: {}
    };

    const engine = new ReduxRouterEngine({ routes, createReduxStore, routesHandlerPath: Path.join(__dirname, "..") });
    const test = () => engine.render(req).then((result) => {
      expect(result.prefetch).include("test-2init");
    });
    return test().then(() => test());
  });

  it("should have state preloaded after rendering", () => {
    const req = {
      path: "/test-redux",
      method: "get",
      log: () => {
      },
      app: {},
      url: {}
    };

    const engine = new ReduxRouterEngine({ routes, createReduxStore, routesHandlerPath: Path.join(__dirname, "..") });

    return engine.render(req).then((result) => {
      expect(result.prefetch).include("1");
    });
  });
});
