"use strict";

const { PARTIALS } = require("./constants");

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
