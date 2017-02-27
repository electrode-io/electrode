"use strict";

var _ = require("lodash");
var chalk = require("chalk");
var yeoman = require("yeoman-generator");
var optionOrPrompt = require("yeoman-option-or-prompt");

var ReactComponentGenerator = yeoman.generators.Base.extend({
	_optionOrPrompt: optionOrPrompt,

	initializing: function() {
		this.pkg = require("../package.json");
	},

	prompting_init: function() {
		var done = this.async();

		this.log(
			"\n" + chalk.bold.underline("Welcome to the Electrode Component Generator") +
			"\n" +
			"\nWe're going to set up a new " + chalk.bold("Electrode") + " component, ready for development with" +
			"\n" + chalk.bold("gulp, webpack, demo, electrode component archetype, and live-reload") +
			"\n"
		);

		var prompts = [{
			type: "input",
			name: "projectName",
			message: "What is your Package/GitHub project name? (e.g., 'wysiwyg-component')",
			default: "wysiwyg-component"
		}];

		this._optionOrPrompt(prompts, function (props) {
			_.extend(this, props);
			this.packageName = _.kebabCase(_.deburr(this.projectName));
			this.componentName = this.packageName
        .replace(/^\s+|\s+$/g, "")
        .replace(/(^|[-_ ])+(.)/g, function (match, first, second) {
          return second.toUpperCase();
        });
			this.currentYear = new Date().getFullYear();
			done();
		}.bind(this));
	},

	prompting_names: function() {
		var done = this.async();

		var prompts = [{
			type: "input",
			name: "packageName",
			message: "What is the ClassName for your component?",
			default: this.componentName
		}, {
			type: "input",
			name: "packageName",
			message: "What will be the npm package name?",
			default: this.packageName
		},  {
			type: "input",
			name: "packageGitHubOrg",
			message: "What will be the GitHub organization username (e.g., 'walmartlabs')?",
			default: this.packageGitHubOrg
		}, {
			type: "input",
			name: "developerName",
			message: "What is your name? (for copyright notice, etc.)"
		}, {
			type: "list",
			name: "quoteType",
			message: "Use double quotes or single quotes?",
			choices: ["\"", "'"],
			default: "\""
		}];

		this._optionOrPrompt(prompts, function (props) {
			_.extend(this, props);
			done();
		}.bind(this));
	},

	prompting_libraries: function() {
		var done = this.async();

		var prompts = [];

		this._optionOrPrompt(prompts, function (props) {
			_.extend(this, props);
			done();
		}.bind(this));
	},

	prompting_project: function() {
		var done = this.async();

		var prompts = [{
			type: "input",
			name: "ghUser",
			message: "What is your GitHub Username?",
			default: this.developerName.split(" ").map(_.toLower).join("")
		}, {
			type: "confirm",
			name: "createDirectory",
			message: "Would you like to create a new directory for your project?",
			default: true
		}];

		this._optionOrPrompt(prompts, function (props) {
			_.extend(this, props);
			if (props.createDirectory) {
				this.destinationRoot(this.packageName);
			}
			this.log("\n");
			done();
		}.bind(this));
	},

	writing: {
		project: function() {
			this.copy("babelrc", ".babelrc");
			this.copy("gitignore", ".gitignore");
			this.copy("npmignore", ".npmignore");
			this.copy("editorconfig", ".editorconfig");
			if (this.quoteType === "'") {
				this.template("eslintrc", ".eslintrc");
			}
			this.template("_gulpfile.js", "gulpfile.js");
			this.template("_package.json", "package.json");
			this.template("_readme.md", "README.md");
		},
		component: function() {
			this.template("src/components/_component.jsx", "src/components/" + this.projectName + ".jsx");
			this.template("src/styles/_component.css", "src/styles/" + this.projectName + ".css");

			// l10n language templates
			this.template("src/lang/_DefaultMessages.js", "src/lang/default-messages.js");
			this.template("src/lang/_en.json", "src/lang/en.json");
			this.template("src/lang/tenants/electrodeio/_defaultMessages.js", "src/lang/tenants/electrodeio/default-messages.js");
			
			this.template("src/_Component.js", "src/index.js");
		},
		test: function() {
			this.template("test/client/eslintrc", "test/client/.eslintrc");
			this.template("test/client/components/_component.spec.jsx", "test/client/components/" + this.projectName + ".spec.jsx");
			this.copy("test/client/components/helpers/_intlEnzymeTestHelper.js", "test/client/components/helpers/intl-enzyme-test-helper.js");
		},
		demo: function() {
			this.template("demo/_demo.jsx", "demo/demo.jsx");
			this.template("demo/_demo.css", "demo/demo.css");
			this.template("demo/examples/_component.example", "demo/examples/" + this.projectName + ".example");
		}
	},

	install: function() {
		this.npmInstall();
	},

	end: function() {
		if (this.quoteType === "'") {
			this.spawnCommandSync("node_modules/.bin/eslint", ["--fix", "src", "demo", "example", "test", "--ext", ".js,.jsx"]);
		}
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
