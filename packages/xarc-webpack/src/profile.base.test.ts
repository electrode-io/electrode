// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};

const profile = {
  partials: {
    "_test-base": { order: 1000 },
    "_test-entry": { order: 1010 },
    "_test-output": { order: 1020 },
    "_test-resolve": { order: 1030 }
  }
};

module.exports = profile;
