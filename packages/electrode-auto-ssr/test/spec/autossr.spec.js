"use strict";

const Hapi = require("hapi");

beforeEach(function () {
  const server = this.server = new Hapi.Server();
  server.connection({port: 8000});

  server.register([
    {register: require("../../lib/autossr")}
  ]);
});

describe("Test Auto Server Side Rendering", function () {
  it("should succesfully count longResponses", function () {
    this.server.inject({
      method: "GET",
      url: "/"
    }).then((res) => {
      expect(res.statusCode).to.equal(404);
      expect(res.request.server.app.longResponses).to.equal(0);
    })
    .catch((err) => {
      throw err;
    });
  });
});
