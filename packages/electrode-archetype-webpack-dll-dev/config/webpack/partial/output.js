"use strict";

const { context, tag } = require("../util/context");

module.exports = {
  output: {
    path: context,
    filename: `electrode-dll.[name]${tag}.js`,
    library: "dll_[name]"
  }
};
