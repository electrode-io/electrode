"use strict";

const { htmlifyError } = require("../lib/utils");

const electrodeServer = require("electrode-server");

function blah() {
  throw new Error("blah");
}

electrodeServer().then(server => {
  server.route({
    method: "get",
    path: "/",
    handler: (request, reply) => {
      try {
        blah();
      } catch (err) {
        err.html = "Something went wrong";
        reply(htmlifyError(err));
      }
    }
  });
});
