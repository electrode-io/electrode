/* eslint-disable @typescript-eslint/no-var-requires */
const optionalRequire = require("optional-require")(require);
const optFlow = optionalRequire("electrode-archetype-opt-flow");
import { loadXarcOptions } from "./common";
const xOptions = loadXarcOptions(process.env.XARC_CWD);
const _ = require("lodash");

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  transformClassProps,
  looseClassProps,
  envTargets = {},
} = _.get(xOptions, "babel", {});

const addFlowPlugin = Boolean(enableFlow && optFlow);

const { node } = envTargets;

export = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: node,
      },
    ],
    enableTypeScript && "@babel/preset-typescript",
    "@babel/preset-react",
  ].filter((x) => x),
  plugins: [
    addFlowPlugin && [
      "@babel/plugin-transform-flow-strip-types",
      { requireDirective: flowRequireDirective },
    ],
    (enableTypeScript || transformClassProps) && [
      "@babel/plugin-transform-class-properties",
      { loose: looseClassProps },
    ],
    enableTypeScript && "@babel/proposal-object-rest-spread",
  ].filter((x) => x),
};
