"use strict";

const archetype = require("../archetype");

const {
  enableTypeScript,
  flowRequireDirective,
  enableFlow,
  transformClassProps,
  looseClassProps
} = archetype.babel;

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "8.11"
        }
      }
    ],
    enableTypeScript && "@babel/preset-typescript"
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
