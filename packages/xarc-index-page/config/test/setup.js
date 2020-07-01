"use strict";

function tryRequire(path) {
  try {
    return require(path);
  } catch {
    return undefined;
  }
}

// Chai setup.
const chai = tryRequire("chai");
if (!chai) {
  console.log(`
mocha setup: chai is not found. Not setting it up for mocha.
             To setup chai for your mocha test, run 'clap mocha'.`);
} else {
  const sinonChai = tryRequire("sinon-chai");

  if (!sinonChai) {
    console.log(`
mocha setup: sinon-chai is not found. Not setting it up for mocha.
             To setup sinon-chai for your mocha test, run 'clap mocha'.`);
  } else {
    chai.use(sinonChai);
  }

  // Exports
  global.expect = chai.expect;
}
