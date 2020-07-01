"use strict";

/* eslint-disable no-magic-numbers */

const Path = require("path");
const Koa = require("koa");
const koaRouter = require("koa-router");
const registerRoutes = require("../../lib/koa");
const request = require("superagent");
const expect = require("chai").expect;

describe("koa electrode-react-webapp", function() {
  const webappOptions = responseForBadStatus => {
    return {
      pageTitle: "Electrode App",
      responseForBadStatus,
      paths: {
        "/": {
          content: {
            status: 200,
            html: "<div>Hello Electrode</div>",
            prefetch: "console.log('Hello');"
          }
        },
        "/func": {
          content: () => {
            return Promise.resolve({
              status: 200,
              html: "<div>Hello Electrode Function</div>",
              prefetch: "console.log('Hello');"
            });
          }
        },
        "/all": {
          method: "*",
          content: {
            status: 200,
            html: "Test All",
            prefetch: "console.log('Hello all');"
          }
        },
        "/fail": {
          content: req => {
            const status = req.query.status;
            const html = req.query.html;
            const x = new Error(`test fail ${status}`);
            if (status) {
              x.status = +status;
            }
            if (html) {
              x.html = html;
            }
            return Promise.reject(x);
          }
        },
        "/status": {
          content: req => {
            const html = req.query.html;
            const message = req.query.message || (html === undefined ? "no html" : undefined);
            let render;
            if (req.query.render !== undefined) {
              render = Boolean(+req.query.render);
            }
            return {
              status: +req.query.status,
              html,
              message,
              render
            };
          }
        },
        "/redirect": {
          content: {
            status: 302,
            path: "/redirect2"
          }
        },
        "/string": {
          content: "test content as a string"
        }
      }
    };
  };

  let koaServer;

  afterEach(() => {
    if (koaServer) {
      const server = koaServer;
      koaServer = undefined;
      return new Promise(resolve => server.close(resolve));
    }
    return null;
  });

  const startServer = options => {
    const app = new Koa();
    const router = koaRouter();
    registerRoutes(router, options);
    app.use(router.routes());
    koaServer = app.listen(0);
    return koaServer;
  };

  const promiseRequest = req => {
    return new Promise((resolve, reject) => {
      try {
        req.end((err, resp) => {
          if (err) reject(err);
          else resolve(resp);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const promiseFailRequest = req => {
    return new Promise((resolve, reject) => {
      try {
        req.end(err => {
          if (err) resolve(err);
          else reject(new Error("expecting error from request"));
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  it("should render to static markup", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    const makeRequest = () => {
      return promiseRequest(request(`http://localhost:${port}`)).then(resp => {
        expect(resp.text).includes("<div>Hello Electrode</div>");
        expect(resp.text).includes("console.log('Hello');");
      });
    };

    return makeRequest().then(() => makeRequest());
  });

  it("should render to static markup @func_content", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseRequest(request(`http://localhost:${port}/func`)).then(resp => {
      expect(resp.text).includes("<div>Hello Electrode Function</div>");
      expect(resp.text).includes("console.log('Hello');");
    });
  });

  it("should render to static markup @func_content @noss", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseRequest(request(`http://localhost:${port}/func?__mode=noss`)).then(resp => {
      expect(resp.text).includes(`<div class="js-content"><!-- noss mode --></div>`);
    });
  });

  it("should return non 200 errors with html and stack", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;

    return promiseFailRequest(
      request(`http://localhost:${port}/fail?status=404&html=html-foo-bar`)
    ).then(error => {
      expect(error).to.be.ok;
      expect(error.status).to.equal(404);
      expect(error.response.text).contains("test fail 404");
      expect(error.response.text).contains("html-foo-bar");
      expect(error.response.text).contains("/test/spec/koa.index.spec.js");
    });
  });

  it("should handle and return 500 on non-render errors", () => {
    const options = webappOptions();
    options.tokenHandlers = Path.join(__dirname, "../fixtures/non-render-error");
    const server = startServer(options);
    const port = server.address().port;
    return promiseFailRequest(request(`http://localhost:${port}/`)).then(error => {
      expect(error).to.be.ok;
      expect(error.status).to.equal(500);
      expect(error.response.text).contains("error from test/fixtures/non-render-error");
    });
  });

  it("should return 404 and html, if custom html is provided", () => {
    const server = startServer(webappOptions(null));
    const port = server.address().port;
    return promiseFailRequest(
      request(`http://localhost:${port}/status?status=404&html=NotFoundHTML&render=0`)
    ).then(error => {
      expect(error).to.be.ok;
      expect(error.status).to.equal(404);
      expect(error.response.text).to.equal("NotFoundHTML");
    });
  });

  it("should not fail on 404 if no html is provided", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseFailRequest(
      request(`http://localhost:${port}/status?status=404&data=test&render=0`)
    ).then(error => {
      expect(error).to.be.ok;
      expect(error.status).to.equal(404);
    });
  });

  it("should return 200 and html with render false", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseRequest(
      request(`http://localhost:${port}/status?status=200&html=HelloTestHTML&render=0`)
    ).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.text).to.equal("HelloTestHTML");
    });
  });

  it("should return 500 on errors", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseFailRequest(request(`http://localhost:${port}/fail`)).then(error => {
      expect(error).to.be.ok;
      expect(error.status).to.equal(500);
      expect(error.response.text).contains("test fail undefined");
    });
  });

  it("should return 302 on redirect", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseFailRequest(request(`http://localhost:${port}/redirect`).redirects(0)).then(
      err => {
        expect(err.status).to.equal(302);
        expect(err.response.text).includes("/redirect2");
      }
    );
  });

  it("should return non 200 status", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseFailRequest(
      request(`http://localhost:${port}/status?status=401&message=HelloTest401`)
    ).then(err => {
      expect(err.status).to.equal(401);
      expect(err.response.body.message).to.equal("HelloTest401");
    });
  });

  it("should return 200 status with render off", () => {
    const server = startServer(webappOptions());

    const port = server.address().port;
    return promiseRequest(
      request(`http://localhost:${port}/status?status=200&message=HelloTest200`)
    ).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.body.message).to.equal("HelloTest200");
    });
  });

  it("should handle content as a string", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseRequest(request(`http://localhost:${port}/string`)).then(resp => {
      expect(resp.text).includes("<!DOCTYPE html>");
      expect(resp.text).includes(">test content as a string</div>");
    });
  });

  it("@no-html should return JSON with 200 status with ss off", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseRequest(request(`http://localhost:${port}/status?status=200`)).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.body.message).to.equal("no html");
    });
  });

  it("should setup route to all methods", () => {
    const server = startServer(webappOptions());
    const port = server.address().port;
    return promiseRequest(request.post(`http://localhost:${port}/all`).send({})).then(resp => {
      expect(resp.text).includes("Test All");
      expect(resp.text).includes("console.log('Hello all');");
    });
  });

  it("should handle option serverSideRendering false", () => {
    const options = webappOptions();
    options.serverSideRendering = false;
    const server = startServer(options);
    const port = server.address().port;
    return promiseRequest(request(`http://localhost:${port}`)).then(resp => {
      expect(resp.text).includes("<!DOCTYPE html>");
    });
  });
});
