"use strict";
/*eslint-env es6*/
const plugin = {};
const fs = require("fs");
const path = require("path");
const HTTP_CREATED = 201;
const HTTP_ISE = 500;

plugin.register = function (server, options, next) {
  server.route({
    method: "POST",
    path: "/updateStorage",
    handler: (request, reply) => {
      fs.writeFile(path.join(process.cwd(), "data/storage.json"),
        JSON.stringify(request.payload),
        "utf-8",
        err => {
          if (err) {
            reply("Write Error").code(HTTP_ISE);
          } else {
            reply("created").code(HTTP_CREATED);
          }
        }
      );
    }
  });
  next();
};

plugin.register.attributes = {
  name: "updateStoragePlugin",
  version: "0.0.1"
};

module.exports = plugin;
