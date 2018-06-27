"use strict";
const mockery = require("mockery");
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const Promise = require("pinkie-promise");

describe("electrode:app", function() {
  this.timeout(10000);
  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock("npm-name", function() {
      return Promise.resolve(true);
    });

    mockery.registerMock("github-username", function() {
      return Promise.resolve("unicornUser");
    });

    mockery.registerMock(require.resolve("generator-license/app"), helpers.createDummyGenerator());
  });

  after(function() {
    mockery.disable();
  });

  describe("running on new project", function() {
    before(function() {
      this.answers = {
        name: "generator-electrode",
        description: "Electrode app generator",
        homepage: "http://electrode.io",
        githubAccount: "electrode-io",
        authorName: "Electrode",
        authorEmail: "hi@electrode.io",
        authorUrl: "http://electrode.io",
        keywords: ["foo", "bar"]
      };
      return helpers.run(path.resolve("generators/app")).withPrompts(this.answers).toPromise();
    });

    it("creates files", function() {
      assert.file([".travis.yml", ".editorconfig", ".gitignore", ".gitattributes", "README.md"]);
    });

    it("creates package.json", function() {
      assert.file("package.json");
      assert.jsonFileContent("package.json", {
        name: "generator-electrode",
        version: "0.0.1",
        description: this.answers.description,
        homepage: this.answers.homepage,
        repository: { url: "electrode-io/generator-electrode" },
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail,
          url: this.answers.authorUrl
        },
        files: [],
        keywords: this.answers.keywords,
        main: "lib/server/index.js"
      });
    });

    it("creates and fill contents in README.md", function() {
      assert.file("README.md");
      assert.fileContent("README.md", "var generatorElectrode = require('generator-electrode');");
      assert.fileContent("README.md", "> Electrode app generator");
      assert.fileContent("README.md", "$ npm install --save generator-electrode");
      assert.fileContent("README.md", "© [Electrode](http://electrode.io)");
      assert.fileContent(
        "README.md",
        "[travis-image]: https://travis-ci.org/electrode-io/generator-electrode.svg?branch=master"
      );
    });

    it("creates and fills the pageTitle field in config/default.js", function() {
      assert.file("./config/default.js");
      assert.fileContent("./config/default.js", `pageTitle: "generator-electrode"`);
    });
  });
});
