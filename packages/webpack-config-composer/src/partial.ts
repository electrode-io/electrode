// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");
import CONSTANT from "./constants";
import ConcatMethod from "./concat-method";

const { DATA, OVERRIDE } = CONSTANT;
const { getConcatMethod } = ConcatMethod;

class Partial {
  _name: any;

  constructor(name, data) {
    this._name = name;
    if (typeof data === "function") {
      this[DATA] = { config: data };
    } else {
      this[DATA] = { config: {}, options: {}, ...data };
    }
    this.setOverride(_.identity);
  }

  set config(config) {
    this[DATA].config = config;
  }

  get config() {
    return this[DATA].config;
  }

  set options(options) {
    this[DATA].options = { ...options };
  }

  get options() {
    return this[DATA].options;
  }

  merge(data, concatArray) {
    _.mergeWith(this[DATA], data, getConcatMethod(concatArray, null));
  }

  setOverride(fn) {
    this[OVERRIDE] = fn || _.identity;
  }

  compose(options) {
    options = { ...this.options, ...options };

    let config = this.config;

    while (typeof config === "function") {
      config = config(options);
      if (config && config.webpackPartial) {
        config = config.webpackPartial;
      }
    }

    const override = this[OVERRIDE](config, options);

    return override || config;
  }
}

export = Partial;
