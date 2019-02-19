"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const identity = require("lodash/identity");
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
  const oneOf = [
    {
      resourceQuery: /es6/,
      use: [
        {
          loader: babelLoader,
          options: Object.assign(
            { cacheDirectory: Path.resolve(".etmp/babel-loader") },
            options.babel,
            {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: archetype.webpack.babelEnvTargets.es6
                  }
                ],
                "@babel/preset-typescript",
                "@babel/preset-react"
              ].filter(x => x)
            }
          )
        }
      ]
    },
    {
      use: [
        {
          loader: babelLoader,
          options: Object.assign(
            { cacheDirectory: Path.resolve(".etmp/babel-loader") },
            options.babel,
            {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: archetype.webpack.babelEnvTargets.es5
                  }
                ],
                "@babel/preset-typescript",
                "@babel/preset-react"
              ].filter(x => x)
            }
          )
        }
      ]
    }
  ];

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
