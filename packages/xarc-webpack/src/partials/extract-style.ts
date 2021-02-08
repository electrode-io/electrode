/* eslint-disable @typescript-eslint/no-var-requires, max-statements */
import * as Path from "path";

import { loadXarcOptions } from "../util/load-xarc-options";
import { xAppRequire } from "@xarc/app";

const detectCssModule = require("../util/detect-css-module");

const getOptRequire = require("../util/get-opt-require");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const autoprefixer = require("autoprefixer");
const cssLoader = require.resolve("css-loader");

// Stylus support
const optStylusRequire = getOptRequire(["@xarc/opt-stylus", "electrode-archetype-opt-stylus"]);
const stylusLoader = optStylusRequire.resolve("stylus-relative-loader");

// SASS support
const optSassRequire = getOptRequire(["@xarc/opt-sass", "electrode-archetype-opt-sass"]);
const sassLoader = optSassRequire.resolve("sass-loader");

// LESS support
const optLessRequire = getOptRequire(["@xarc/opt-less", "electrode-archetype-opt-less"]);
const lessLoader = optLessRequire.resolve("less-loader");

// isomorphic-loader
const isomorphicLoader = xAppRequire.resolve("isomorphic-loader");

function loadPostCss() {
  const optPostcssRequire = getOptRequire(["@xarc/opt-postcss", "electrode-archetype-opt-postcss"]);

  if (optPostcssRequire.invalid) {
    return { hasPostCss: false };
  }

  const atImport = optPostcssRequire("postcss-import");
  const postcssPresetEnv = optPostcssRequire("postcss-preset-env");
  const postcssLoader = optPostcssRequire.resolve("postcss-loader");

  return { hasPostCss: true, atImport, postcssPresetEnv, postcssLoader };
}

/*
 * CSS file type and support detection logic
 *
 * cssModuleSupport: false
 *
 * - *.css => normal CSS
 * - *.styl => stylus compiled to normal CSS
 * - *.scss => SASS compiled to normal CSS
 * - *.less => SASS compiled to normal CSS
 *
 * cssModuleSupport: true|undefined
 *
 * Any file that match the regex [.mod|module].[css|styl|sass|scss] will be treated as CSS module
 * Files thet match the RexExp:
 * - *.css => CSS-Modules + CSS-Next
 * - *.styl => stylus compiled to normal CSS => CSS-Modules + CSS-Next
 * - *.scss => SASS compiled to normal CSS => CSS-Modules + CSS-Next
 * - *.less => LESS compiled to normal CSS => CSS-Modules + CSS-Next
 *
 * cssModuleSupport: RegExp
 *
 * - Any file matching this user provided regexp will be treated as CSS module
 */

/* eslint-disable complexity */

module.exports = function() {
  const xarcOptions = loadXarcOptions();
  const xarcCwd = xarcOptions.cwd;
  const isProduction = process.env.NODE_ENV === "production";
  const isDevelopment = !isProduction;

  const { enableCssModule, cssModuleRegExp } = detectCssModule(xarcOptions);

  const { hasPostCss, atImport, postcssPresetEnv, postcssLoader } = loadPostCss();

  const rules = [];

  /*
   * postcss Loader
   *
   * Note:
   * - webpack requires an identifier (ident) in options
   * when {Function}/require is used (Complex Options).
   */
  const getPostCssQuery = () =>
    hasPostCss && {
      loader: postcssLoader,
      options: {
        ident: "postcss",
        plugins: loader => [
          autoprefixer(),
          atImport({ root: loader.resourcePath }),
          postcssPresetEnv()
        ]
      }
    };

  /*
   * css-modules Loader
   */
  const getCSSModuleOptions = () => {
    const enableShortenCSSNames = xarcOptions.webpack.enableShortenCSSNames;
    const enableShortHash = isProduction && enableShortenCSSNames;
    const localIdentName = `${enableShortHash ? "" : "[name]__[local]___"}[hash:base64:5]`;

    return {
      context: Path.resolve(xarcCwd, "src"),
      modules: true,
      localIdentName
    };
  };

  const getCssQueryUse = (isModule = false) => {
    return [
      isModule
        ? { loader: cssLoader, options: getCSSModuleOptions() }
        : { loader: cssLoader, options: { minimize: true, modules: false } },
      getPostCssQuery()
    ].filter(x => x);
  };

  /*
   * MiniCssExtractPlugin Loader
   */

  const miniCssExtractLoader = (isModule = false) => ({
    loader: MiniCssExtractPlugin.loader,
    options: {
      // TODO: verify CSS HMR
      // hmr: isDevelopment,
      // reload: isDevelopment,
      publicPath: "",
      esModule: !isModule
      // TODO: webpack5 update - modules options
      // modules: Boolean(isModule)
    }
  });

  /*
   * PLAIN css
   */
  rules.push(
    {
      _name: `extract-css`,
      test: /\.css$/,
      use: [miniCssExtractLoader(false), ...getCssQueryUse(false)],
      ...(enableCssModule && { exclude: cssModuleRegExp })
    },
    enableCssModule && {
      _name: `extract-css-modules`,
      test: /\.css$/,
      use: [isomorphicLoader, miniCssExtractLoader(true), ...getCssQueryUse(true)],
      include: cssModuleRegExp
    }
  );

  /*
   * SASS
   */

  if (sassLoader) {
    rules.push(
      {
        _name: `extract-css-scss`,
        test: /\.(scss|sass)$/,
        use: [
          miniCssExtractLoader(false),
          ...getCssQueryUse(false).concat({ loader: sassLoader } as any)
        ],
        ...(enableCssModule && { exclude: cssModuleRegExp })
      },
      enableCssModule && {
        _name: `extract-css-modules-scss`,
        test: /\.(scss|sass)$/,
        use: [
          isomorphicLoader,
          miniCssExtractLoader(true),
          ...getCssQueryUse(true).concat({ loader: sassLoader } as any)
        ],
        include: cssModuleRegExp
      }
    );
  }

  /*
   * STYLUS
   */
  let stylusQuery;
  if (stylusLoader) {
    stylusQuery = { loader: stylusLoader };

    rules.push(
      {
        _name: `extract-css-stylus`,
        test: /\.styl$/,
        use: [miniCssExtractLoader(false), ...getCssQueryUse(false).concat(stylusQuery)],
        ...(enableCssModule && { exclude: cssModuleRegExp })
      },
      enableCssModule && {
        _name: `extract-css-modules-stylus`,
        test: /\.styl$/,
        use: [
          isomorphicLoader,
          miniCssExtractLoader(true),
          ...getCssQueryUse(true).concat(stylusQuery)
        ],
        include: cssModuleRegExp
      }
    );
  }

  /*
   * LESS
   */
  if (lessLoader) {
    rules.push(
      {
        _name: `extract-css-less`,
        test: /\.less$/,
        use: [
          miniCssExtractLoader(false),
          ...getCssQueryUse(false).concat({ loader: lessLoader } as any)
        ],
        ...(enableCssModule && { exclude: cssModuleRegExp })
      },
      enableCssModule && {
        _name: `extract-css-modules-less`,
        test: /\.less$/,
        use: [
          isomorphicLoader,
          miniCssExtractLoader(true),
          ...getCssQueryUse(true).concat({ loader: lessLoader } as any)
        ],
        include: cssModuleRegExp
      }
    );
  }
  const { namespace } = xarcOptions;

  const nsTag = namespace ? `${namespace}.` : ``;

  const styleBundleFilename =
    process.env.WEBPACK_DEV || xarcOptions.babel.hasMultiTargets
      ? `${nsTag}[name].style.css`
      : `${nsTag}[name].style.[contenthash].css`;

  return {
    module: { rules: rules.filter(x => x) },
    plugins: [
      new MiniCssExtractPlugin({ filename: styleBundleFilename }),
      isProduction && new CssMinimizerPlugin(xarcOptions.webpack.optimizeCssOptions),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        options: { context: Path.resolve(xarcCwd, "src") }
      })
    ].filter(x => !!x)
  };
};
