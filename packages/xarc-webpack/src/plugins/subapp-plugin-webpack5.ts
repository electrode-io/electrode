/* eslint-disable @typescript-eslint/camelcase, global-require, @typescript-eslint/no-var-requires */
/* eslint-disable no-magic-numbers, no-case-declarations, no-fallthrough, max-statements */
import Fs = require("fs");
import _ = require("lodash");
import Path = require("path");

/**
 * This plugin (SubAppWebpackPlugin) add hooks for webpack's compiler and parser, and listen
 * for any code that call the SubApp APIs declareSubApp or createDynamicComponent.
 *
 * It then take the parser's AST to analyze the arguments passed to the APIs to extract subapp
 * import module and name.
 *
 * It also injects webpack's magic comment to name the subapp dynamic bundle.
 *
 * In dev mode, it will inject hot module reload code.
 *
 * Finally, it saves all the subapp info captured as a webpack emit asset subapps.json.
 *
 */

const ModuleDependency = require("webpack/lib/dependencies/ModuleDependency");

const pluginName = "SubAppPlugin";

const findWebpackVersion = (): number => {
  const webpackPkg = JSON.parse(
    Fs.readFileSync(require.resolve("webpack/package.json")).toString()
  );
  const webpackVersion = parseInt(webpackPkg.version.split(".")[0]);
  return webpackVersion;
};

const assert = (ok: boolean, fail: string | Function) => {
  if (!ok) {
    const x = typeof fail === "function" ? fail() : fail;
    if (typeof x === "string") {
      throw new Error(x);
    }
    throw x;
  }
};

const SHIM_parseCommentOptions = Symbol("parseCommentOptions");
const SYM_HMR_INJECT = Symbol("sym-hmr-inject");

import { hmrSetup } from "../client/hmr-accept";

/**
 * subapp hot module reload accept dependency.  When SubAppWebpackPlugin detects a module
 * has declareSubApp, it will add this as a dependency to that module.  Webpack will invoke
 * this dep's template (below), which will inject the HMR code for the module.
 *
 * References:
 * - `webpack/lib/dependencies/ModuleHotAcceptDependency.js`
 * - `webpack/lib/HotModuleReplacementPlugin.js`
 *
 */
class SubAppHotAcceptDependency extends ModuleDependency {
  parent: any;
  subapp: any;
  constructor(request, parent, subapp: any) {
    super(request);
    this.parent = parent;
    this.subapp = subapp;
    this.optional = true;
    // important to set this else code splitting stop working
    this.weak = true;
  }

  get type() {
    return "xarc.subapp.hot.accept";
  }

  get hasInject() {
    return Boolean(this.parent[SYM_HMR_INJECT]);
  }

  initInject() {
    if (!this.parent[SYM_HMR_INJECT]) {
      this.parent[SYM_HMR_INJECT] = {};
    }
    return this.parent[SYM_HMR_INJECT];
  }

  get injected() {
    return this.parent[SYM_HMR_INJECT];
  }
}

/**
 * subapp hot accept template, this will insert HMR code from ../client/hmr-accept.ts
 * into the module that declareSubApp.
 *
 */
class SubAppHotAcceptTemplate {
  apply(dep: SubAppHotAcceptDependency, source: any, runtime: any) {
    if (!(dep instanceof SubAppHotAcceptDependency)) {
      return;
    }

    const content = runtime.moduleId({
      module: dep.module,
      request: dep.request
    });

    const script = [];

    if (!dep.hasInject) {
      dep.initInject();

      //
      // injecting code from ../client/hmr-accept.ts: it's using the function
      // exported and its toString to get the code.  So it's important the
      // function is fully self contained without external dependencies.
      //
      script.push(`
/* subapp HMR accept */
var __xarcHmr__ = (${hmrSetup.toString()})(window, module.hot);`);
    }

    if (!dep.injected[content]) {
      script.push(`__xarcHmr__.addSubApp(${content}, "${dep.subapp.name}");`);
    }

    if (script.length > 0) {
      source.insert(
        source.size() + 0.5,
        `
${script.join("\n")} /***/`
      );
    }
  }
}

/**
 * This plugin will look for `declareSubApp` calls and do these:
 *
 * 1. instruct webpack to name the dynamic import bundle as `subapp-<name>`
 * 2. collect the subapp meta info and save them as `subapps.json`
 *
 */
export class SubAppWebpackPlugin {
  _declareApiNames: string[];
  _subApps: Record<string, any>;
  _webpackMajorVersion: number;
  _makeIdentifierBEE: Function;
  _tapAssets: Function;
  _assetsFile: string;

  /**
   *
   * @param options - subapp plugin options
   */
  constructor({
    declareApiName = ["declareSubApp", "createDynamicComponent"],
    webpackVersion = findWebpackVersion(),
    assetsFile = "subapps.json"
  }: {
    /**
     * The API names for declaring subapp and components
     */
    declareApiName?: string | string[];
    /**
     * Webpack version (4, 5, etc)
     *
     * minimum 4
     */
    webpackVersion?: number;
    /**
     * Filename to output the subapp assets JSON file
     * **default**: `subapps.json`
     */
    assetsFile?: string;
  } = {}) {
    this._declareApiNames = [].concat(declareApiName);
    this._subApps = {};
    this._webpackMajorVersion = webpackVersion;

    const { makeIdentifierBEE, tapAssets } = this[`initWebpackVer${this._webpackMajorVersion}`]();

    this._makeIdentifierBEE = makeIdentifierBEE;
    this._tapAssets = tapAssets;
    this._assetsFile = assetsFile;
  }

  initWebpackVer4() {
    const BEE = require("webpack/lib/BasicEvaluatedExpression");
    return {
      BasicEvaluatedExpression: BEE,
      makeIdentifierBEE: expr => {
        return new BEE().setIdentifier(expr.name).setRange(expr.range);
      },
      tapAssets: compiler => {
        compiler.hooks.emit.tap(pluginName, compilation => this.updateAssets(compilation.assets));
      }
    };
  }

  initWebpackVer5() {
    const BEE = require("webpack/lib/javascript/BasicEvaluatedExpression");
    return {
      BasicEvaluatedExpression: BEE,
      makeIdentifierBEE: expr => {
        return new BEE()
          .setIdentifier(expr.name, {}, () => [])
          .setRange(expr.range)
          .setExpression(expr);
      },
      tapAssets: compiler => {
        compiler.hooks.compilation.tap(pluginName, compilation => {
          compilation.hooks.processAssets.tap(pluginName, assets => this.updateAssets(assets));
        });
      }
    };
  }

  updateAssets(assets) {
    let subappMeta = {};
    const keys = Object.keys(this._subApps);
    if (keys.length > 0) {
      subappMeta = keys.reduce(
        (acc, k) => {
          acc[k] = _.pick(this._subApps[k], ["name", "source", "module"]);
          return acc;
        },
        {
          "//about": "Subapp meta information collected during webpack compile",
          "//count": keys.length
        }
      );
      const subapps = JSON.stringify(subappMeta, null, 2) + "\n";
      assets[this._assetsFile] = {
        source: () => subapps,
        size: () => subapps.length
      };
      console.log("version 2 subapps found:", keys.join(", ")); // eslint-disable-line
    }
  }

  findImportCall(ast) {
    switch (ast.type) {
      case "CallExpression":
        const arg = _.get(ast, "arguments[0]", {});
        if (ast.callee.type === "Import" && arg.type === "Literal") {
          return arg.value;
        }
      case "ReturnStatement":
        return this.findImportCall(ast.argument);
      case "BlockStatement":
        for (const n of ast.body) {
          const res = this.findImportCall(n);
          if (res) {
            return res;
          }
        }
    }
    return undefined;
  }

  /**
   * Webpack 5 Reference:
   * - lib/HotModuleReplacementPlugin.js
   *
   * @param compiler
   */
  _applyHmrInject(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation, { normalModuleFactory }) => {
      // This applies the HMR injection only to the targeted compiler
      // It should not affect child compilations
      if (compilation.compiler !== compiler) return;

      // const hotUpdateChunkTemplate = compilation.hotUpdateChunkTemplate;
      // if (!hotUpdateChunkTemplate) return;

      compilation.dependencyFactories.set(SubAppHotAcceptDependency, normalModuleFactory);

      compilation.dependencyTemplates.set(SubAppHotAcceptDependency, new SubAppHotAcceptTemplate());
    });
  }

  apply(compiler) {
    this._tapAssets(compiler);

    const findGetModule = props => {
      const prop = props.find(p => p.key.name === "getModule");
      const funcBody = prop.value.body;
      return funcBody;
    };

    this._applyHmrInject(compiler);

    compiler.hooks.normalModuleFactory.tap(pluginName, factory => {
      factory.hooks.parser.for("javascript/auto").tap(pluginName, (parser, options) => {
        parser[SHIM_parseCommentOptions] = parser.parseCommentOptions;

        assert(
          parser.parseCommentOptions,
          `webpack parser doesn't have method 'parseCommentOptions' - not compatible with this plugin`
        );

        const xl = parser.parseCommentOptions.length;
        assert(
          xl === 1,
          `webpack parser.parseCommentOptions takes ${xl} arguments - but expecting 1 so not compatible with this plugin`
        );

        parser.parseCommentOptions = range => {
          for (const k in this._subApps) {
            const subapp = this._subApps[k];
            const gmod = subapp.getModule;
            if (range[0] >= gmod.range[0] && gmod.range[1] >= range[1]) {
              const name = subapp.name.toLowerCase().replace(/ /g, "_");
              return {
                options: { webpackChunkName: `subapp-${name}` },
                errors: []
              };
            }
          }
          return parser[SHIM_parseCommentOptions](range);
        };

        const noCwd = x => x.replace(process.cwd(), ".");

        const where = (source, loc) => {
          return `${source}:${loc.start.line}:${loc.start.column + 1}`;
        };

        const parseForSubApp = (expression, apiName) => {
          const currentSource = _.get(parser, "state.current.resource", "");
          const props = _.get(expression, "arguments[0].properties");
          const cw = () => where(noCwd(currentSource), expression.loc);

          if (!props && apiName === "createDynamicComponent") {
            return;
          }

          assert(props, () => `${cw()}: you must pass an Object literal as argument to ${apiName}`);

          const nameProp = props.find(p => p.key.name === "name");
          assert(nameProp, () => `${cw()}: argument for ${apiName} doesn't have a name property`);

          const nameVal = nameProp.value.value;
          assert(
            nameVal && typeof nameVal === "string",
            () => `${cw()}: subapp name must be specified as an inlined literal string`
          );
          // the following breaks hot recompiling in dev mode
          // const exist = this._subApps[nameVal];
          // assert(
          //   !exist,
          //   () =>
          //     `${cw()}: subapp '${nameVal}' is already declared at ${where(
          //       noCwd(exist.source),
          //       exist.loc
          //     )}`
          // );
          const gm = findGetModule(props);

          // try to figure out the module that's being imported for this subapp
          // getModule function: () => import("./subapp-module")
          // getModule function: function () { return import("./subapp-module") }
          const mod = this.findImportCall(gm);

          this._subApps[nameVal] = {
            name: nameVal,
            source: Path.relative(process.cwd(), currentSource),
            loc: expression.loc,
            range: expression.range,
            getModule: gm,
            module: mod
          };

          if (process.env.WEBPACK_DEV && parser.state.compilation.hotUpdateChunkTemplate) {
            const dep = new SubAppHotAcceptDependency(
              mod,
              parser.state.module,
              this._subApps[nameVal]
            );
            parser.state.module.addDependency(dep);
            parser.state.module[SYM_HMR_INJECT] = null;
          }
        };

        const apiNames = [].concat(this._declareApiNames);

        [].concat(apiNames).forEach(apiName => {
          parser.hooks.call.for(apiName).tap(pluginName, expr => parseForSubApp(expr, apiName));
        });

        parser.hooks.evaluate
          .for("CallExpression")
          .tap({ name: pluginName, before: "Parser" }, expression => {
            const calleeName = _.get(expression, "callee.property.name");
            if (apiNames.includes(calleeName)) {
              return parseForSubApp(expression, calleeName);
            }

            return undefined;
          });

        parser.hooks.evaluate
          .for("Identifier")
          .tap({ name: pluginName, before: "Parser" }, expression => {
            if (apiNames.includes(expression.name)) {
              return this._makeIdentifierBEE(expression);
            }

            return undefined;
          });
      });
    });
  }
}
