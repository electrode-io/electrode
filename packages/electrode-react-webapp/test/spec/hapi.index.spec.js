"use strict";

/* eslint-disable quotes */

const Promise = require("bluebird");
const assign = require("object-assign");
const electrodeServer = require("electrode-server");
const Path = require("path");
const registerPlugin = require("../../lib/hapi");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const Helmet = require("react-helmet").Helmet;

describe("hapi electrode-react-webapp", () => {
  let config;
  let configOptions;
  let paths;

  const getConfig = () => {
    return {
      connections: {
        default: {
          port: 0
        }
      },
      plugins: {
        "react-webapp": {
          module: Path.join(__dirname, "../../lib/hapi"),
          options: {
            pageTitle: "Electrode App",
            paths: {
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
      }
    };
  };

  beforeEach(() => {
    config = getConfig();
    configOptions = config.plugins["react-webapp"].options;
    paths = configOptions.paths["/{args*}"];
  });

  const stopServer = server =>
    new Promise((resolve, reject) =>
      server.stop(stopErr => {
        return stopErr ? reject(stopErr) : resolve();
      })
    );

  it("should fail if registering plugin throws", () => {
    let error;
    registerPlugin(
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
    return electrodeServer(config).then(server => {
      return server
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
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully render to static markup", () => {
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
          expect(res.result).to.not.contain("Unknown marker");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should successfully render to static markup with content as a function", () => {
    assign(paths, {
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

  it("should return error", () => {
    assign(paths, {
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

  it("should use top level htmlFile", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    Object.assign(paths, {
      tokenHandler: "./test/fixtures/token-handler"
    });
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.statusCode).to.equal(200);
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

  it("should use route level htmlFile", () => {
    configOptions.prodBundleBase = "http://awesome-cdn.com/myapp/";
    configOptions.stats = "test/data/stats-test-one-bundle.json";
    configOptions.htmlFile = "test/data/index-1.html";
    configOptions.paths["/{args*}"].htmlFile = Path.resolve("test/data/index-2.html");

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
    assign(paths, {
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

  it("should handle 200 status @noss", () => {
    assign(paths, {
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
    assign(paths, {
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

  it("should return 200 and html with render false", () => {
    assign(paths, {
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

  it("should non 200 status", () => {
    assign(paths, {
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
    assign(paths, {
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
          expect(res.result).to.contain("<div class=\"js-content\">html content</div>");
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });

  it("should not fail on not handled status codes", () => {
    assign(paths, {
      content: {
        status: 501,
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
    assign(paths, {
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
    return electrodeServer(config).then(server => {
      return server
        .inject({
          method: "GET",
          url: "/"
        })
        .then(res => {
          expect(res.result).includes(
            `<meta data-react-helmet="true" name="description" content="Nested component"/>` +
              `<title data-react-helmet="true">Nested Title</title><script>test-1 script;</script>`
          );
          expect(res.result).includes(`<script>test-1 script;</script>
<!--scripts from helmet--></head>`);
          stopServer(server);
        })
        .catch(err => {
          stopServer(server);
          throw err;
        });
    });
  });
});
