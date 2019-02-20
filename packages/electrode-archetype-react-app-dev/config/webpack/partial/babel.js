"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
// const identity = require("lodash/identity");
const assign = require("lodash/assign");
const babelLoader = require.resolve("babel-loader");

module.exports = function(options) {
  const clientVendor = Path.join(AppMode.src.client, "vendor/");
  const babelExclude = x => {
    if (x.indexOf("node_modules") >= 0) return true;
    if (x.indexOf(clientVendor) >= 0) return true;
    return false;
  };

  const test = archetype.babel.enableTypeScript ? /\.[tj]sx?$/ : /\.jsx?$/;
  const getOneOfRule = (babelEnvTargets, k) => [
    {
      loader: babelLoader,
      options: Object.assign(
        { cacheDirectory: Path.resolve(".etmp/babel-loader") },
        options.babel,
        Object.assign(
          {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: babelEnvTargets[k]
                }
              ],
              "@babel/preset-typescript",
              "@babel/preset-react"
            ].filter(x => x)
          },
          k === "default" ? { plugins: ["@babel/plugin-transform-classes"] } : {}
        )
      )
    }
  ];

  const oneOf = (() => {
    const { babelEnvTargets } = archetype.webpack;
    const _oneOf = Object.keys(babelEnvTargets)
      .filter(k => k !== "default" && k !== "node")
      .map(k => ({
        resourceQuery: new RegExp(k),
        use: getOneOfRule(babelEnvTargets, k)
      }));
    _oneOf.push({ use: getOneOfRule(babelEnvTargets, "default") });
    return _oneOf;
  })();

  const babelLoaderConfig = {
    _name: "babel",
    test,
    exclude: babelExclude,
    oneOf
  };

  return {
    module: {
      rules: [assign({}, babelLoaderConfig, archetype.webpack.extendBabelLoader)]
    }
  };
};
