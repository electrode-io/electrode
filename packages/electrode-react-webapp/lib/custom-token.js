"use strict";

const loadAll = (tokens, options) => {
  tokens.forEach(x => {
    if (x.load) x.load(options);
  });
};

module.exports = {
  loadAll
};
