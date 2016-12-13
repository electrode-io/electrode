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

    this.option('travis', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include travis config'
    });

    this.option('license', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include a license'
    });

    this.option('name', {
      type: String,
      required: false,
      desc: 'Project name'
    });

    this.option('githubAccount', {
      type: String,
      required: false,
      desc: 'GitHub username or organization'
    });

    this.option('projectRoot', {
      type: String,
      required: false,
      defaults: 'server',
      desc: 'Relative path to the project code root'
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert in the README.md file'
    });
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
      this.props.serverType = this.fs.exists(this.destinationPath('server/express-server.js')) ? "expressjs" : "hapijs";
      this.props.pwa = this.fs.exists(this.destinationPath('client/sw-register.js'));
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  },

  prompting: {
    greeting: function () {
      this.log(yosay(
        'Welcome to the phenomenal ' + chalk.red('Electrode App') + ' generator!'
      ));
    },

    askFor: function () {
      if (this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
      }

      var prompts = [
        {
          type: "input",
          name: 'name',
          message: 'Application Name',
          when: !this.props.name,
          default: path.basename(process.cwd())
        },
        {
          type: "input",
          name: 'description',
          message: 'Description',
          when: !this.props.description
        },
        {
          type: "input",
          name: 'homepage',
          message: 'Project homepage url',
          when: !this.props.homepage
        },
        {
          type: 'list',
          name: 'serverType',
          message: 'Which framework for the server?',
          when: !this.props.serverType,
          choices: ['HapiJS', "ExpressJS"],
          default: 'HapiJS',
          filter: function(ans) {
            return ans.toLowerCase();
          }
        },
        {
          type: "input",
          name: 'authorName',
          message: 'Author\'s Name',
          when: !this.props.authorName,
          default: this.user.git.name(),
          store: true
        },
        {
          type: "input",
          name: 'authorEmail',
          message: 'Author\'s Email',
          when: !this.props.authorEmail,
          default: this.user.git.email(),
          store: true
        },
        {
          type: "input",
          name: 'authorUrl',
          message: 'Author\'s Homepage',
          when: !this.props.authorUrl,
          store: true
        },
        {
          type: "input",
          name: 'keywords',
          message: 'Package keywords (comma to split)',
          when: _.isEmpty(this.pkg.keywords),
          filter: function (words) {
            return words.split(/\s*,\s*/g).filter((x) => x);
          }
        },
        {
          type: "confirm",
          name: "pwa",
          message: "Would you like to make a Progressive Web App?",
          when: this.props.pwa === undefined,
          default: true
        },
        {
          type: "confirm",
          name: "createDirectory",
          message: "Would you like to create a new directory for your project?",
          when: this.props.createDirectory === undefined,
          default: true
        }
      ];

      return this.prompt(prompts).then((props) => {
        this.props = extend(this.props, props);
        if (this.props.createDirectory) {
          var newRoot = this.destinationPath() + '/' + _.kebabCase(_.deburr(this.props.name));
          this.destinationRoot(newRoot);
        }
        // saving to storage after the correct destination root is set
        this.config.set('serverType', this.props.serverType);
      });
    },

    askForGithubAccount: function () {
      if (this.options.githubAccount) {
        this.props.githubAccount = this.options.githubAccount;
        return;
      }
      var done = this.async();

      githubUsername(this.props.authorEmail, (err, username) => {
        if (err) {
          username = username || '';
        }
        this.prompt({
          name: 'githubAccount',
          message: 'GitHub username or organization',
          default: username
        }).then((prompt) => {
          this.props.githubAccount = prompt.githubAccount;
          done();
        });
      });
    }
  },

  writing: function () {
    // Re-read the content at this point because a composed generator might modify it.
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    var defaultPkg = require(this.templatePath('_package.json'));

    ['name', 'version', 'description', 'homepage', 'main', 'license'].forEach((x) => {
      currentPkg[x] = currentPkg[x] || undefined;
    });

    var updatePkg = _.defaultsDeep(currentPkg, {
      name: _.kebabCase(this.props.name),
      version: '0.0.1',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [
        this.options.projectRoot
      ],
      main: path.join(
        this.options.projectRoot,
        'index.js'
      ).replace(/\\/g, '/'),
      keywords: []
    });

    var pkg = extend({}, defaultPkg, updatePkg);

    // Combine the keywords
    if (this.props.keywords) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords)).filter((x) => x);
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );

    ['gulpfile.js','config', 'test'].forEach((f) => {
      this.fs.copy(
        this.templatePath(f),
        this.destinationPath(f)
      );
    });
      //special handling for the server file
      const isHapi = this.config.get('serverType') === 'hapijs';
      this.fs.copyTpl(
        this.templatePath('server'),
        this.destinationPath('server'),
        {isHapi},
        {},
        {
          globOptions: { ignore: [ isHapi ? '**/server/express-server.js' : '' ] }
        }
      );

    this.fs.copyTpl(
      this.templatePath('client'),
      this.destinationPath('client'),
      { pwa: this.props.pwa },
      {}, // template options
      { // copy options
        globOptions: {
          // Images are damaged by the template compiler
          ignore: ['**/client/images/**', !this.props.pwa && '**/client/sw-register.js' || '']
        }
      }
    );

    this.fs.copy(
      this.templatePath('client/images'),
      this.destinationPath('client/images')
    );
  },

  default: function () {
    if (this.options.travis) {
      this.composeWith('travis', {}, {
        local: require.resolve('generator-travis/generators/app')
      });
    }

    this.composeWith('electrode:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });

    this.composeWith('electrode:git', {
      options: {
        name: this.props.name,
        githubAccount: this.props.githubAccount
      }
    }, {
      local: require.resolve('../git')
    });

    if (this.options.license && !this.pkg.license) {
      this.composeWith('license', {
        options: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          website: this.props.authorUrl
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    }

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith('electrode:readme', {
        options: {
          name: this.props.name,
          description: this.props.description,
          githubAccount: this.props.githubAccount,
          authorName: this.props.authorName,
          authorUrl: this.props.authorUrl,
          content: this.options.readme
        }
      }, {
        local: require.resolve('../readme')
      });
    }

    if (!this.fs.exists(this.destinationPath('config/default.js'))) {
      this.composeWith('electrode:config', {
        options: {
          name: this.props.name,
          pwa: this.props.pwa,
          serverType: this.props.serverType
        }
      }, {
        local: require.resolve('../config')
      });
    }

    if (!this.fs.exists(this.destinationPath('server/plugins/webapp'))) {
      this.composeWith('electrode:webapp', {
        options: {
          pwa: this.props.pwa
        }
      }, {
        local: require.resolve('../webapp')
      });
    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  },

  end: function() {
    var chdir = this.props.createDirectory ? "'cd " + _.kebabCase(_.deburr(this.props.name)) + "' then " : "";
    this.log(
      "\n" + chalk.green.underline("Your new Electrode application is ready!") +
      "\n" +
      "\nType " + chdir + "'gulp dev' to start the server." +
      "\n"
    );
  }
});
