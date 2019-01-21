"use strict";

/* eslint-disable quotes */

const Fs = require("fs");
const Promise = require("bluebird");
const assign = require("object-assign");
const electrodeServer = require("electrode-server");
const Path = require("path");
const xstdout = require("xstdout");
require("babel-register");
const { expect } = require("chai");
const webapp = require("../../lib/hapi/plugin16");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const Helmet = require("react-helmet").Helmet;

describe("hapi 16 electrode-react-webapp", () => {
  let config;
  let configOptions;
  let mainRoutePathOptions;
  let testServer;

  const getConfig = () => {
    return {
      server: {
        useDomains: false
      },
      connections: {
        default: {
          port: 0
        }
      },
      plugins: {
        "react-webapp": {
          module: Path.join(__dirname, "../../lib/hapi/plugin16"),
          options: {
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

  let stdoutIntercept;

  const stopServer = server => {
    return new Promise((resolve, reject) =>
      server.stop(stopErr => {
        return stopErr ? reject(stopErr) : resolve();
      })
    );
  };

  beforeEach(() => {
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
      return stopServer(testServer).then(() => {
        testServer = undefined;
      });
    }

    return Promise.resolve();
  });

  it("should fail if registering plugin throws", () => {
    let error;
    webapp.register(
      {},
      {
        paths: {
          error: {
            content: { module: "bad-module" }
          }
        }
      },
      err => {
        error = err;
      }
    );
    expect(error).to.be.ok;
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
    configOptions.templateProcessor = asyncTemplate => {
      asyncTemplate.addTokens({
        insert: "before",
        id: "PAGE_TITLE",
        tokens: [
          { token: "#./test/fixtures/custom-null" },
          { token: "#./test/fixtures/custom-1" },
          { token: "#./test/fixtures/custom-call", props: { _call: "setup", _noInsertId: true } }
        ]
      });
    };
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
            expect(result).contains("<!-- INITIALIZE -->");
            expect(result).contains("<!-- $~INITIALIZE~$ -->");
            expect(result).contains("<!-- PAGE_TITLE -->");
            expect(result).contains("<!-- $~PAGE_TITLE~$ -->");
            expect(result).contains("<!-- #./test/fixtures/custom-1 -->");
            expect(result).contains("<!-- $~#./test/fixtures/custom-1~$ -->");
            expect(result).contains("_call process from custom-call token fixture");
            expect(result).not.contains("<!-- #./test/fixtures/custom-call -->");
            expect(result).contains(
              "<!-- HEAD_INITIALIZE removed due to its handler set to null -->"
            );
            expect(result).contains(
              "<!-- #./test/fixtures/custom-null removed due to its process return null -->"
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
          expect(res.result).to.contain("http://127.0.0.1:2992/js/foo.style.css");
          expect(res.result).to.contain("http://127.0.0.1:2992/js/bar.style.css");
          expect(res.result).to.contain("http://127.0.0.1:2992/js/home.bundle.dev.js");
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
            expect(res.result).to.contain("http://127.0.0.1:2992/js/bundle.dev.js");
            expect(res.result).to.contain("http://127.0.0.1:2992/js/style.css");
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
            '<link rel="manifest" href="http://127.0.0.1:2992/js/manifest.json" />'
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

  it("should use top level htmlFile and return response headers", () => {
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
          expect(res.result).includes(`</script><div>user-promise-token</div><script`);
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
          expect(res.result).contains("/test/spec/hapi.index.spec.js");
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
    configOptions.htmlFile = "test/data/index-1.html";
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
          expect(res.result).includes("no-ss");
          expect(res.result).includes("prefetch-mode: datass");
          expect(res.result).includes(`<title>user-handler-title</title>`);
          expect(res.result).includes(`</script><div>user-promise-token</div><script`);
          expect(res.result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(res.result).includes(
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
          expect(ssrPrefetchOnly).to.equal(true);
          expect(res.statusCode).to.equal(200);
          expect(res.result).includes("no-ss");
          expect(res.result).includes("prefetch-mode: datass");
          expect(res.result).includes(`<title>user-handler-title</title>`);
          expect(res.result).includes(`</script><div>user-promise-token</div><script`);
          expect(res.result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(res.result).includes(
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
    configOptions.htmlFile = "test/data/index-1.html";
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
          expect(res.result).includes(`<title>user-handler-title</title>`);
          expect(res.result).includes(`<!-- noss mode -->`);
          expect(res.result).includes(`</div><div>user-promise-token</div><script`);
          expect(res.result).includes(
            `<div>test html-1</div><div>user-spot-1;user-spot-2;user-spot-3</div><div class="js-content">` // eslint-disable-line
          );
          expect(res.result).includes(
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

  it("should use route level htmlFile", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    mainRoutePathOptions.htmlFile = Path.resolve("test/data/index-2.html");

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain(`<div>test html-2</div>`);
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
    function cspPlugin(server, options, next) {
      server.ext("onRequest", (request, reply) => {
        request.plugins.cspPlugin = {
          nonceValue: "==ABCD"
        };
        return reply.continue();
      });
      next();
    }
    cspPlugin.attributes = {
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
    function cspPlugin(server, options, next) {
      server.ext("onRequest", (request, reply) => {
        request.plugins.cspPlugin = {};
        return reply.continue();
      });
      next();
    }
    cspPlugin.attributes = {
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
    function cspPlugin(server, options, next) {
      server.ext("onRequest", (request, reply) => {
        request.plugins.cspPlugin = {
          nonceValue: "==ABCD"
        };
        return reply.continue();
      });
      next();
    }
    cspPlugin.attributes = {
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
        .then(resp => {
          expect(resp.result).contains(`<div class="js-content"></div>`);
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

    let error;

    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .catch(err => {
          error = err;
        })
        .then(() => {
          stopServer(server);
          expect(error).to.exist;
          expect(error.code).to.equal("ERR_ASSERTION");
          expect(error.message).to.equal(
            `You must define content for the webapp plugin path /{args*}`
          );
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
          expect(res.result).contains(`<!DOCTYPE html>\n\n<html lang="en">`);
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
          expect(res.result).to.contain('<div class="js-content">html content</div>');
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
          expect(res.result).includes("webappStart();");
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
              `<script src="http://127.0.0.1:2992/js/main.bundle.dev.js"></script>`
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

  it("should allow support react-helmet with custom token handler", () => {
    configOptions.unbundledJS = {
      enterHead: ["test-1 script"]
    };
    configOptions.templateProcessor = asyncTemplate => {
      const x = asyncTemplate.addTokens({
        insert: "after",
        id: "WEBAPP_HEADER_BUNDLES",
        tokens: [{ token: "REACT_HELMET_SCRIPTS" }]
      });
      expect(x).to.be.above(0);
    };
    assign(mainRoutePathOptions, {
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
    stdoutIntercept = xstdout.intercept(true);
    return electrodeServer(config).then(server => {
      stdoutIntercept.restore();
      // since there are two paths and the react-helment-handler is only register for the
      // main path route, expect the other route's registration to cause a error message
      // to the stderr.
      expect(stdoutIntercept.stderr[0]).contains(
        "electrode-react-webapp: no handler found for token id REACT_HELMET_SCRIPTS"
      );
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).includes(
            `<meta data-react-helmet="true" name="description" content="Nested component"/>` +
              `<title data-react-helmet="true">Nested Title</title>`
          );
          expect(res.result).includes(`window._config.ui = {};\n</script><script>test-1 script;</script>
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
          method: (request, reply) => {
            request.app.webpackDev = { valid: false };
            reply.continue();
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
          method: (request, reply) => {
            request.app.webpackDev = { valid: true, hasErrors: true };
            reply.continue();
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
          method: (request, reply) => {
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            reply.continue();
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

    it("should refresh content module", () => {
      mainRoutePathOptions.content = {
        module: "./test/data/test-content"
      };

      return electrodeServer(config).then(server => {
        let compileTime = Date.now();

        const testContent1 = {
          status: 200,
          html: "<div>Test1 Electrode</div>",
          prefetch: "console.log('test1');"
        };

        const testContent2 = {
          status: 200,
          html: "<div>Test2 Electrode</div>",
          prefetch: "console.log('test2');"
        };

        server.ext({
          type: "onRequest",
          method: (request, reply) => {
            request.app.webpackDev = { valid: true, hasErrors: false, compileTime };
            reply.continue();
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
            Path.resolve("test/data/test-content.js"),
            `module.exports = ${JSON.stringify(obj, null, 2)};\n`
          );
        };

        updateTestContent(testContent1);

        return Promise.try(makeRequest)
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<div>Test1 Electrode</div>");
            expect(res.result).to.contain("<script>console.log('test1');</script>");
            expect(res.result).to.not.contain("Unknown marker");
            updateTestContent(testContent2);
            compileTime = Date.now();
          })
          .then(() => makeRequest())
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain("<title>Electrode App</title>");
            expect(res.result).to.contain("<div>Test2 Electrode</div>");
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
