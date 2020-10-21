import { loadXarcDevTasks } from "./dev-tasks";

Object.defineProperties(loadXarcDevTasks, {
  require: {
    value: require,
    enumerable: false
  },
  hapiPlugin: {
    get() {
      return require("./webpack-dev-hapi");
    },
    enumerable: false
  },
  fastifyPlugin: {
    get() {
      return require("./webpack-dev-fastify");
    },
    enumerable: false
  },
  expressMiddleware: {
    get() {
      return require("./webpack-dev-express");
    },
    enumerable: false
  },
  koaMiddleware: {
    get() {
      return require("./webpack-dev-koa");
    },
    enumerable: false
  }
});

export = loadXarcDevTasks;
