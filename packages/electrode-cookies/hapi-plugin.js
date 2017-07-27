"use strict";

var each = require("lodash/each");

function electrodeCookiesRegister(server, options, next) {
  server.ext("onPreResponse", (request, reply) => {
    if (request.app.replyStates) {
      each(request.app.replyStates, (state, name) => {
        reply.state(name, state.value, state.options);
      });
    }

    return reply.continue();
  });

  next();
}

electrodeCookiesRegister.attributes = {
  pkg: require("./package.json")
};

module.exports = {
  register: electrodeCookiesRegister
};
