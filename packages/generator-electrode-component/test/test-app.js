/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require("yeoman-assert");
var helpers = require("yeoman-test");
var os = require('os');

describe('react:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        projectName: "electrode-component"
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      "gulpfile.js"
    ]);
  });
});
