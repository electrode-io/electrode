"use strict";

const _ = require("lodash");

function joinScripts(acc) {
  if (acc.current) {
    acc.scripts.push(
      acc.src
        ? acc.current
        : acc.current
            .map(x => {
              x = _.trim(x);
              return x.endsWith(";") ? x : `${x};`;
            })
            .join("\n\n")
    );
    acc.current = undefined;
  }
}

module.exports = function groupScripts(data) {
  const output = data.filter(x => x).reduce((acc, x) => {
    const update = src => {
      if (acc.src !== src || !acc.current) {
        joinScripts(acc);
        acc.current = [x];
        acc.src = src;
      } else {
        acc.current.push(x);
      }
    };

    update(!!x.src);

    return acc;
  },
  { src: false, scripts: [] });

  joinScripts(output);

  return output;
};
