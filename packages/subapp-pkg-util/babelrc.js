// Modernized Babel config using ES6+ and up-to-date presets/plugins
const assert = require("assert");

const babelEnv = process.env.BABEL_ENV || "";
assert(babelEnv, "env BABEL_ENV must be defined");

const envOpts = {};
const config = {};

if (babelEnv.includes("-node")) {
  Object.assign(envOpts, {
    modules: "auto",
    targets: { node: "current" }
  });
} else {
  Object.assign(envOpts, {
    modules: false,
    useBuiltIns: "entry",
    corejs: 3,
    targets: "last 5 years and > 0.5% and not dead"
  });
}

const presets = [
  ["@babel/preset-env", envOpts],
  ["@babel/preset-react", { runtime: "automatic" }]
];

config.plugins = [
  [
    "@babel/plugin-transform-runtime",
    {
      helpers: true,
      regenerator: false,
      // version: "7.8.3" // version is auto-detected by Babel, usually not needed
    }
  ]
];

// The minify preset seems to be abandoned for a long time. As there is not major change happening and the github page says it is still beta version, we will not use it for now, instead we will have terser added to packages using this babelrc.
// Some references 
//  - https://www.npmjs.com/package/rollup-plugin-babel-minify 
//  - https://github.com/babel/minify?tab=readme-ov-file#experimental

// if (babelEnv.includes("-minify")) {
//   presets.push([
//     "minify",
//     {
//       removeDebugger: true,
//       removeConsole: { exclude: ["error", "warn"] }
//     }
//   ]);
// }

Object.assign(config, { presets });

module.exports = config;
