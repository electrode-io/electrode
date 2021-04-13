import CONSTANTS from "./constants";
const { PARTIALS } = CONSTANTS;
class Profile {
  _name: any;

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

export = Profile;
