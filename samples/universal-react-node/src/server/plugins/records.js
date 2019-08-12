"use strict";
/*eslint-env es6*/
const plugin = {};
const HTTP_CREATED = 201;
const mongojs = require("mongojs");
const uuidV1 = require("uuid/v1");

plugin.register = function (server, options, next) {
  const db = mongojs("electrode-mongo", ["records"]);

  //Get All Records
  server.route({
    method: "GET",
    path: "/records",
    handler: (request, reply) => {
      db.records.find((err, docs) => {
        if (err) {
          return reply("Internal MongoDB error", err);
        }
        return reply(docs);
      });
    }
  });

  //Get 1 Record
  server.route({
    method: "GET",
    path: "/records/{id}",
    handler: (request, reply) => {
      db.records.findOne({
        _id: request.params.id
      }, (err, doc) => { // eslint-disable-line consistent-return
        if (err) {
          return reply("Internal MongoDB error");
        }
        if (!doc) {
          return reply("No Record Found");
        }
        const responseString = doc.map(record => JSON.stringify(record)).toString();
        reply(responseString);
      });
    }
  });

  //Add a record
  server.route({
    method: "POST",
    path: "/addRecord",
    handler: (request, reply) => {
      const record = request.payload;
      //Create an id
      record._id = uuidV1();

      db.records.save(record, err => { // eslint-disable-line consistent-return
        if (err) {
          console.log(err); // eslint-disable-line no-console
          return reply("Internal MongoDB error");
        }
        reply(record).code(HTTP_CREATED);
      });
    }
  });

  next();
};

plugin.register.attributes = {
  name: "addRecordsPlugin",
  version: "0.0.1"
};

module.exports = plugin;
