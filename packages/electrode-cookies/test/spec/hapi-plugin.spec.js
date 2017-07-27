"use strict";

const expect = require("chai").expect;
const cookiesPlugin = require("../../hapi-plugin");

describe("Hapi plugin", () => {
  it("should handle request.app.replyStates not being set", done => {
    const request = { app: {} };
    const reply = { continue: () => {} };
    const server = {
      ext: (event, handler) => {
        expect(event).to.equal("onPreResponse");
        handler(request, reply);
        done();
      }
    };

    cookiesPlugin.register(server, {}, () => {});
  });
});
