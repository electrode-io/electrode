"use strict";

const fs = require("fs");
const Path = require("path");

const archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
const acorn = archDevRequire("acorn");
const _ = archDevRequire("lodash");

const code = fs.readFileSync(process.argv[2]).toString();
let comments = [];
acorn.parse(code, {ranges: false, onComment: comments});

comments = comments.filter(function (c) {
  if (c.type === "Block" && c.value.match(/^ [0-9]+ $/)) {
    return code.substr(c.end + 1, 8) === "function";
  }
});

const stats = require(Path.resolve("dist/server/stats.json"));

const cwd = process.cwd();
const mods = [];
let current = null;
const nm = "node_modules";

comments.forEach(function (c) {
  const m = _.find(stats.modules, function (x) {
    return ` ${x.id} ` === c.value;
  });
  let iden = m.identifier;
  let x = iden.lastIndexOf("!");
  if (x < 0) {
    x = 0;
  } else {
    x++;
  }

  iden = iden.substring(x, iden.length);
  iden = iden.replace(cwd, ".");
  const n = iden.lastIndexOf(nm);
  if (n >= 0) {
    iden = "~" + iden.substring(n + nm.length, iden.length);
  }

  if (current) {
    const size = c.start - current.end;
    mods.push({id: current.id, name: current.name, size: size, iden: current.iden});
  }

  current = {id: m.id, name: m.name, end: c.end, iden: iden};
});

const endAt = code.indexOf("}]))", current.end);
if (endAt <= current.end) {
  throw new Error("can't find end mark");
}

current.size = endAt - current.end + 1;
mods.push(current);

mods.forEach((m) => {
  console.log(m.id + "\t" + m.name + "\t" + m.iden + "\t" + m.size);
});
