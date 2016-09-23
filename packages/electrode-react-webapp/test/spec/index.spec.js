"use strict";

const Promise = require("bluebird");
const assign = require("object-assign");
const electrodeServer = require("electrode-server");

describe("Test electrode-react-webapp", () => {

  let config;
  let paths;

  beforeEach(() => {
    config = {
      plugins: {
        "./lib/index": {
          options: {
            pageTitle: "Electrode App",
            paths: {
              "/{args*}": {
                view: "index",
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

    paths = config.plugins["./lib/index"].options.paths["/{args*}"];

  });

  const stopServer = (server) =>
    new Promise((resolve, reject) =>
      server.stop((stopErr) => {
        return stopErr ? reject(stopErr) : resolve();
      }));

  it("should successfully render to static markup", () => {
    return electrodeServer(config)
      .then((server) => {
        return server.inject({
          method: "GET",
          url: "/"
        }).then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("<title>Electrode App</title>");
          expect(res.result).to.contain("<div>Hello Electrode</div>");
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          stopServer(server);
        })
        .catch((err) => {
          stopServer(server);
          throw err;
        });
      });
  });

  it("should successfully render to static markup with content as a function", () => {
    assign(paths, {
      content: () => Promise.resolve({
        status: 200,
        html: "<div>Hello Electrode</div>",
        prefetch: "console.log('Hello');"
      })
    });

    return electrodeServer(config)
      .then((server) => {
        return server.inject({
          method: "GET",
          url: "/"
        }).then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.result).to.contain("<title>Electrode App</title>");
          expect(res.result).to.contain("<div>Hello Electrode</div>");
          expect(res.result).to.contain("<script>console.log('Hello');</script>");
          stopServer(server);
        })
        .catch((err) => {
          stopServer(server);
          throw err;
        });
      });
  });

  it("should return error", () => {
    assign(paths, {
      content: () => Promise.reject({
        status: 500,
        message: "Internal server error"
      })
    });

    return electrodeServer(config)
      .then((server) => {
        return server.inject({
          method: "GET",
          url: "/"
        }).then((res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.result).to.equal("Internal server error");
          stopServer(server);
        })
        .catch((err) => {
          stopServer(server);
          throw err;
        });
      });
  });
});
