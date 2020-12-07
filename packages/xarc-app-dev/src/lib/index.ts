import { loadXarcDevTasks } from "./dev-tasks";
import * as Path from "path";

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
  },
  eslintReactTestRc: {
    get() {
      return Path.posix.join(__dirname, "../config/eslint/.eslintrc-react-test");
    },
    enumerable: false
  },
  eslintReactRc: {
    get() {
      return Path.posix.join(__dirname, "../config/eslint/.eslintrc-react");
    },
    enumerable: false
  },
  eslintNodeRc: {
    get() {
      return Path.posix.join(__dirname, "../config/eslint/.eslintrc-node");
    },
    enumerable: false
  },
  eslintNodeTestRc: {
    get() {
      return Path.posix.join(__dirname, "../config/eslint/.eslintrc-mocha-test");
    },
    enumerable: false
  }
});

export = loadXarcDevTasks;
