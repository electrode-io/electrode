"use strict";

const archetype = require("../archetype");

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  transformClassProps,
  looseClassProps,
  envTargets
} = archetype.babel;

const { node } = envTargets;

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node }
      }
    ],
    enableTypeScript && "@babel/preset-typescript",
    "@babel/preset-react"
  ].filter(x => x),
  plugins: [
    enableFlow && [
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
