"use strict";

/* eslint-disable no-var */

require("core-js");
require("regenerator-runtime/runtime");

/**
 * Test setup for client-side tests.
 *
 * Intended for:
 * - Karma tests: `npm run test-client`
 * - Browser tests: `http://localhost:3000/test/client/test.html`
 */
/*globals window:false*/

/**
 * Install enzyme along with an Adapter corresponding to React 16
 * Configure enzyme to use the adapter using the top level configure(...) API
 */
try {
  var enzyme = require("enzyme");
  var Adapter = require("enzyme-adapter-react-16");
  enzyme.configure({ adapter: new Adapter() });
} catch (err) {
  //
}
/*
 * We need a global sinon to maintain compatibility
 * with existing test suites. However, this will be
 * removed in the future and is being tracked by
 * https://gecgithub01.walmart.com/electrode/electrode-archetype-react-component/issues/10
 */
try {
  var sinon = require("sinon");
  window.sinon = sinon;
} catch (err) {
  //
}

// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports

try {
  var chai = require("chai");
  window.expect = chai.expect;

  try {
    var sinonChai = require("sinon-chai");
    chai.use(sinonChai);
  } catch (err) {
    //
  }

  try {
    var chaiShallowly = require("chai-shallowly");
    chai.use(chaiShallowly);
  } catch (err) {
    //
  }
} catch (err) {
  //
}

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
// NOTE: No need to specify src even in src mode since webpack should handle that already
var srcReq = require.context("client", true, /^((?!app).)(!(spec|test))*\.(jsx|js)?$/);
srcReq.keys().map(srcReq);

// Use webpack to infer and `require` tests automatically only for test/client
var testsReq = require.context("test/client", true, /\.spec.jsx?$/);
testsReq.keys().map(testsReq);

// Only start mocha in browser.
if (!window.__karma__) {
  window.mocha.run();
}
