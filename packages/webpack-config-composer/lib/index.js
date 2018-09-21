"use strict";

const deleteCustomProps = require("./delete-custom-props");
const headConcatArrayMerge = require("./head-concat-array-merge");
const tailConcatArrayMerge = require("./tail-concat-array-merge");
const _ = require("lodash");
const assert = require("assert");

const concatArrayMerge = {
  head: headConcatArrayMerge,
  tail: tailConcatArrayMerge,
  no: undefined
};

const getConcatMethod = (method, fallback) => {
  return concatArrayMerge.hasOwnProperty(method)
    ? concatArrayMerge[method]
    : fallback || concatArrayMerge.tail;
};

class WebpackConfigComposer {
  constructor(options) {
    options = options || {};
    this.profiles = {};
    this.partials = {};
    if (options.profiles) {
      this.addProfiles(options.profiles);
    }
    if (options.partials) {
      this.addPartials(options.partials);
    }
    this.logger = options.logger || console.log;
  }

  addProfiles(profiles) {
    profiles = Array.isArray(profiles) ? profiles : Array.prototype.slice.call(arguments);
    profiles.forEach(a => {
      Object.keys(a).forEach(k => {
        assert(!this.profiles.hasOwnProperty(k), `Profile ${k} already exist.`);
        this.profiles[k] = a[k];
      });
    });
  }

  addPartials(partials) {
    partials = Array.isArray(partials) ? partials : Array.prototype.slice.call(arguments);
    partials.forEach(a => {
      Object.keys(a).forEach(k => {
        const x = a[k];
        const opt = x.addOptions || {};
        const p = _.omit(x, "addOptions");
        if (opt.method === "replace") {
          this.partials[k] = p;
        } else {
          _.mergeWith(
            this.partials,
            { [k]: _.omit(x, "addOptions") },
            getConcatMethod(opt.concatArray)
          );
        }
      });
    });
  }

  compose(options, profile) {
    if (!_.isArray(profile)) {
      profile = Array.prototype.slice.call(arguments, 1);
    }

    const name = profile.join("-");
    profile = profile.map(p => {
      if (_.isString(p)) {
        assert(this.profiles.hasOwnProperty(p), `Profile ${p} doesn't exist in the composer`);
        return this.profiles[p];
      }
      return p;
    });
    profile.unshift({});
    profile = _.merge.apply(null, profile);
    profile.name = name;

    const num = x => {
      return _.isString(x) ? parseInt(x, 10) : x;
    };
    const checkNaN = x => {
      return isNaN(x) ? Infinity : x;
    };
    const isEnable = p => profile.partials[p].enable !== false;

    const partialOrder = p => checkNaN(num(profile.partials[p].order));
    const sortedKeys = _(Object.keys(profile.partials))
      .filter(isEnable)
      .sortBy(partialOrder)
      .value();

    const currentConfig = options.currentConfig || {};

    const concat = getConcatMethod(options.concatArray);

    sortedKeys.forEach(partialName => {
      let ret;
      assert(
        this.partials.hasOwnProperty(partialName),
        `Partial ${partialName} doesn't exist or has not been added`
      );
      const partial = this.partials[partialName];
      if (typeof partial.config === "object") {
        ret = partial.config;
      } else if (typeof partial.config === "function") {
        const partialOpt = _.merge({}, partial.options, profile.partials[partialName].options);
        partialOpt.currentConfig = currentConfig;
        ret = partial.config(partialOpt);
        if (typeof ret === "function") {
          ret = ret(partialOpt);
        }
      } else {
        throw new Error(`can't process config from Partial ${partialName}`);
      }

      if (typeof ret === "object") {
        _.mergeWith(currentConfig, ret, concat);
      }
    });

    if (!options.skipNamePlugins && currentConfig.plugins) {
      currentConfig.plugins = currentConfig.plugins.map(x => {
        x.__name = x.constructor.name;
        return x;
      });
    }

    if (!options.keepCustomProps) {
      deleteCustomProps(currentConfig);
    }

    return currentConfig;
  }

  deleteCustomProps(config) {
    return deleteCustomProps(config);
  }
}

WebpackConfigComposer.deleteCustomProps = deleteCustomProps;

module.exports = WebpackConfigComposer;
