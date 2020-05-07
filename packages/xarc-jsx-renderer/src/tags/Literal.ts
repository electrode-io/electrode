/**
 * @packageDocumentation
 * @module index
 */

/* eslint-disable comma-dangle, arrow-parens, filenames/match-regex */
/* eslint-disable no-unused-vars, no-magic-numbers */

import * as Path from "path";
import * as Fs from "fs";
import * as _ from "lodash";

const MEMOIZE = {};

export function Literal(props: any, _context: any) {
  // const renderer = context.asyncTemplate;

  let data: any;

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
