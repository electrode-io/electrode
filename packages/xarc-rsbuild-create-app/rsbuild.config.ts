import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import babelSyntaxPlugin from "@babel/plugin-syntax-import-attributes";

export default defineConfig({
  output: {
    cleanDistPath: true,
    targets: ["node"],
    distPath: {
      root: "dist",
      server: ".",
      js:
        process.env.NODE_ENV === 'production'
          ? '[name].[contenthash:8].js'
          : '[name].js',
      }
  },
  performance: {
    bundleAnalyze: process.env.BUNDLE_ANALYZE
      ? {
          analyzerMode: 'server',
          openAnalyzer: true,
        }
      : {},
  },
  plugins: [
    pluginBabel()
  ],
  tools: {
    rspack: (config, { removePlugin }) => {
      removePlugin('BundleAnalyzerPlugin');
      config.module.rules = [
        {
          type: "javascript/auto",
          test: /\.ts$/,
          exclude: (x) => x.indexOf("node_modules") > 0,
          use: "builtin:swc-loader",
        }
      ]
      return config;
    }
  },
  source: {
    exclude: [
      "./template/*"
    ],
    tsconfigPath: "./tsconfig.json",
    entry: {
      "index": "./src/index.ts",
    },
    alias: {},
  },
});
