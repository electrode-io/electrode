import { loadXarcDevTasks } from "./dev-tasks";

Object.defineProperties(loadXarcDevTasks, {
  require: {
    value: require,
    enumerable: false
  },
  hapiPlugin: {
    value: require("./webpack-dev-hapi"),
    enumerable: false
  },
  fastifyPlugin: {
    value: require("./webpack-dev-fastify"),
    enumerable: false
  },
  expressMiddleware: {
    value: require("./webpack-dev-express"),
    enumerable: false
  },
  koaMiddleware: {
    value: require("./webpack-dev-koa"),
    enumerable: false
  }
});

export = loadXarcDevTasks;
