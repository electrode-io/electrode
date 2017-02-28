"use strict";

var _ = require("lodash");
var chalk = require("chalk");
var yeoman = require("yeoman-generator");
var path = require('path');
var extend = _.merge;
var parseAuthor = require('parse-author');

var ReactComponentGenerator = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
  },
  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      packageName: this.pkg.name
    };

    if (_.isObject(this.pkg.author)) {
      this.props.developerName = this.pkg.author.name;
      this.props.createDirectory = true;
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.developerName = info.name;
    }
  },
  prompting: {
    greeting: function () {
      this.log(
        "\n" + chalk.bold.underline("Welcome to the Electrode Component Generator") +
        "\n" +
        "\nWe're going to set up a new " + chalk.bold("Electrode") + " component, ready for development with" +
        "\n" + chalk.bold("gulp, webpack, demo, electrode component archetype, and live-reload")
      );
    },
    askFor: function () {
      if (this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
      }
      var prompts = [{
        type: "input",
        name: "projectName",
        message: "What is your Package/GitHub project name? (e.g., 'wysiwyg-component')",
        default: "wysiwyg-component"
      },
      {
        type: "input",
        name: "packageName",
        message: "What is the ClassName for your component?",
        default: this.props.componentName
      }, {
        type: "input",
        name: "packageName",
        message: "What will be the npm package name?",
        default: this.props.packageName
      }, {
        type: "input",
        name: "packageGitHubOrg",
        message: "What will be the GitHub organization username (e.g., 'walmartlabs')?",
        default: this.props.packageGitHubOrg
      }, {
        type: "input",
        name: "developerName",
        message: "What is your name? (for copyright notice, etc.)",
        default: this.props.developerName
      },
      {
        type: "input",
        name: "ghUser",
        message: "What is your GitHub Username?",
        default: this.props.developerName
      }, {
        type: "confirm",
        name: "createDirectory",
        message: "Would you like to create a new directory for your project?",
        default: true
      }];
      return this.prompt(prompts).then((props) => {
        this.props = extend(this.props, props);
        this.projectName = this.props.projectName;
        this.packageName = _.kebabCase(_.deburr(this.props.projectName));
        this.developerName = this.props.developerName.split(" ").map(_.toLower).join("");
        this.ghUser = this.props.ghUser;
        this.packageGitHubOrg = this.props.packageGitHubOrg;
        this.createDirectory = this.props.createDirectory;
        this.componentName = this.props.packageName
          .replace(/^\s+|\s+$/g, "")
          .replace(/(^|[-_ ])+(.)/g, function (match, first, second) {
            return second.toUpperCase();
          });
        this.currentYear = new Date().getFullYear();
        if (this.props.createDirectory) {
          var newRoot = this.destinationPath() + '/' + this.packageName;
          this.destinationRoot(newRoot);
        }
      });
    }
  },

  writing: {
    project: function () {
      this.copy("babelrc", ".babelrc");
      this.copy("gitignore", ".gitignore");
      this.copy("npmignore", ".npmignore");
      this.copy("editorconfig", ".editorconfig");
      this.template("_gulpfile.js", "gulpfile.js");
      this.template("_package.json", "package.json");
      this.template("_readme.md", "README.md");
    },
    component: function () {
      this.template("src/components/_component.jsx", "src/components/" + this.projectName + ".jsx");
      this.template("src/styles/_component.css", "src/styles/" + this.projectName + ".css");

      // l10n language templates
      this.template("src/lang/_DefaultMessages.js", "src/lang/default-messages.js");
      this.template("src/lang/_en.json", "src/lang/en.json");
      this.template("src/lang/tenants/electrodeio/_defaultMessages.js", "src/lang/tenants/electrodeio/default-messages.js");

      this.template("src/_Component.js", "src/index.js");
    },
    test: function () {
      this.copy("test/client/eslintrc", "test/client/.eslintrc");
      this.template("test/client/components/_component.spec.jsx", "test/client/components/" + this.projectName + ".spec.jsx");
      this.copy("test/client/components/helpers/_intlEnzymeTestHelper.js", "test/client/components/helpers/intl-enzyme-test-helper.js");
    },
    demo: function () {
      this.template("demo/_demo.jsx", "demo/demo.jsx");
      this.template("demo/_demo.css", "demo/demo.css");
      this.template("demo/examples/_component.example", "demo/examples/" + this.projectName + ".example");
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    var chdir = this.createDirectory ? "'cd " + this.packageName + "' then " : "";
    this.log(
      "\n" + chalk.green.underline("Your new Electrode component is ready!") +
      "\n" +
      "\nYour component is in src/ and your demo files are in demo/" +
      "\n" +
      "\nType " + chdir + "'gulp demo' to run the development build and demo tasks." +
      "\n"
    );
  }

});

module.exports = ReactComponentGenerator;
