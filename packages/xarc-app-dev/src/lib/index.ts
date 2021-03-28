import Path from "path";

import { loadXarcDevTasks } from "./dev-tasks";

export { loadXarcDevTasks, loadXarcDevTasks as loadDevTasks };

export { xrun, xclap } from "./dev-tasks";

/** The require from @xarc/app-dev's directory */
export const devRequire = require;
export { register as hapiPlugin } from "./webpack-dev-hapi";
export { hapi17Plugin } from "./webpack-dev-hapi17";
export { fastifyPlugin } from "./webpack-dev-fastify";
export { expressMiddleware } from "./webpack-dev-express";
export { koaMiddleware } from "./webpack-dev-koa";

const makeEslintRcFile = file => Path.posix.join(__dirname, "../config/eslint", file);

/** path to built-in eslintrc for React test code */
export const eslintRcReactTest = makeEslintRcFile(".eslintrc-react-test");

/** path to built-in eslintrc for React code */
export const eslintRcReact = makeEslintRcFile(".eslintrc-react");

/** path to built-in eslintrc for node.js code */
export const eslintRcNode = makeEslintRcFile(".eslintrc-node");

/** path to built-in eslintrc for node.js test code */
export const eslintRcMochaTest = makeEslintRcFile(".eslintrc-mocha-test");

/** path to built-in eslintrc for node.js test code using ES6 */
export const eslintRcMochaTestEs6 = makeEslintRcFile(".eslintrc-mocha-test-es6");

/**
 * path to Electrode's babel rc that your babel config can extend from
 *
 * You can use it like this in your `babel.config.js`:
 *
 * ```js
 * const { babelConfigFile } = require("@xarc/app-dev");
 * module.exports = { extends: babelConfigFile };
 * ```
 *
 * .
 */
export const babelConfigFile = require.resolve("../config/babel/babelrc");

/**
 * path to Electrode's babel config as a preset
 *
 * You can use it like this in your `babel.config.js`:
 *
 * ```js
 * const { babelPresetFile } = require("@xarc/app-dev");
 * module.exports = { presets: [babelPresetFile] };
 * ```
 *
 * .
 */
export const babelPresetFile = require.resolve("../config/babel/preset");

/**
 * Contains the webpack utilities and configuration.
 *
 * If you want to customize your own webpack config, then you can use this
 * to get xarc's internal webpack configs and modify them to your need.
 *
 */
export * as xarcWebpack from "@xarc/webpack";
