"use strict";

const assert = require("assert");
const Token = require("./token");

const tokenOpenTag = "<!--%{";
const tokenCloseTag = "}-->";

/* eslint-disable max-statements, no-constant-condition */

function parseTemplate(template) {
  const tokens = [];
  let pt = 0;
  while (true) {
    const pos = template.indexOf(tokenOpenTag, pt);
    if (pos >= pt) {
      const str = template.substring(pt, pos).trim();
      if (str) tokens.push({ str });

      const ex = template.indexOf(tokenCloseTag, pos);
      assert(ex > pos, `Can't find token close tag at position ${pos}`);

      const id = template.substring(pos + tokenOpenTag.length, ex).trim();
      assert(id, `Empty token at position ${pos}`);

      tokens.push(new Token(id, pos));
      pt = ex + tokenCloseTag.length;
    } else {
      const str = template.substring(pt).trim();
      if (str) tokens.push({ str });
      break;
    }
  }

  return tokens;
}

module.exports = parseTemplate;
