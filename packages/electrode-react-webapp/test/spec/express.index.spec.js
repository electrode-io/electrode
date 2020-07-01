"use strict";

const Path = require("path");
const express = require("express");
const registerRoutes = require("../../lib/express");
const request = require("superagent");
const expect = require("chai").expect;

describe("express electrode-react-webapp", function() {
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
        },
        "/data_only": {
          content: req => {
            return {
              status: 200,
              prefetch: `ssrPrefetchOnly ${req.app.ssrPrefetchOnly}`,
              html: ""
            };
          }
        }
      }
    };
  };

  const startServer = options => {
    const app = express();
    registerRoutes(app, options);
    return app.listen(0);
  };

  it("should render to static markup", () => {
    const server = startServer(webappOptions());
    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        const port = server.address().port;
        return request(`http://localhost:${port}`).end((err, resp) => {
          if (err) return reject(err);
          try {
            expect(resp.text).includes("<div>Hello Electrode</div>");
            expect(resp.text).includes("console.log('Hello');");
          } catch (err2) {
            return reject(err2);
          }
          return resolve();
        });
      });
    };

    return makeRequest()
      .then(() => makeRequest())
      .then(() => new Promise(resolve => server.close(resolve)));
  });

  it("should render to static markup @func_content", () => {
    const server = startServer(webappOptions());
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request(`http://localhost:${port}/func`).end((err, resp) => {
        if (err) return reject(err);
        expect(resp.text).includes("<div>Hello Electrode Function</div>");
        expect(resp.text).includes("console.log('Hello');");
        return server.close(() => resolve());
      });
    });
  });

  it("should render to static markup @func_content @noss", () => {
    const server = startServer(webappOptions());
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request(`http://localhost:${port}/func?__mode=noss`).end((err, resp) => {
        if (err) return reject(err);
        expect(resp.text).includes(`<div class="js-content"><!-- noss mode --></div>`);
        return server.close(() => resolve());
      });
    });
  });

  it("should return Error with status and html", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/fail?status=404&html=html-foo-bar`).end(err => {
        expect(err).to.be.ok;
        expect(err.status).to.equal(404);
        expect(err.response.text).contains("html-foo-bar");
        expect(err.response.text).contains("test fail 404");
        server.close(() => resolve());
      });
    });
  });

  it("should return 404 and html, if custom html is provided", () => {
    const server = startServer(webappOptions(null));
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=404&html=NotFoundHTML&render=0`).end(
        (err, resp) => {
          expect(err).to.be.ok;
          expect(resp.status).to.equal(404);
          expect(resp.text).to.equal("NotFoundHTML");
          server.close(() => resolve());
        }
      );
    });
  });

  it("should return 410 and html, if custom html is provided", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=410&html=GoneHTML&render=0`).end(
        (err, resp) => {
          expect(err).to.be.ok;
          expect(resp.status).to.equal(410);
          expect(resp.text).to.equal("GoneHTML");
          server.close(() => resolve());
        }
      );
    });
  });

  it("should not fail on 404 if no html is provided", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=404&data=test&render=0`).end(
        (err, resp) => {
          expect(err).to.be.ok;
          expect(resp.status).to.equal(404);
          server.close(() => resolve());
        }
      );
    });
  });

  it("should return 503 and html, if custom html is provided", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(
        `http://localhost:${port}/status?status=503&html=ServerErrorHTML&render=0`
      ).end((err, resp) => {
        expect(err).to.be.ok;
        expect(resp.status).to.equal(503);
        expect(resp.text).to.equal("ServerErrorHTML");
        server.close(() => resolve());
      });
    });
  });

  it("should return 200 and html with render false", () => {
    const server = startServer(webappOptions());
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=200&html=HelloTestHTML&render=0`).end(
        (err, resp) => {
          if (err) reject(err);
          expect(resp.status).to.equal(200);
          expect(resp.text).to.equal("HelloTestHTML");
          server.close(() => resolve());
        }
      );
    });
  });

  it("should handle and return 500 on non-render errors", () => {
    const options = webappOptions();
    options.tokenHandlers = Path.join(__dirname, "../fixtures/non-render-error");
    const server = startServer(options);
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/`).end(err => {
        expect(err).to.be.ok;
        expect(err.status).to.equal(500);
        expect(err.response.text).contains("error from test/fixtures/non-render-error");
        server.close(() => resolve());
      });
    });
  });

  it("should handle replyErrorStack being false", () => {
    const options = webappOptions();
    options.tokenHandlers = Path.join(__dirname, "../fixtures/non-render-error");
    options.replyErrorStack = false;
    const server = startServer(options);
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/`).end(err => {
        expect(err).to.be.ok;
        expect(err.status).to.equal(500);
        expect(err.response.text).contains("error from test/fixtures/non-render-error");
        // should contain no stack
        expect(err.response.text).to.not.contains(
          "packages/electrode-react-webapp/test/fixtures/non-render-error.js"
        );
        server.close(() => resolve());
      });
    });
  });

  it("should return 500 on errors", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/fail`).end(err => {
        expect(err).to.be.ok;
        expect(err.status).to.equal(500);
        expect(err.response.text).contains("test fail undefined");
        server.close(() => resolve());
      });
    });
  });

  it("should return 302 on redirect", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/redirect`)
        .redirects(0)
        .end((err, resp) => {
          expect(resp.text).includes("/redirect2");
          return server.close(() => resolve());
        });
    });
  });

  it("should return non 200 status", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=401&message=HelloTest401`).end(
        (err, resp) => {
          expect(resp.status).to.equal(401);
          expect(resp.body.message).to.equal("HelloTest401");
          server.close(() => resolve());
        }
      );
    });
  });

  it("should return 200 status with render off", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=200&message=HelloTest200`).end(
        (err, resp) => {
          expect(resp.status).to.equal(200);
          expect(resp.body.message).to.equal("HelloTest200");
          server.close(() => resolve());
        }
      );
    });
  });

  it("should handle content as a string", () => {
    const server = startServer(webappOptions());
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request(`http://localhost:${port}/string`).end((err, resp) => {
        if (err) reject(err);
        expect(resp.text).includes("<!DOCTYPE html>");
        expect(resp.text).includes(">test content as a string</div>");
        server.close(() => resolve());
      });
    });
  });

  it("@no-html should return JSON with 200 status with ss off", () => {
    const server = startServer(webappOptions());
    return new Promise(resolve => {
      const port = server.address().port;
      return request(`http://localhost:${port}/status?status=200`).end((err, resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.body.message).to.equal("no html");
        server.close(() => resolve());
      });
    });
  });

  it("should setup route to all methods", () => {
    const server = startServer(webappOptions());
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request
        .post(`http://localhost:${port}/all`)
        .send({})
        .end((err, resp) => {
          if (err) return reject(err);
          expect(resp.text).includes("Test All");
          expect(resp.text).includes("console.log('Hello all');");
          return server.close(() => resolve());
        });
    });
  });

  it("should handle option serverSideRendering false", () => {
    const options = webappOptions();
    options.serverSideRendering = false;
    const server = startServer(options);
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request.get(`http://localhost:${port}`).end((err, resp) => {
        if (err) return reject(err);
        expect(resp.text).includes("<!DOCTYPE html>");
        return server.close(() => resolve());
      });
    });
  });

  it("should set ssrPrefetchOnly for datass mode", () => {
    const options = webappOptions();
    const app = express();
    registerRoutes(app, options);
    app.use((req, res, next) => {
      req.app = {};
      next();
    });
    const server = app.listen(0);
    return new Promise((resolve, reject) => {
      const port = server.address().port;
      return request.get(`http://localhost:${port}/data_only?__mode=datass`).end((err, resp) => {
        if (err) return reject(err);
        expect(resp.text).includes("ssrPrefetchOnly true");
        expect(resp.text).includes(`<div class="js-content"></div>`);
        return server.close(() => resolve());
      });
    });
  });
});
