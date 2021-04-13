"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const constants_1 = require("./constants");
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
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map