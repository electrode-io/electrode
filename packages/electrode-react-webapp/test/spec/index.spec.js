"use strict";

const Promise = require("bluebird");
const electrodeServer = require("electrode-server");

const config = {
  plugins: {
    "./lib/index": {
      options: {
        pageTitle: "Electrode App",
        paths: {
          "/{args*}": {
            view: "index",
            content: () => Promise.resolve({
              status: 200,
              html: "<div>Hello Electrode</div>",
              prefetch: "console.log('Hello');"
            })
          }
        }
      }
    }
  }
};

describe("Test electrode-react-webapp", () => {

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
});
