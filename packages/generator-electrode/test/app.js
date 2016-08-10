'use strict';
var mockery = require('mockery');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var Promise = require('pinkie-promise');

describe('electrode:app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('npm-name', function () {
      return Promise.resolve(true);
    });

    mockery.registerMock('github-username', function (name, cb) {
      cb(null, 'unicornUser');
    });

    mockery.registerMock(
      require.resolve('generator-license/app'),
      helpers.createDummyGenerator()
    );
  });

  after(function () {
    mockery.disable();
  });

  describe('running on new project', function () {
    before(function () {
      this.answers = {
        name: 'generator-electrode',
        description: 'Electrode app generator',
        homepage: 'http://electrode.io',
        githubAccount: 'electrode-io',
        authorName: 'Electrode',
        authorEmail: 'hi@electrode.io',
        authorUrl: 'http://electrode.io',
        keywords: ['foo', 'bar']
      };
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts(this.answers)
        .toPromise();
    });

    it('creates files', function () {
      assert.file([
        '.travis.yml',
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        'README.md'
      ]);
    });

    it('creates package.json', function () {
      assert.file('package.json');
      assert.jsonFileContent('package.json', {
        name: 'generator-electrode',
        version: '0.0.0',
        description: this.answers.description,
        homepage: this.answers.homepage,
        repository: {url: 'electrode-io/generator-electrode'},
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail,
          url: this.answers.authorUrl
        },
        files: [],
        keywords: this.answers.keywords,
        main: 'lib/index.js'
      });
    });

    it('creates and fill contents in README.md', function () {
      assert.file('README.md');
      assert.fileContent('README.md', 'var generatorElectrode = require(\'generator-electrode\');');
      assert.fileContent('README.md', '> Electrode app generator');
      assert.fileContent('README.md', '$ npm install --save generator-electrode');
      assert.fileContent('README.md', '© [Electrode](http://electrode.io)');
      assert.fileContent('README.md', '[travis-image]: https://travis-ci.org/electrode-io/generator-electrode.svg?branch=master');
    });
  });
});
