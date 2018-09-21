"use strict";

class Profile {
  constructor(name, partials) {
    this._name = name;
    this._partials = partials || {};
  }

  get name() {
    return this._name;
  }

  get partials() {
    return this._partials;
  }

  setPartial(name, options) {
    this._partials[name] = options || {};
  }

  getPartial(name) {
    return this._partials[name];
  }

  delPartial(name) {
    delete this._partials[name];
  }
}

module.exports = Profile;
