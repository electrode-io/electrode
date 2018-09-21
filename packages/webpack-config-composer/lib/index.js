"use strict";

const deleteCustomProps = require("./delete-custom-props");
const _ = require("lodash");
const assert = require("assert");
const Partial = require("./partial");
const { getConcatMethod } = require("./concat-method");

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
      Object.keys(a).forEach(k => this.addProfile(k, a[k]));
    });
  }

  addProfile(name, profile) {
    assert(!this.profiles.hasOwnProperty(name), `Profile ${name} already exist.`);

    if (typeof profile !== "object") {
      const partialNames = Array.prototype.slice.call(arguments, 1);
      profile = { partials: {} };
      partialNames.forEach(pn => {
        profile.partials[pn] = {};
      });
    } else if (!profile.partials) {
      profile.partials = {};
    }

    this.profiles[name] = profile;

    return this;
  }

  addPartialToProfile(partialName, profileName, config, partialOptions) {
    if (!this.profiles.hasOwnProperty(profileName)) {
      this.addProfile(profileName, {});
    }
    this.addPartial(partialName, config);
    partialOptions = partialOptions || {};
    assert(
      !this.profiles[profileName].partials.hasOwnProperty(partialName),
      `Partial ${partialName} already exist in profile ${profileName}`
    );
    this.profiles[profileName].partials[partialName] = partialOptions;
  }

  addPartials(partials) {
    partials = Array.isArray(partials) ? partials : Array.prototype.slice.call(arguments);

    partials.forEach(a => {
      Object.keys(a).forEach(k => {
        this._addPartial(k, a[k], a[k].addOptions);
      });
    });
  }

  _addPartial(name, data, addOpt) {
    const exist = this.partials[name];

    if (!exist || addOpt.method === "replace") {
      this.partials[name] = new Partial(name, data);
    } else {
      exist.merge(data, addOpt.concatArray);
    }

    return this;
  }

  addPartial(name, config, options) {
    return this._addPartial(name, { config }, options);
  }

  getPartial(name) {
    return this.partials[name];
  }

  getProfile(name) {
    return this.profiles[name];
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
      assert(
        this.partials.hasOwnProperty(partialName),
        `Partial ${partialName} doesn't exist or has not been added`
      );
      const partial = this.partials[partialName];
      const composeOptions = Object.assign({}, profile.partials[partialName].options, {
        currentConfig
      });

      const ret = partial.compose(composeOptions);

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
