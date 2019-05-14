"use strict";

/* eslint-disable no-unused-vars, no-magic-numbers */

const Path = require("path");
const Fs = require("fs");
const _ = require("lodash");

const MEMOIZE = {};

function Literal(props, context, scope) {
  const renderer = context.asyncTemplate;

  let data;

  if (props.file) {
    const fp = Path.resolve(props.file);

    if (MEMOIZE[fp]) {
      data = MEMOIZE[fp];
    } else {
      try {
        data = Fs.readFileSync(fp, _.get(props, "encoding", "utf8"));
      } catch (err) {
        const cwd = process.cwd();
        /* istanbul ignore next */
        const msg = cwd.length > 3 ? err.message.replace(cwd, "CWD") : err.message;
        data = `<h1>Literal reading file failed: ${msg}</h1>`;
      }
    }

    if (props._memoize !== false) {
      MEMOIZE[fp] = data;
    }
  } else {
    data = "<h1>Literal props missing file</h1>";
  }

  return data;
}

module.exports = Literal;
