/* eslint-disable @typescript-eslint/no-var-requires */
export {};

let cachedEnvBabel = null;

module.exports = function getEnvBabel() {
  const xenvConfig = require("xenv-config");
  const { merge } = require("lodash");

  const userConfig = require("./user-config")();
  const { options } = userConfig;

  const babelConfigSpec = {
    enableTypeScript: { env: "ENABLE_BABEL_TYPESCRIPT", default: options.typescript || true },
    enableDynamicImport: { env: "ENABLE_DYNAMIC_IMPORT", default: false },
    enableFlow: { env: "ENABLE_BABEL_FLOW", default: true },
    // require the @flow directive in source to enable FlowJS type stripping
    flowRequireDirective: { env: "FLOW_REQUIRE_DIRECTIVE", default: false },
    proposalDecorators: { env: "BABEL_PROPOSAL_DECORATORS", default: false },
    legacyDecorators: { env: "BABEL_LEGACY_DECORATORS", default: true },
    transformClassProps: { env: "BABEL_CLASS_PROPS", default: false },
    looseClassProps: { env: "BABEL_CLASS_PROPS_LOOSE", default: true },
    envTargets: {
      env: "BABEL_ENV_TARGETS",
      type: "json",
      default: {
        //`default` and `node` targets object is required
        default: {
          ie: "8"
        },
        node: { node: process.versions.node.split(".")[0] }
      }
    },
    target: {
      env: "ENV_TARGET",
      type: "string",
      default: "default"
    },
    // `extendLoader` is used to override `babel-loader` only when `hasMultiTargets=true`
    extendLoader: {
      type: "json",
      default: {}
    }
  };
  cachedEnvBabel = cachedEnvBabel || xenvConfig(babelConfigSpec, userConfig.babel, { merge });
  return cachedEnvBabel;
};
