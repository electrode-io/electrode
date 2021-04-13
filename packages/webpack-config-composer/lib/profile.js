"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const constants_1 = __importDefault(require("./constants"));
const { PARTIALS } = constants_1.default;
class Profile {
    constructor(name, partials) {
        this._name = name;
        this[PARTIALS] = partials || {};
    }
    get name() {
        return this._name;
    }
    get partials() {
        return this[PARTIALS];
    }
    setPartial(name, options) {
        this[PARTIALS][name] = options || {};
    }
    getPartial(name) {
        return this[PARTIALS][name];
    }
    delPartial(name) {
        delete this[PARTIALS][name];
    }
}
module.exports = Profile;
//# sourceMappingURL=profile.js.map