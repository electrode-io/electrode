"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Partial = exports.DATA = exports.OVERRIDE = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");
const concat_method_1 = require("./concat-method");
exports.OVERRIDE = Symbol("override webpack config partial");
exports.DATA = Symbol("webpack partial data");
class Partial {
    constructor(name, data) {
        this._name = name;
        if (typeof data === "function") {
            this[exports.DATA] = { config: data };
        }
        else {
            this[exports.DATA] = Object.assign({ config: {}, options: {} }, data);
        }
        this.setOverride(_.identity);
    }
    set config(config) {
        this[exports.DATA].config = config;
    }
    get config() {
        return this[exports.DATA].config;
    }
    set options(options) {
        this[exports.DATA].options = Object.assign({}, options);
    }
    get options() {
        return this[exports.DATA].options;
    }
    merge(data, concatArray) {
        _.mergeWith(this[exports.DATA], data, concat_method_1.getConcatMethod(concatArray, null));
    }
    setOverride(fn) {
        this[exports.OVERRIDE] = fn || _.identity;
    }
    compose(options) {
        options = Object.assign({}, this.options, options);
        const config = this.config.webpackPartial || this.config;
        const configType = typeof config;
        let ret;
        if (configType === "object") {
            ret = config;
        }
        else if (configType === "function") {
            ret = config(options);
            if (typeof ret === "function") {
                ret = ret(options);
            }
        }
        else {
            throw new Error(`can't process config from Partial ${this._name}`);
        }
        const override = this[exports.OVERRIDE](ret, options);
        return override || ret;
    }
}
exports.Partial = Partial;
//# sourceMappingURL=partial.js.map