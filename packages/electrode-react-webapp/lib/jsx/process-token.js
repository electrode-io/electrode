"use strict";

/* eslint-disable max-params */

const { TOKEN_HANDLER } = require("../symbols");

const _ = require("lodash");

function processToken(props, context, scope, forRequire = false) {
  const renderer = context.asyncTemplate;

  const tokenInst = renderer.setupTokenInst(scope.element, scope, forRequire);

  if (scope.element.memoize) {
    return scope.output.add(scope.element.memoize);
  }

  if (tokenInst[TOKEN_HANDLER] === null) {
    if (renderer.insertTokenIds) {
      return `<!-- ${tokenInst.id} removed due to its handler set to null -->`;
    }
    return null;
  }

  if (renderer.insertTokenIds) {
    scope.output.add(
      `<!-- BEGIN ${tokenInst.id} props: ${JSON.stringify(_.omit(props, "_id"))} -->\n`
    );
  }

  const r = tokenInst[TOKEN_HANDLER](context, tokenInst);
  return context.handleTokenResult(tokenInst.id, r, err => {
    if (props._insertTokenIds !== false && renderer.insertTokenIds) {
      scope.output.add(`<!-- ${tokenInst.id} END -->`);
    }
    // if err, then handler has caused/returned an error
    if (err) {
      throw err;
    }
  });
}

module.exports = processToken;
