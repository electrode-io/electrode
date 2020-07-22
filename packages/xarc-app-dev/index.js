"use strict";

const loadXrunTasks = require("./lib/load-xrun-tasks");

loadXrunTasks.require = require;
loadXrunTasks.hapiPlugin = require("./lib/webpack-dev-hapi");
loadXrunTasks.fastifyPlugin = require("./lib/webpack-dev-fastify");
loadXrunTasks.expressMiddleware = require("./lib/webpack-dev-express");
loadXrunTasks.koaMiddleware = require("./lib/webpack-dev-koa");

module.exports = loadXrunTasks;
