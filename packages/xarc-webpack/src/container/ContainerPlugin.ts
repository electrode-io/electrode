/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy, Marais Rossouw @maraisr
*/

/* eslint-disable */

// const { validate } = require("schema-utils");
// const schema = require("webpack/schemas/plugins/container/ContainerPlugin.json");
const ContainerEntryDependency = require("webpack/lib/container/ContainerEntryDependency");
const ContainerEntryModuleFactory = require("webpack/lib/container/ContainerEntryModuleFactory");
const ContainerExposedDependency = require("webpack/lib/container/ContainerExposedDependency");
const { parseOptions } = require("webpack/lib/container/options");

/** @typedef {import("../../declarations/plugins/container/ContainerPlugin").ContainerPluginOptions} ContainerPluginOptions */
/** @typedef {import("../Compiler")} Compiler */

const PLUGIN_NAME = "ContainerPlugin";

export class ContainerPlugin {
  _options: any;
  /**
   * @param {ContainerPluginOptions} options options
   */
  constructor(options) {
    // validate(schema, options, { name: "Container Plugin" });

    this._options = {
      name: options.name,
      entry: options.entry,
      shareScope: options.shareScope || "default",
      library: options.library || {
        type: "var",
        name: options.name
      },
      filename: options.filename || undefined,
      exposes: parseOptions(
        options.exposes,
        item => ({
          import: Array.isArray(item) ? item : [item],
          name: undefined
        }),
        item => ({
          import: Array.isArray(item.import) ? item.import : [item.import],
          name: item.name || undefined
        })
      )
    };
  }

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler) {
    const { name, exposes, shareScope, filename, library, entry } = this._options;

    compiler.options.output.enabledLibraryTypes.push(library.type);

    if (entry) {
      compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
        const EntryPlugin = require("webpack/lib/EntryPlugin");
        for (const ent of [].concat(entry)) {
          new EntryPlugin(compilation.options.context, ent, {
            name
          }).apply(compiler);
        }
        return true;
      });
    }

    // setting stage to 1 to ensure the remote runtime module is the last one added
    compiler.hooks.make.tapAsync({ name: PLUGIN_NAME, stage: 1 }, (compilation, callback) => {
      const dep = new ContainerEntryDependency(name, exposes, shareScope);
      dep.loc = { name };

      compilation.addEntry(
        compilation.options.context,
        dep,
        {
          name,
          filename,
          library
        },
        error => {
          if (error) return callback(error);
          callback();
        }
      );
    });

    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      compilation.dependencyFactories.set(
        ContainerEntryDependency,
        new ContainerEntryModuleFactory()
      );

      compilation.dependencyFactories.set(ContainerExposedDependency, normalModuleFactory);
    });
  }
}
