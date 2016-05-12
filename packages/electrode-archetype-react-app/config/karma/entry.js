"use strict";

var archDevRequire = require("@walmart/electrode-archetype-react-app-dev/require");
archDevRequire("babel-polyfill");

/**
 * Test setup for client-side tests.
 *
 * Intended for:
 * - Karma tests: `npm run test-client`
 * - Browser tests: `http://localhost:3000/test/client/test.html`
 */
/*globals window:false*/
var chai = archDevRequire("chai");
var sinonChai = archDevRequire("sinon-chai");
/*
 * We need a global sinon to maintain compatibility
 * with existing test suites. However, this will be
 * removed in the future and is being tracked by
 * https://gecgithub01.walmart.com/electrode/electrode-archetype-react-component/issues/10
 */
window.sinon = archDevRequire("sinon");

// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports
window.expect = chai.expect;

// Plugins
chai.use(sinonChai);

// Mocha (part of static include).
window.mocha.setup({
  ui: "bdd",
  bail: false
});

// --------------------------------------------------------------------------
// Bootstrap
// --------------------------------------------------------------------------
// Use webpack to include all app code _except_ the entry point so we can get
// code coverage in the bundle, whether tested or not.
var srcReq = archDevRequire.context("client", true, /^((?!app).)*\.jsx?$/);
srcReq.keys().map(srcReq);

// Use webpack to infer and `require` tests automatically only for test/client
var testsReq = archDevRequire.context("test/client", true, /\.spec.jsx?$/);
testsReq.keys().map(testsReq);

// Only start mocha in browser.
if (!window.__karma__) {
  window.mocha.run();
}
