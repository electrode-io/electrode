"use strict";

const config = require("../../");
const plugin = require("../../hapi-plugin");

describe("hapi-plugin", function() {
  it("should register server and set its app.config", () => {
    const server = {
      app: {
        config: {
          ui: {
            hello: "world"
          }
        }
      }
    };

    plugin(server, {}, () => {
      expect(config.ui.hello).to.equal("world");
    });
  });

  it("should register server without app", () => {
    const server = {};

    plugin(server, {}, () => {
      expect(config.ui).to.be.empty;
    });
  });

  it("should register server without app.config", () => {
    const server = {
      app: {}
    };

    plugin(server, {}, () => {
      expect(config.ui).to.be.empty;
    });
  });
});
