"use strict";

const deleteCustomProps = require("./delete-custom-props");
const _ = require("lodash");
const assert = require("assert");
const Partial = require("./partial");
const Profile = require("./profile");
const { getConcatMethod } = require("./concat-method");

const { PARTIALS, PROFILES } = require("./constants");

class WebpackConfigComposer {
  constructor(options) {
    options = options || {};
    this[PROFILES] = {};
    this[PARTIALS] = {};
    if (options.profiles) {
      this.addProfiles(options.profiles);
    }
    if (options.partials) {
      this.addPartials(options.partials);
    }
    this.logger = options.logger || console.log;
  }

  get profiles() {
    return this[PROFILES];
  }

  get partials() {
    return this[PARTIALS];
  }

  addProfiles(profiles) {
    profiles = Array.isArray(profiles) ? profiles : Array.prototype.slice.call(arguments);

    profiles.forEach(a => {
      Object.keys(a).forEach(k => this.addProfile(k, a[k].partials));
    });
  }

  addProfile(name, partials) {
    assert(!this.getProfile(name), `Profile ${name} already exist.`);

    let profile;

    if (typeof partials !== "object") {
      // take argument as list of partial names
      const partialNames = Array.prototype.slice.call(arguments, 1);
      profile = new Profile(name);
      partialNames.forEach(pn => {
        profile.partials[pn] = {};
      });
    } else {
      profile = new Profile(name, partials);
    }

    this[PROFILES][name] = profile;

    return profile;
  }

  addPartialToProfile(partialName, profileName, config, partialOptions) {
    let profile = this.getProfile(profileName);
    if (!profile) {
      profile = this.addProfile(profileName, {});
    }
    assert(
      !profile.getPartial(partialName),
      `Partial ${partialName} already exist in profile ${profileName}`
    );
    this.addPartial(partialName, config);
    profile.setPartial(partialName, partialOptions);
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
    const exist = this[PARTIALS][name];

    if (!exist || _.get(addOpt, "method") === "replace") {
      this[PARTIALS][name] = data instanceof Partial ? data : new Partial(name, data);
    } else {
      exist.merge(data, _.get(addOpt, "concatArray"));
    }

    return this;
  }

  addPartial(name, config, options) {
    return this._addPartial(name, { config }, options);
  }

  replacePartial(name, config, options) {
    return this._addPartial(name, { config }, Object.assign({}, options, { method: "replace" }));
  }

  getPartial(name) {
    return this[PARTIALS][name];
  }

  enablePartial(name, flag) {
    const partial = this.getPartial(name);
    if (partial) {
      partial.enable = flag;
    }
  }

  getProfile(name) {
    return this[PROFILES][name];
  }

  compose(options, ...profiles) {
    const allProfiles = _.flatten(profiles);

    const profileNames = allProfiles.map(p => (_.isString(p) ? p : p.name));

    let profPartials = allProfiles.map(p => {
      if (_.isString(p)) {
        const prof = this.getProfile(p);
        assert(prof, `Profile ${p} doesn't exist in the composer`);
        return prof.partials;
      }

      return p.partials || {};
    });

    profPartials = _.merge({}, ...profPartials);

    const num = x => {
      return _.isString(x) ? parseInt(x, 10) : x;
    };

    const checkNaN = x => {
      return isNaN(x) ? Infinity : x;
    };

    const isEnable = p => profPartials[p].enable !== false;

    const partialOrder = p => checkNaN(num(profPartials[p].order));
    const sortedKeys = _(Object.keys(profPartials))
      .filter(isEnable)
      .sortBy(partialOrder)
      .value();

    const currentConfig = options.currentConfig || {};

    const concat = getConcatMethod(options.concatArray);

    sortedKeys.forEach(partialName => {
      const partial = this.getPartial(partialName);
      assert(partial, `Partial ${partialName} doesn't exist or has not been added`);

      const composeOptions = Object.assign({}, profPartials[partialName].options, {
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

    if (options.meta) {
      return { config: currentConfig, profileNames, partialNames: sortedKeys };
    }

    return currentConfig;
  }

  deleteCustomProps(config) {
    return deleteCustomProps(config);
  }
}

WebpackConfigComposer.deleteCustomProps = deleteCustomProps;

module.exports = WebpackConfigComposer;
