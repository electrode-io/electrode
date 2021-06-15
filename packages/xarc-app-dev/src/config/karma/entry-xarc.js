/* eslint-disable */
"use strict";

/**
 * All requires in this file will be processed by webpack, which is unforgiving
 * about missing dependencies and will generate hard module not found errors,
 * and try/catch doesn't work.  Further, these module not found issues could
 * cause very weird and unexpected errors from webpack.
 */

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
var enzyme = require("@xarc/opt-karma/lib/enzyme");
var Adapter = require("@xarc/opt-karma/lib/enzyme-adapter-react-16");
enzyme.configure({ adapter: new Adapter() });

/*
 * We need a global sinon to maintain compatibility
 * with existing test suites. However, this will be
 * removed in the future.
 */
var sinon = require("@xarc/opt-karma/lib/sinon");
window.sinon = sinon;

// --------------------------------------------------------------------------
// Chai / Sinon / Mocha configuration.
// --------------------------------------------------------------------------
// Exports
var chai = require("@xarc/opt-karma/lib/chai");
window.expect = chai.expect;

var sinonChai = require("@xarc/opt-karma/lib/sinon-chai");
chai.use(sinonChai);

var chaiShallowly = require("@xarc/opt-karma/lib/chai-shallowly");
chai.use(chaiShallowly);

// Mocha (part of static include).
window.mocha.setup({
  ui: "bdd",
  bail: false,
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
//# fynSourceMap=false
