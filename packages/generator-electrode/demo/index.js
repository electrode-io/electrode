'use strict';

/* eslint-disable arrow-parens */

var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var extend = _.merge;
var parseAuthor = require('parse-author');
var githubUsername = require('github-username');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.packageName = this.options.packageName || "demo-app";
    this.developerName = this.options.developerName || "demoDeveloper";
    this.className = this.options.className;
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    if (this.pkg.keywords) {
      this.pkg.keywords = this.pkg.keywords.filter((x) => x);
    }

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
      this.props.createDirectory = false;
      this.props.pwa = this.fs.exists(this.destinationPath('client/sw-registration.js'));
      this.props.autoSsr = this.fs.exists(this.destinationPath('server/plugins/autossr.js'));
      this.props.quoteType = this.fs.exists(this.destinationPath('.eslintrc')) ? "'" : "\"";
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
    this.props.serverType = this.serverType || "HapiJS";
    this.props.githubUrl = this.githubUrl;
  },

  writing: function () {
    //@TODO: while writing check to see if the demo App/ already exists
    // if so, we only need to edit the package.json to add and point to the new package
    // Also, update the home.jsx to use the new package.


    var newRoot = this.destinationPath() + '/' + _.kebabCase(_.deburr(this.packageName)) + "-demo-app";
    this.destinationRoot(newRoot);
    this.template("_package.json", "package.json");

    const rootConfigsToCopy = ['gulpfile.js', 'config', 'test', 'archetype'];
    rootConfigsToCopy.forEach((f) => {
      this.template(
        this.templatePath(f),
        this.destinationPath(f)
      );
    });

    //special handling for the server file
    this.fs.copyTpl(
      this.templatePath('src/server'),
      this.destinationPath('src/server')
    );

    this.fs.copyTpl(
      this.templatePath('src/client'),
      this.destinationPath('src/client'),
      {},
      {}, // template options
      { // copy options
        globOptions: {
          // Images are damaged by the template compiler
          ignore: ['**/client/images/**', '**/client/components/home.jsx']
        }
      }
    );

    this.template("src/client/components/home.jsx", "src/client/components/home.jsx");

    ['src/client', 'src/server', 'test/client', 'test/server'].forEach((d) => {
      this.fs.move(this.destinationPath(d + '/babelrc'), this.destinationPath(d + '/.babelrc'));
    });

    ['test/client', 'test/server'].forEach((d) => {
      this.fs.move(this.destinationPath(d + '/eslintrc'), this.destinationPath(d + '/.eslintrc'));
    });

    this.fs.copy(
      this.templatePath('src/client/images'),
      this.destinationPath('src/client/images')
    );
  },

  install: function () {
    if (!this.isExtended) {
      this.installDependencies({
        bower: false
      });
    }
  },

  end: function () {
    if (this.props.quoteType === "'") {
      this.spawnCommandSync("node_modules/.bin/eslint", ["--fix", "src", "test", "config", "--ext", ".js,.jsx"]);
    }

    var chdir = this.props.createDirectory ? "'cd " + _.kebabCase(_.deburr(this.props.name)) + "' then " : "";
    this.log(
      "\n" + chalk.green.underline("Your new Electrode Demo application is ready!") +
      "\n" +
      "\nType " + chdir + "'gulp dev' to start the server." +
      "\n"
    );
  }
});
