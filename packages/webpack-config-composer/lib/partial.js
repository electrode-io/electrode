"use strict";

const _ = require("lodash");
const { getConcatMethod } = require("./concat-method");

class Partial {
  constructor(name, data) {
    this._name = name;
    this._data = Object.assign({ config: {}, options: {} }, data);
  }

  set config(config) {
    this._data.config = config;
  }

  get config() {
    return this._data.config;
  }

  set options(options) {
    this._data.options = Object.assign({}, options);
  }

  get options() {
    return this._data.options;
  }

  merge(data, concatArray) {
    _.mergeWith(this._data, data, getConcatMethod(concatArray));
  }

  compose(options) {
    const config = this.config;
    const configType = typeof config;

    let ret;

    if (configType === "object") {
      ret = config;
    } else if (configType === "function") {
      options = Object.assign({}, this.options, options);
      ret = config(options);
      if (typeof ret === "function") {
        ret = ret(options);
      }
    } else {
      throw new Error(`can't process config from Partial ${this._name}`);
    }

    return ret;
  }
}

module.exports = Partial;
