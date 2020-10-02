/* eslint-disable @typescript-eslint/no-var-requires */
const optionalRequire = require("optional-require")(require);
const optFlow = optionalRequire("electrode-archetype-opt-flow");
import { loadXarcOptions } from "./common";
const xOptions = loadXarcOptions(process.env.XARC_APP_DIR);

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  transformClassProps,
  looseClassProps,
  envTargets
} = xOptions.babel;

const addFlowPlugin = Boolean(enableFlow && optFlow);

const { node } = envTargets;

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: node
      }
    ],
    enableTypeScript && "@babel/preset-typescript",
    "@babel/preset-react"
  ].filter(x => x),
  plugins: [
    addFlowPlugin && [
      "@babel/plugin-transform-flow-strip-types",
      { requireDirective: flowRequireDirective }
    ],
    (enableTypeScript || transformClassProps) && [
      "@babel/plugin-proposal-class-properties",
      { loose: looseClassProps }
    ],
    enableTypeScript && "@babel/proposal-object-rest-spread"
  ].filter(x => x)
};
