"use strict";

/* eslint-disable quotes */

const Fs = require("fs");
const assign = require("object-assign");
const electrodeServer = require("electrode-server2");
const Path = require("path");
const { expect } = require("chai");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const Helmet = require("react-helmet").Helmet;
const { runFinally, asyncVerify } = require("run-verify");
const Munchy = require("munchy");
const xaa = require("xaa");

const getConfig = () => {
  return {
    connections: {
      default: {
        port: 0
      }
    },
    plugins: {
      "react-webapp": {
        module: Path.join(__dirname, "../../lib/hapi/plugin17"),
        options: {
          templateFile: true,
          pageTitle: "Electrode App",
          paths: {
            "/test/component-redirect": {
              content: {
                module: Path.join(__dirname, "../router-engine/content.jsx")
              }
            },
            "/{args*}": {
              content: {
                status: 200,
                html: "<div>Hello Electrode</div>",
                prefetch: "console.log('Hello');"
              }
            },
            "/select": {
              selectTemplate: (request, routeOptions) => {
                request.app.routeOptions = routeOptions;
                if (request.query.template === "1") {
                  return {
                    htmlFile: Path.join(__dirname, "../fixtures/dynamic-index-1.html"),
                    cacheKey: request.query.cache_key,
                    cacheId: request.query.cache_id
                  };
                } else if (request.query.template === "2") {
                  return Promise.resolve({
                    htmlFile: Path.join(__dirname, "../fixtures/dynamic-index-2.html"),
                    tokenHandlers: Path.join(__dirname, "../fixtures/token-handler")
                  });
                } else if (request.query.template === "3") {
                  return {
                    htmlFile: Path.join(__dirname, "../fixtures/dynamic-index-1.html"),
                    cacheId: "page_title_1",
                    options: {
                      pageTitle: "test page title 1"
                    }
                  };
                } else if (request.query.template === "4") {
                  return {
                    tokenHandlers: Path.join(__dirname, "../fixtures/token-handler")
                  };
                }
                return null; // select default
              },
              content: {
                status: 200,
                html: "<div>Hello Electrode</div>",
                prefetch: "console.log('Hello');"
              }
            },
            "/react-helmet": {},
            "/intercept": {
              templateFile: Path.join(__dirname, "../jsx-templates/index-intercept"),
              content: {
                status: 200,
                html: "<div>Hello Electrode</div>",
                prefetch: "console.log('Hello');"
              }
            }
          }
        }
      }
    },
    electrode: {
      logLevel: "none"
    }
  };
};

describe("hapi 17 electrode-react-webapp with jsx template", () => {
  let config;
  let configOptions;
  let mainRoutePathOptions;
  let testServer;
  let compat;

  let stdoutIntercept;

  const stopServer = server => server && server.stop();

  beforeEach(() => {
    delete require.cache[require.resolve("../../lib/hapi")];
    delete require.cache[require.resolve("../..")];
    compat = require("electrode-hapi-compat");
    compat._testSetHapi17(true);

    config = getConfig();
    configOptions = config.plugins["react-webapp"].options;
    mainRoutePathOptions = configOptions.paths["/{args*}"];
  });

  afterEach(() => {
    if (stdoutIntercept) {
      stdoutIntercept.restore();
      stdoutIntercept = undefined;
    }

    if (testServer) {
      return testServer.stop().then(() => {
        testServer = undefined;
      });
    }

    return Promise.resolve();
  });

  it("should fail if registering plugin throws", done => {
    const hapi17 = require("../../lib/hapi/plugin17");
    try {
      hapi17.register(
        {
          route: () => {
            throw Error("bad-module");
          }
        },
        {
          paths: {
            error: {
              content: { module: "bad-module" }
            }
          }
        }
      );
    } catch (err) {
      expect(err).to.be.ok;
      done();
    }
  });

  it("should successfully render with enterHead scripts", () => {
    configOptions.unbundledJS = {
      enterHead: ["test-static-markup script", { src: "blah-123" }]
    };

    const verify = () => {
      return testServer
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(`<script>test-static-markup script;</script>`);
          expect(res.result).to.contain(`<script src="blah-123"></script>`);
          expect(res.result).to.contain("<title>Electrode App</title>");
          expect(res.result).to.contain("<div>Hello Electrode</div>");
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          expect(res.result).to.not.contain("Unknown marker");
        });
    };
    return electrodeServer(config).then(server => {
      testServer = server;
      return verify().then(verify);
    });
  });

  it("should successfully render to static markup", () => {
    return electrodeServer(config).then(server => {
      const makeRequest = () => {
        return server
          .inject({
            method: "GET",
            url: "/"
          })
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<div>Hello Electrode</div>");
            expect(res.result).to.contain("<script>console.log('Hello');</script>");
            expect(res.result).to.not.contain("Unknown marker");
          });
      };

      return makeRequest()
        .then(() => makeRequest())
        .then(() => stopServer(server))
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully render to static markup with insert IDs", () => {
    configOptions.insertTokenIds = true;
    return electrodeServer(config).then(server => {
      const makeRequest = () => {
        return server
          .inject({
            method: "GET",
            url: "/"
          })
          .then(res => {
            expect(res.statusCode).to.equal(200);
            const result = res.result;
            expect(result).to.contain("<title>Electrode App</title>");
            expect(result).to.contain("<div>Hello Electrode</div>");
            expect(result).to.contain("<script>console.log('Hello');</script>");
            expect(result).to.not.contain("Unknown marker");
            expect(result).contains("<!-- BEGIN INITIALIZE props: {} -->");
            expect(result).contains("<!-- INITIALIZE END -->");
            expect(result).contains("<!-- BEGIN PAGE_TITLE props: {} -->");
            expect(result).contains("<!-- PAGE_TITLE END -->");
            expect(result).contains(
              "<!-- HEAD_INITIALIZE removed due to its handler set to null -->"
            );
          });
      };

      return makeRequest()
        .then(() => makeRequest())
        .then(() => stopServer(server))
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully render to static markup with content as a function", () => {
    assign(mainRoutePathOptions, {
      content: () =>
        Promise.resolve({
          status: 200,
          html: "<div>Hello Electrode</div>",
          prefetch: "console.log('Hello');"
        })
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("<title>Electrode App</title>");
          expect(res.result).to.contain("<div>Hello Electrode</div>");
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully render to static markup with useStream true", () => {
    assign(mainRoutePathOptions, {
      content: () =>
        Promise.resolve({
          status: 200,
          html: "<div>Hello Electrode from munchy</div>",
          prefetch: "console.log('Hello');",
          useStream: true
        })
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("<title>Electrode App</title>");
          expect(res.result).to.contain("<div>Hello Electrode from munchy</div>");
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully render to static markup with content html as stream", () => {
    const munchy = new Munchy(
      {},
      "<div>Hello Electrode from munchy stream</div>",
      "<p>test 2</p>",
      null
    );
    assign(mainRoutePathOptions, {
      content: () =>
        Promise.resolve({
          status: 200,
          html: munchy,
          prefetch: "console.log('Hello');",
          useStream: true
        })
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("<title>Electrode App</title>");
          expect(res.result).to.contain("<div>Hello Electrode from munchy stream</div>");
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully return 302 redirect", () => {
    return electrodeServer(config).then(server => {
      return server
        .inject({ method: "GET", url: "/test/component-redirect" })
        .then(res => {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal("/redirect-target");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should return 500 if content rejects with error", () => {
    assign(mainRoutePathOptions, {
      content: () =>
        Promise.reject({
          status: 500,
          message: "Internal server error"
        })
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(500);
          expect(res.statusMessage).to.equal("Internal Server Error");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle multiple entry points - foo", () => {
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/foo"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("foo.bundle.f07a873ce87fc904a6a5.js");
          expect(res.result).to.contain("foo.style.f07a873ce87fc904a6a5.css");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle multiple entry points - bar", () => {
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/bar"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("bar.bundle.f07a873ce87fc904a6a5.js");
          expect(res.result).to.contain("bar.style.f07a873ce87fc904a6a5.css");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle multiple entry points - multi-chunk", () => {
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/multi-chunk"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("foo.style.f07a873ce87fc904a6a5.css");
          expect(res.result).to.contain("bar.style.f07a873ce87fc904a6a5.css");
          expect(res.result).to.contain("home.bundle.f07a873ce87fc904a6a5.js");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle multiple entry points - @dev multi-chunk", () => {
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    process.env.WEBPACK_DEV = "true";
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/multi-chunk"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("http://localhost:2992/js/foo.style.css");
          expect(res.result).to.contain("http://localhost:2992/js/bar.style.css");
          expect(res.result).to.contain("http://localhost:2992/js/home.bundle.dev.js");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle multiple entry points - @dev @empty", () => {
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    process.env.WEBPACK_DEV = "true";
    return electrodeServer(config)
      .then(server => {
        return server
          .inject({
            method: "GET",
            url: "/empty"
          })
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("http://localhost:2992/js/bundle.dev.js");
            expect(res.result).to.contain("http://localhost:2992/js/style.css");
            stopServer(server);
          })
          .catch(err => {
            stopServer(server);
            throw err;
          });
      })
      .finally(() => {
        delete process.env.WEBPACK_DEV;
      });
  });

  it("should handle multiple entry points with a prodBundleBase", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/multi/";
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/bar"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(
            `<script src="http://awesome-cdn.com/multi/bar.bundle.f07a873ce87fc904a6a5.js"`
          );
          expect(res.result).to.contain(
            `<link rel="stylesheet" href="http://awesome-cdn.com/multi/bar.style.f07a873ce87fc904a6a5.css"`
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle multiple entry points - default", () => {
    configOptions.bundleChunkSelector = "test/data/chunk-selector.js";
    configOptions.stats = "test/data/stats-test-multibundle.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("bundle.f07a873ce87fc904a6a5.js");
          expect(res.result).to.contain("style.f07a873ce87fc904a6a5.css");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject a pwa manfiest", () => {
    configOptions.stats = "test/data/stats-test-pwa.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain('<link rel="manifest" href="/js/manifest.json" />');
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject a pwa manfiest in dev mode", () => {
    configOptions.stats = "test/data/stats-test-pwa.json";
    configOptions.webpackDev = true;

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(
            '<link rel="manifest" href="http://localhost:2992/js/manifest.json" />'
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject a pwa manfiest with a prodBundleBase", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/subdir/";
    configOptions.stats = "test/data/stats-test-pwa.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(
            '<link rel="manifest" href="http://awesome-cdn.com/subdir/manifest.json" />'
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject pwa icons", () => {
    configOptions.iconStats = "test/data/icon-stats-test-pwa.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain('<meta name="mobile-web-app-capable" content="yes">');
          expect(res.result).to.contain('<meta name="application-name" content="Electrode">');
          expect(res.result).to.contain('<link rel="icon" href="/js/favicon-32x32.png">');
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject critical css", () => {
    configOptions.criticalCSS = "test/data/critical.css";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("<style>body {color: green;}\n</style>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject a script reference with a provided prodBundleBase", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(
            '<script src="http://awesome-cdn.com/myapp/bundle.f07a873ce87fc904a6a5.js">'
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject from unbundledJS enterHead", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";

    config.plugins["react-webapp"].options.unbundledJS = {
      enterHead: [`console.log("test-unbundledJS-enterHead")`, { src: "test-enter-head.js" }]
    };
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(
            '<script src="http://awesome-cdn.com/myapp/bundle.f07a873ce87fc904a6a5.js">'
          );
          expect(res.result).to.contain("test-unbundledJS-enterHead");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it.skip("should use top level htmlFile and return response headers", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).includes(`<title>user-handler-title</title>`);
          expect(res.result).includes(`</script><div>user-promise-token</div>\n<script`);
          expect(res.result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(res.result).includes(
            `</script><div>from custom-1</div><div>user-token-1</div><div>user-token-2</div><noscript>` // eslint-disable-line
          );
          expect(res.headers["x-foo-bar"]).to.equal("hello-world");
          expect(res.statusCode).to.equal(200);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle if content function throws", () => {
    assign(mainRoutePathOptions, {
      content: () => {
        const err = new Error("test content throw");
        err.html = "test content throw html with status";
        err.status = 401;
        return Promise.reject(err);
      }
    });

    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(401);
          expect(res.result).contains("test content throw html with status");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle if content function throws generic error", () => {
    assign(mainRoutePathOptions, {
      content: () => {
        const err = new Error("test content throw");
        return Promise.reject(err);
      }
    });

    configOptions.replyErrorStack = false;
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(500);
          expect(res.result).contains("test content throw");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should reply with error stack if option is not false", () => {
    assign(mainRoutePathOptions, {
      content: () => {
        const err = new Error("test content throw");
        return Promise.reject(err);
      }
    });

    // configOptions.replyErrorStack = false;
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(500);
          expect(res.result).contains("/test/spec/hapi17.jsx-index.spec.js");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle non-render errors", () => {
    assign(mainRoutePathOptions, {
      content: () => ""
    });

    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/non-render-error"
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(500);
          expect(res.result).contains("error from test/fixtures/non-render-error");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should pass options with mode as datass from request to content function", () => {
    let ssrPrefetchOnly;
    assign(mainRoutePathOptions, {
      content: request => {
        ssrPrefetchOnly = request.app.ssrPrefetchOnly;
        const mode = ssrPrefetchOnly && "datass";
        return Promise.resolve({
          status: 200,
          html: "no-ss",
          prefetch: `prefetch-mode: ${mode}`
        });
      }
    });

    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.templateFile = "test/jsx-templates/index-1";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=datass"
        })
        .then(res => {
          expect(ssrPrefetchOnly).to.equal(true);
          expect(res.statusCode).to.equal(200);
          const result = res.result.split("\n").join("");
          expect(result).includes("no-ss");
          expect(result).includes("prefetch-mode: datass");
          expect(result).includes(`<title>user-handler-title</title>`);
          expect(result).includes(`</script><div>user-promise-token</div><script`);
          expect(result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(result).includes(
            `</script><div>from custom-1</div><div>user-token-1</div><div>user-token-2</div><noscript>` // eslint-disable-line
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should pass datass mode from routeOptions to content function", () => {
    configOptions.serverSideRendering = "datass";
    let ssrPrefetchOnly;
    assign(mainRoutePathOptions, {
      content: request => {
        ssrPrefetchOnly = request.app.ssrPrefetchOnly;
        const mode = ssrPrefetchOnly && "datass";
        return Promise.resolve({
          status: 200,
          html: "no-ss",
          prefetch: `prefetch-mode: ${mode}`
        });
      }
    });

    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.templateFile = "test/jsx-templates/index-1";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(ssrPrefetchOnly).to.equal(true);
          expect(res.statusCode).to.equal(200);
          const result = res.result.split("\n").join("");
          expect(result).includes("no-ss");
          expect(result).includes("prefetch-mode: datass");
          expect(result).includes(`<title>user-handler-title</title>`);
          expect(result).includes(`</script><div>user-promise-token</div><script`);
          expect(result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(result).includes(
            `</script><div>from custom-1</div><div>user-token-1</div><div>user-token-2</div><noscript>` // eslint-disable-line
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle mode as noss from request", () => {
    let contentCalled = false;
    assign(mainRoutePathOptions, {
      content: () => {
        contentCalled = true;
      }
    });

    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.templateFile = "test/jsx-templates/index-1";
    Object.assign(mainRoutePathOptions, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(contentCalled, "content should not have been called").to.equal(false);
          expect(res.statusCode).to.equal(200);
          const result = res.result.split("\n").join("");
          expect(result).includes(`<title>user-handler-title</title>`);
          expect(result).includes(`<!-- noss mode -->`);
          expect(result).includes(`</div><div>user-promise-token</div><script`);
          expect(result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(result).includes(
            `</script><div>from custom-1</div><div>user-token-1</div><div>user-token-2</div><noscript>` // eslint-disable-line
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should use route level templateFile", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    mainRoutePathOptions.templateFile = Path.resolve("test/jsx-templates/index-2");

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          const result = res.result.split("\n").join("");
          expect(result).to.contain(`<div>test jsx-2</div>`);
          expect(result).contains(`<div>Hello from async tag JSX-2</div>`);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should add a nonce value, if configuration specifies a path and a value is present", () => {
    configOptions.cspNonceValue = { script: "plugins.cspPlugin.nonceValue" };
    function cspRegister(server) {
      server.ext("onRequest", (request, h) => {
        request.plugins.cspPlugin = {
          nonceValue: "==ABCD"
        };
        return h.continue;
      });
    }
    const cspPlugin = {
      register: cspRegister,
      name: "cspPlugin"
    };

    return electrodeServer(config).then(server => {
      // Add a trivial csp generator for testing purposes.
      server.register(cspPlugin);
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).to.contain("<script nonce=\"==ABCD\">console.log('Hello');</script>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should add a nonce value as provided by a function in the config", () => {
    configOptions.cspNonceValue = function(request, type) {
      return `==${type}`;
    };

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).to.contain(
            "<script nonce=\"==script\">console.log('Hello');</script>"
          );
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should not add a nonce value, if configuration specifies a path and no value present", () => {
    configOptions.cspNonceValue = { script: "plugins.cspPlugin.nonceValue" };
    function cspRegister(server) {
      server.ext("onRequest", (request, h) => {
        request.plugins.cspPlugin = {};
        return h.continue;
      });
    }
    const cspPlugin = {
      register: cspRegister,
      name: "cspPlugin"
    };

    return electrodeServer(config).then(server => {
      // Add a trivial csp generator for testing purposes.
      server.register(cspPlugin);
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject critical css with a nonce value when provided", () => {
    configOptions.criticalCSS = "test/data/critical.css";
    configOptions.cspNonceValue = { style: "plugins.cspPlugin.nonceValue" };
    function cspRegister(server) {
      server.ext("onRequest", (request, h) => {
        request.plugins.cspPlugin = {
          nonceValue: "==ABCD"
        };
        return h.continue;
      });
    }
    const cspPlugin = {
      register: cspRegister,
      pkg: {
        name: "cspPlugin"
      }
    };

    return electrodeServer(config).then(server => {
      // Add a trivial csp generator for testing purposes.
      server.register(cspPlugin);
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain('<style nonce="==ABCD">body {color: green;}\n</style>');
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should inject critical css with a nonce value provided by a function", () => {
    configOptions.criticalCSS = "test/data/critical.css";
    configOptions.cspNonceValue = function(request, type) {
      return `==${type}`;
    };

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain('<style nonce="==style">body {color: green;}\n</style>');
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle 302 redirect", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 302,
        path: "/redirect2"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal("/redirect2");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it(`should allow content to be ""`, () => {
    assign(mainRoutePathOptions, {
      content: ""
    });

    return electrodeServer(config).then(server => {
      return Promise.resolve(
        server.inject({
          method: "GET",
          url: "/"
        })
      )
        .then(res => {
          const result = res.result.split("\n").join("");
          expect(result).contains(`<div class="js-content"></div>`);
        })
        .finally(() => {
          stopServer(server);
        });
    });
  });

  it("should fail if content is null", () => {
    assign(mainRoutePathOptions, {
      content: null
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(response => {
          stopServer(server);
          expect(response.result.statusCode).eq(500);
          expect(response.result.error).eq("Internal Server Error");
        });
    });
  });

  it("should handle unexpected errors", () => {
    const content = {
      html: "<div>Hello Electrode</div>",
      prefetch: "console.log('Hello');"
    };
    Object.defineProperty(content, "status", {
      get: () => {
        throw new Error("unexpected error");
      }
    });

    assign(mainRoutePathOptions, { content: () => Promise.resolve(content) });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          stopServer(server);
          expect(res.statusCode).to.equal(500);
          expect(res.result).contains("unexpected error");
        });
    });
  });

  it("should handle 200 status @noss", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 200,
        message: "status 200 noss"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result.message).to.equal("status 200 noss");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle 200 status @noss @no-html", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 200,
        message: "status 200 noss"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result.message).to.equal("status 200 noss");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle 200 status @noss @has-html", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 200,
        html: "test has html"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          const result = res.result.split("\n").join("");
          expect(result).contains(`<!DOCTYPE html><html lang="en">`);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should return 200 and direct html with render false", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 200,
        html: "<div>html</div>",
        render: false
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.equal("<div>html</div>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle content non 200 status noss mode", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 404,
        message: "status 404 noss"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(res.statusCode).to.equal(404);
          expect(res.result.message).to.equal("status 404 noss");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should return 404 and html, if custom html is provided", () => {
    assign(mainRoutePathOptions, {
      responseForBadStatus: null,
      content: {
        status: 404,
        html: "html content"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(res.statusCode).to.equal(404);
          const result = res.result.split("\n").join("");
          expect(result).to.contain('<div class="js-content">html content</div>');
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should not fail on not handled status codes", () => {
    assign(mainRoutePathOptions, {
      content: {
        status: 501,
        html: "custom 501 HTML message",
        message: "not implemented"
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(res.statusCode).to.equal(501);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should render if content has html despite non 200 status", () => {
    assign(mainRoutePathOptions, {
      options: {
        responseForBadStatus: null
      },
      content: {
        status: 501,
        html: null
      }
    });

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/?__mode=noss"
        })
        .then(res => {
          expect(res.statusCode).to.equal(501);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle option serverSideRendering false", () => {
    configOptions.serverSideRendering = false;
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).includes("<!DOCTYPE html>");
          expect(res.result).includes(`window["webappStart"]();`);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should handle nojs mode", () => {
    process.env.WEBPACK_DEV = "true";
    return electrodeServer(config)
      .then(server => {
        return server
          .inject({
            method: "GET",
            url: "/?__mode=nojs"
          })
          .then(res => {
            expect(res.result).to.not.includes(
              `<script src="http://localhost:2992/js/main.bundle.dev.js"></script>`
            );
            stopServer(server);
          })
          .catch(err => {
            stopServer(server);
            throw err;
          });
      })
      .finally(() => {
        delete process.env.WEBPACK_DEV;
      });
  });

  it("should handle user intercept on rendering", () => {
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/intercept"
        })
        .then(res => {
          expect(res.result).equals("context intercept handler");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should allow support react-helmet with custom token handler", () => {
    configOptions.unbundledJS = {
      enterHead: ["test-1 script"]
    };
    configOptions.insertTokenIds = true;

    assign(configOptions.paths["/react-helmet"], {
      insertTokenIds: false,
      tokenHandler: "./test/fixtures/react-helmet-handler",
      content: () => {
        return {
          status: 200,
          prefetch: "test-react-helmet",
          html: ReactDOMServer.renderToString(
            React.createElement(
              "div",
              null,
              "hello",
              React.createElement(
                Helmet,
                null,
                React.createElement("title", null, "Helmet Title 1"),
                React.createElement("meta", { name: "description", content: "Helmet application" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  Helmet,
                  null,
                  React.createElement("title", null, "Nested Title"),
                  React.createElement("meta", { name: "description", content: "Nested component" })
                )
              )
            )
          )
        };
      }
    });
    let server;
    return electrodeServer(config)
      .then(s => (server = s))
      .then(() => {
        return server
          .inject({
            method: "GET",
            url: "/"
          })
          .then(res => {
            // since there are two paths and the react-helmet-handler is only register for the
            // /react-helmet route, expect the other route's result to not find handler for it
            expect(res.result).contains(
              "REACT_HELMET_SCRIPTS removed due to its handler set to null"
            );
          });
      })
      .then(() => {
        return server
          .inject({
            method: "GET",
            url: "/react-helmet"
          })
          .then(res => {
            const result = res.result.split("\n").join("");
            // expect(result).includes(
            //   `<meta data-react-helmet="true" name="description" content="Nested component"/>`
            // );
            expect(result).includes(`<title data-react-helmet="true">Nested Title</title>`);
            expect(result)
              .includes(`window._config.ui = {"webappPrefix":""};</script><script>test-1 script;</script>\
<!--scripts from helmet--></head>`);
            stopServer(server);
          })
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
  });

  describe("with webpackDev", function() {
    it("should skip if webpack dev is not valid", () => {
      return electrodeServer(config).then(server => {
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            request.app.webpackDev = { valid: false };
            return h.continue;
          }
        });
        const makeRequest = () => {
          return server.inject({ method: "GET", url: "/" }).then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<!-- Webpack still compiling -->");
          });
        };

        return makeRequest()
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should skip if webpack compile has errors", () => {
      return electrodeServer(config).then(server => {
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            request.app.webpackDev = { valid: true, hasErrors: true };
            return h.continue;
          }
        });
        const makeRequest = () => {
          return server.inject({ method: "GET", url: "/" }).then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<!-- Webpack compile has errors -->");
          });
        };

        return makeRequest()
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should successfully render to static markup", () => {
      return electrodeServer(config).then(server => {
        const compileTime = Date.now();
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            return h.continue;
          }
        });
        const makeRequest = () => {
          return server
            .inject({
              method: "GET",
              url: "/"
            })
            .then(res => {
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.contain("<title>Electrode App</title>");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.contain("<script>console.log('Hello');</script>");
              expect(res.result).to.not.contain("Unknown marker");
            });
        };

        return makeRequest()
          .then(() => makeRequest())
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should select template 1 and render to static markup", () => {
      return electrodeServer(config).then(server => {
        const compileTime = Date.now();
        let captureRequest;
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            captureRequest = request;
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            return h.continue;
          }
        });

        const makeRequest = () => {
          return server
            .inject({
              method: "GET",
              url: "/select?template=1"
            })
            .then(res => {
              const htmlFile = Path.join(__dirname, "../fixtures/dynamic-index-1.html");
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.contain("<title>Electrode App</title>");
              expect(res.result).to.contain("DYNAMIC_INDEX_1");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.not.contain("Unknown marker");
              expect(captureRequest.app.routeOptions._templateCache).to.have.keys(htmlFile);
            });
        };

        return makeRequest()
          .then(() => makeRequest())
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should cache template using provided cacheKey", () => {
      return electrodeServer(config).then(server => {
        const compileTime = Date.now();
        let captureRequest;
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            captureRequest = request;
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            return h.continue;
          }
        });

        const makeRequest = () => {
          return server
            .inject({
              method: "GET",
              url: "/select?template=1&cache_key=template_cache_key_test1"
            })
            .then(res => {
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.contain("<title>Electrode App</title>");
              expect(res.result).to.contain("DYNAMIC_INDEX_1");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.not.contain("Unknown marker");
              expect(captureRequest.app.routeOptions._templateCache).to.have.keys(
                "template_cache_key_test1"
              );
            });
        };

        return makeRequest()
          .then(() => makeRequest())
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should cache template using provided cacheId", () => {
      return electrodeServer(config).then(server => {
        const compileTime = Date.now();
        let captureRequest;
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            captureRequest = request;
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            return h.continue;
          }
        });

        const makeRequest = () => {
          return server
            .inject({
              method: "GET",
              url: "/select?template=1&cache_id=cache_id_test1"
            })
            .then(res => {
              const htmlFile = Path.join(__dirname, "../fixtures/dynamic-index-1.html");
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.contain("<title>Electrode App</title>");
              expect(res.result).to.contain("DYNAMIC_INDEX_1");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.not.contain("Unknown marker");
              expect(captureRequest.app.routeOptions._templateCache).to.have.keys(
                `${htmlFile}#cache_id_test1`
              );
            });
        };

        return makeRequest()
          .then(() => makeRequest())
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should render with selectTemplate even if htmlFile is not specified", () => {
      return electrodeServer(config).then(server => {
        return server
          .inject({
            method: "GET",
            url: "/select?template=4"
          })
          .then(res => {
            expect(res.statusCode).equal(200);
            stopServer(server);
          })
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should create new routeOptions from options selectTemplate returns", () => {
      let captureRequest;
      let server;

      return asyncVerify(
        () => electrodeServer(config),
        s => {
          server = s;
          const compileTime = Date.now();
          server.ext({
            type: "onRequest",
            method: (request, h) => {
              captureRequest = request;
              request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
              return h.continue;
            }
          });
        },
        () => {
          return server
            .inject({
              method: "GET",
              url: "/select?template=3"
            })
            .then(res => {
              const htmlFile = Path.join(__dirname, "../fixtures/dynamic-index-1.html");
              expect(res.statusCode).to.equal(200);
              expect(res.result).contain(`<title>test page title 1</title>`);
              expect(res.result).to.not.contain("<title>Electrode App</title>");
              expect(res.result).to.contain("DYNAMIC_INDEX_1");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.not.contain("Unknown marker");
              expect(captureRequest.app.routeOptions._templateCache).to.have.keys(
                `${htmlFile}#page_title_1`
              );
            });
        },
        () => {
          return server
            .inject({
              method: "GET",
              url: "/select"
            })
            .then(res => {
              const templateFile = Path.join(__dirname, "../../template/index");
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.not.contain(`<title>test page title 1</title>`);
              expect(res.result).to.contain("<title>Electrode App</title>");
              expect(res.result).to.not.contain("DYNAMIC_INDEX_1");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.not.contain("Unknown marker");
              expect(captureRequest.app.routeOptions._templateCache).to.include.all.keys(
                templateFile
              );
            });
        },
        runFinally(() => stopServer(server))
      );
    });

    it("should select template 2 and render to static markup", () => {
      return electrodeServer(config).then(server => {
        const compileTime = Date.now();
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            return h.continue;
          }
        });

        const makeRequest = () => {
          return server
            .inject({
              method: "GET",
              url: "/select?template=2"
            })
            .then(res => {
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.contain("<title>user-handler-title</title>");
              expect(res.result).to.contain("DYNAMIC_INDEX_2");
              expect(res.result).to.contain("RETURN_BY_TEST_DYANMIC_2");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.not.contain("Unknown marker");
            });
        };

        return makeRequest()
          .then(() => makeRequest())
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should use default template if selectTemplate return null", () => {
      return electrodeServer(config).then(server => {
        const compileTime = Date.now();
        server.ext({
          type: "onRequest",
          method: (request, h) => {
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            return h.continue;
          }
        });

        const makeRequest = () => {
          return server
            .inject({
              method: "GET",
              url: "/select"
            })
            .then(res => {
              expect(res.statusCode).to.equal(200);
              expect(res.result).to.not.contain("DYNAMIC_INDEX");
              expect(res.result).to.contain("<title>Electrode App</title>");
              expect(res.result).to.contain("<div>Hello Electrode</div>");
              expect(res.result).to.contain("<script>console.log('Hello');</script>");
              expect(res.result).to.not.contain("Unknown marker");
            });
        };

        return makeRequest()
          .then(() => makeRequest())
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          });
      });
    });

    it("should refresh content module", () => {
      mainRoutePathOptions.content = {
        module: "./test/data/test-content17"
      };

      return electrodeServer(config).then(server => {
        let compileTime = Date.now();

        const testContent1 = {
          status: 200,
          html: "<div>Test1 Electrode17</div>",
          prefetch: "console.log('test1');"
        };

        const testContent2 = {
          status: 200,
          html: "<div>Test2 Electrode17</div>",
          prefetch: "console.log('test2');"
        };

        server.ext({
          type: "onRequest",
          method: (request, h) => {
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime, blah: true };
            return h.continue;
          }
        });
        const makeRequest = () => {
          return server.inject({
            method: "GET",
            url: "/"
          });
        };

        const updateTestContent = obj => {
          Fs.writeFileSync(
            Path.resolve("test/data/test-content17.js"),
            `module.exports = ${JSON.stringify(obj, null, 2)};\n`
          );
        };

        delete require.cache[require.resolve(Path.resolve("test/data/test-content17.js"))];

        updateTestContent(testContent1);

        return xaa
          .wrap(makeRequest)
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<div>Test1 Electrode17</div>");
            expect(res.result).to.contain("<script>console.log('test1');</script>");
            expect(res.result).to.not.contain("Unknown marker");
            updateTestContent(testContent2);
            compileTime = Date.now();
          })
          .then(() => makeRequest())
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<div>Test2 Electrode17</div>");
            expect(res.result).to.contain("<script>console.log('test2');</script>");
            expect(res.result).to.not.contain("Unknown marker");
            updateTestContent(testContent2);
          })
          .then(() => stopServer(server))
          .catch(err => {
            stopServer(server);
            throw err;
          })
          .finally(() => {
            updateTestContent(testContent1);
          });
      });
    });
  });
});
