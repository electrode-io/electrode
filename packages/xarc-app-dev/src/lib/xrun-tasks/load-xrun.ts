import {
  LoadXrunFunction,
  ArchetypeOptions,
  defaultWebpackConfig,
  defaultBabelConfig
} from "./load-xrun-types";
import loadArchetype from "../load-xrun-tasks";

function mergeConfigIntoProcessEnv(config) {
  /*todo*/
}

export default function initTasks(options): LoadXrunFunction {
  const config = {
    ...options,
    ...{
      webpack: defaultWebpackConfig,
      babel: defaultBabelConfig
    }
  };

  const xrun = require("@xarc/run") || require("@xarc/clap");

  return loadArchetype(xrun, config);
}
