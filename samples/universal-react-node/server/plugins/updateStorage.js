"use strict";
/*eslint-env es6*/
const plugin = {};
const fs = require("fs");
const path = require("path");

plugin.register = function (server, options, next) {
  server.route({
    method: "POST",
    path: "/updateStorage",
    handler: function(request, reply) {
        fs.writeFile(path.join(process.cwd(),"/server/storage.json"),
          JSON.stringify(request.payload),
          'utf-8',
          (err) => {
            if (err) throw err;
          }
        );
        reply('created').code(201);
    }
  })
  next();
};

plugin.register.attributes = {
  name: "updateStoragePlugin",
  version: "0.0.1"
};

module.exports = plugin;
