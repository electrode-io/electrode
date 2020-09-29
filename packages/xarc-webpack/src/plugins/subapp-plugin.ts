/* eslint-disable @typescript-eslint/camelcase, global-require, @typescript-eslint/no-var-requires */
/* eslint-disable no-magic-numbers, no-case-declarations, no-fallthrough */
import Fs = require("fs");
import _ = require("lodash");
import Path = require("path");

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
  _wVer: number;
  _makeIdentifierBEE: Function;
  _tapAssets: Function;

  /**
   *
   * @param options - subapp plugin options
   */
  constructor({
    declareApiName = ["declareSubApp", "createDynamicComponent"],
    webpackVersion = findWebpackVersion()
  }: { declareApiName?: string | string[]; webpackVersion?: number } = {}) {
    this._declareApiNames = [].concat(declareApiName);
    this._subApps = {};
    this._wVer = webpackVersion;

    const { makeIdentifierBEE, tapAssets } = this[`initWebpackVer${this._wVer}`]();

    this._makeIdentifierBEE = makeIdentifierBEE;
    this._tapAssets = tapAssets;
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
          "//about": "Subapp meta information collected during webpack compile"
        }
      );
    }
    const subapps = JSON.stringify(subappMeta, null, 2) + "\n";
    assets["subapps.json"] = {
      source: () => subapps,
      size: () => subapps.length
    };
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

  apply(compiler) {
    const apiNames = this._declareApiNames;

    this._tapAssets(compiler);

    const findGetModule = props => {
      const prop = props.find(p => p.key.name === "getModule");
      const funcBody = prop.value.body;
      return funcBody;
    };

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
        };

        [].concat(apiNames).forEach(apiName => {
          parser.hooks.call.for(apiName).tap(pluginName, expr => parseForSubApp(expr, apiName));
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
