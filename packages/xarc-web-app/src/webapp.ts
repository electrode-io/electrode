import { JsxRenderer } from "@xarc/jsx-renderer";
import * as Path from "path";
import _ from "lodash";

export const makeRouteHandler = routeOptions => {
  const templateFullPath =
    (routeOptions.templateFile && Path.resolve(routeOptions.templateFile)) ||
    Path.join(__dirname, "../template/index");

  const userTokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);
  let finalTokenHandlers = userTokenHandlers;
  if (!routeOptions.replaceTokenHandlers) {
    const reactTokenHandlers = Path.join(__dirname, "handlers/react/token-handlers");
    finalTokenHandlers =
      userTokenHandlers.indexOf(reactTokenHandlers) < 0
        ? [reactTokenHandlers].concat(userTokenHandlers)
        : userTokenHandlers;
  }
  /* eslint-disable no-restricted-imports */
  /* eslint-disable  @typescript-eslint/no-var-requires */

  const template = require(templateFullPath);
  const renderer = new JsxRenderer({
    templateFullPath: Path.dirname(templateFullPath),
    template: _.get(template, "default", template),
    tokenHandlers: finalTokenHandlers.filter(x => x),
    insertTokenIds: routeOptions.insertTokenIds,
    routeOptions
  });
  return renderer;
};

// export class WebApp {
//   _routeOptions: any;
//   templateFullPath: string;
//   renderer: JsxRenderer;
//   template: Array<TokenModule>;

//   tokenHandlers: Array<any>;
//   renderContext: RenderContext;

//   constructor(routeOptions: any) {
//     this._routeOptions = routeOptions;

//     this.templateFullPath =
//       (routeOptions.templateFile && Path.resolve(routeOptions.templateFile)) ||
//       Path.join(__dirname, "../template/index");

//     const userTokenHandlers = [].concat(routeOptions.tokenHandler, routeOptions.tokenHandlers);
//     let finalTokenHandlers = userTokenHandlers;

//     if (!routeOptions.replaceTokenHandlers) {
//       const reactTokenHandlers = Path.join(__dirname, "handlers/react/token-handlers");
//       finalTokenHandlers =
//         userTokenHandlers.indexOf(reactTokenHandlers) < 0
//           ? [reactTokenHandlers].concat(userTokenHandlers)
//           : userTokenHandlers;
//     }

//     this.template = require(this.templateFullPath);
//     this.renderer = new JsxRenderer({
//       templateFullPath: Path.dirname(this.templateFullPath),
//       template: _.get(this.template, "default", this.template),
//       tokenHandlers: this.tokenHandlers.filter(x => x),
//       insertTokenIds: routeOptions.insertTokenIds,
//       routeOptions
//     });
//   }

//   static async makeRouteHander(routeOptions) {
//     return new WebApp(routeOptions).renderer;
//   }
// }

// const setupOptions = options => {
//   const https = process.env.WEBPACK_DEV_HTTPS && process.env.WEBPACK_DEV_HTTPS !== "false";

//   const pluginOptionsDefaults = {
//     pageTitle: "Untitled Electrode Web Application",
//     webpackDev: process.env.WEBPACK_DEV === "true",
//     renderJS: true,
//     serverSideRendering: true,
//     htmlFile: Path.join(__dirname, "index.html"),
//     devServer: {
//       protocol: https ? "https" : "http",
//       host: process.env.WEBPACK_DEV_HOST || process.env.WEBPACK_HOST || "localhost",
//       port: process.env.WEBPACK_DEV_PORT || "2992",
//       https
//     },
//     unbundledJS: {
//       enterHead: [],
//       preBundle: [],
//       postBundle: []
//     },
//     paths: {},
//     stats: "dist/server/stats.json",
//     otherStats: {},
//     iconStats: "dist/server/iconstats.json",
//     criticalCSS: "dist/js/critical.css",
//     buildArtifacts: ".build",
//     prodBundleBase: "/js/",
//     cspNonceValue: undefined
//   };

//   const pluginOptions = _.defaultsDeep({}, options, pluginOptionsDefaults);
//   const chunkSelector = resolveChunkSelector(pluginOptions);
//   const devBundleBase = makeDevBundleBase(pluginOptions.devServer);
//   const statsPath = getStatsPath(pluginOptions.stats, pluginOptions.buildArtifacts);

//   const assets = loadAssetsFromStats(statsPath);
//   const otherAssets = getOtherAssets(pluginOptions);
//   pluginOptions.__internals = _.defaultsDeep({}, pluginOptions.__internals, {
//     assets,
//     otherAssets,
//     chunkSelector,
//     devBundleBase
//   });

//   return pluginOptions;
// };
