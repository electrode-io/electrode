import xenvConfig from "xenv-config";
import { merge } from "lodash";

import { getUserConfig } from "./user-config";

/**
 * Get babel settings from env (deprecated)
 *
 * @returns babel settings
 */
export function getEnvBabel(): any {
  const userConfig = getUserConfig();
  const { options } = userConfig;

  const babelConfigSpec = {
    enableTypeScript: { env: "ENABLE_BABEL_TYPESCRIPT", default: options.typescript || true },
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
        default: {},
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

  return xenvConfig(babelConfigSpec, userConfig.babel, { merge });
}
