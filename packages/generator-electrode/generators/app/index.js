"use strict";

/* eslint-disable arrow-parens */

var generators = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var path = require("path");
var _ = require("lodash");
var extend = _.merge;
var parseAuthor = require("parse-author");
var githubUsername = require("github-username");
var demoHelperPath = require.resolve("electrode-demo-helper");

const ExpressJS = "ExpressJS";
const HapiJS = "HapiJS";
const KoaJS = "KoaJS";
const pkg = require("../../package.json");

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.log(chalk.green("Yeoman Electrode App generator version"), pkg.version);
    this.log("Loaded from", chalk.magenta(path.dirname(require.resolve("../../package.json"))));

    this.option("travis", {
      type: Boolean,
      required: false,
      defaults: true,
      desc: "Include travis config"
    });

    this.option("license", {
      type: Boolean,
      required: false,
      defaults: true,
      desc: "Include a license"
    });

    this.option("name", {
      type: String,
      required: false,
      desc: "Project name"
    });

    this.option("githubAccount", {
      type: String,
      required: false,
      desc: "GitHub username or organization"
    });

    this.option("projectRoot", {
      type: String,
      required: false,
      defaults: "server",
      desc: "Relative path to the project code root"
    });

    this.option("readme", {
      type: String,
      required: false,
      desc: "Content to insert in the README.md file"
    });

    this.isDemoApp = this.options.isDemoApp || false;
    //data should be passed to the generator using props
    this.props = this.options.props || {};
    //Flag to check if the OSS generator is being called as a subgenerator
    this.isExtended = this.props.isExtended || false;
  },

  initializing: function() {
    this.pkg = this.fs.readJSON(this.destinationPath("package.json"), {});

    if (this.pkg.keywords) {
      this.pkg.keywords = this.pkg.keywords.filter(x => x);
    }

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
      this.props.createDirectory = false;
      this.props.serverType = this.fs.exists(this.destinationPath("src/server/express-server.js"))
        ? ExpressJS
        : this.fs.exists(this.destinationPath("src/server/koa-server.js")) ? KoaJS : HapiJS;
      this.props.pwa = this.fs.exists(this.destinationPath("client/sw-registration.js"));
      this.props.autoSsr = this.fs.exists(this.destinationPath("server/plugins/autossr.js"));
      this.props.quoteType = this.fs.exists(this.destinationPath(".eslintrc")) ? "'" : '"';
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
    // Pre set the default props from the information we have at this point
    this.props = extend(
      {
        name: this.pkg.name,
        description: this.pkg.description,
        version: this.pkg.version,
        homepage: this.pkg.homepage
      },
      this.props
    );
  },

  prompting: {
    greeting: function() {
      if (!this.isDemoApp) {
        this.log(yosay("Welcome to the phenomenal " + chalk.red("Electrode App") + " generator!"));
      }
    },

    askFor: function() {
      if (this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
      }

      var prompts = [
        {
          type: "input",
          name: "name",
          message: "Application Name",
          when: !this.props.name,
          default: path.basename(process.cwd())
        },
        {
          type: "input",
          name: "description",
          message: "Description",
          when: !this.props.description
        },
        {
          type: "input",
          name: "homepage",
          message: "Project homepage url",
          when: !this.props.homepage
        },
        {
          type: "list",
          name: "serverType",
          message: "Which framework for the server?",
          when: !this.props.serverType,
          choices: [HapiJS, ExpressJS, KoaJS],
          default: HapiJS
        },
        {
          type: "input",
          name: "authorName",
          message: "Author's Name",
          when: !this.props.authorName,
          default: this.user.git.name(),
          store: true
        },
        {
          type: "input",
          name: "authorEmail",
          message: "Author's Email",
          when: !this.props.authorEmail,
          default: this.user.git.email(),
          store: true
        },
        {
          type: "input",
          name: "authorUrl",
          message: "Author's Homepage",
          when: !this.props.authorUrl,
          store: true
        },
        {
          type: "input",
          name: "keywords",
          message: "Package keywords (comma to split)",
          when: _.isEmpty(this.pkg.keywords) && _.isEmpty(this.props.keywords),
          filter: function(words) {
            return words.split(/\s*,\s*/g).filter(x => x);
          }
        },
        {
          type: "confirm",
          name: "pwa",
          message: "Would you like to make a Progressive Web App?",
          when: this.props.pwa === undefined,
          default: false
        },
        {
          type: "confirm",
          name: "autoSsr",
          message: "Support disabling server side rendering based on high load?",
          when: this.props.autoSsr === undefined,
          default: false
        },
        {
          type: "list",
          name: "quoteType",
          message: "Use double quotes or single quotes?",
          choices: ['"', "'"],
          when: !this.props.quoteType,
          default: '"'
        },
        {
          type: "confirm",
          name: "createDirectory",
          message: "Would you like to create a new directory for your project?",
          when: this.props.createDirectory === undefined,
          default: true
        }
      ];

      return this.prompt(prompts).then(props => {
        this.props = extend(this.props, props);
        if (this.props.createDirectory) {
          var newRoot = this.destinationPath() + "/" + _.kebabCase(_.deburr(this.props.name));
          this.destinationRoot(newRoot);
        }
        // saving to storage after the correct destination root is set
        this.config.set("serverType", this.props.serverType);
      });
    },

    askForGithubAccount: function() {
      if (this.props.githubAccount || this.options.githubAccount) {
        this.props.githubAccount = this.options.githubAccount;
        return;
      }
      var done = this.async();

      githubUsername(this.props.authorEmail, (err, username) => {
        if (err) {
          username = username || "";
        }
        this.prompt({
          name: "githubAccount",
          message: "GitHub username or organization",
          default: username
        }).then(prompt => {
          this.props.githubAccount = prompt.githubAccount;
          done();
        });
      });
    }
  },

  writing: function() {
    const isHapi = this.config.get("serverType") === HapiJS;
    const isExpress = this.config.get("serverType") === ExpressJS;
    const isPWA = this.props.pwa;
    const isAutoSSR = this.props.autoSsr;
    const isSingleQuote = this.props.quoteType === "'";
    const className = this.props.className;
    const packageName = this.props.packageName;

    let getDemoFilePath = function(filepath) {
      try {
        let demoFilePath = path.resolve(demoHelperPath, "..", filepath);
        return demoFilePath;
      } catch (e) {
        console.log(e);
      }
    };

    let ignoreArray = [];
    if (isHapi) {
      ignoreArray.push("**/src/server/express-server.js");
      ignoreArray.push("**/src/server/koa-server.js");
    } else if (isExpress) {
      ignoreArray.push("**/src/server/koa-server.js");
    } else {
      ignoreArray.push("**/src/server/express-server.js");
    }

    // Re-read the content at this point because a composed generator might modify it.
    var currentPkg = this.fs.readJSON(this.destinationPath("package.json"), {});

    const _pkg = "_package.json";

    this.fs.copyTpl(this.templatePath(_pkg), this.destinationPath(_pkg), {
      isHapi,
      isExpress,
      isPWA,
      isAutoSSR
    });

    var defaultPkg = this.fs.readJSON(this.destinationPath(_pkg));
    this.fs.delete(this.destinationPath(_pkg));

    ["name", "version", "description", "homepage", "main", "license"].forEach(x => {
      currentPkg[x] = currentPkg[x] || undefined;
    });

    var packageContents = {
      name: _.kebabCase(this.props.name),
      version: "0.0.1",
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [this.options.projectRoot],
      main: path.posix.join("lib", this.options.projectRoot, "index.js"),
      keywords: []
    };
    if (this.isDemoApp) {
      packageContents.dependencies = {};
      packageContents.dependencies[this.props.packageName] =
        "../packages/" + this.props.packageName;
    }

    var updatePkg = _.defaultsDeep(currentPkg, packageContents);

    var pkg = extend({}, defaultPkg, updatePkg);

    // Combine the keywords
    if (this.props.keywords) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords)).filter(x => x);
    }

    const sortDep = dep => {
      if (typeof pkg[dep] === "object") {
        pkg[dep] = _.pick(pkg[dep], Object.keys(pkg[dep]).sort());
      }
    };

    ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].forEach(
      sortDep
    );

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath("package.json"), pkg);

    const rootConfigsToCopy = ["xclap.js", "config", "test"];
    if (isSingleQuote) rootConfigsToCopy.push(".eslintrc");
    rootConfigsToCopy.forEach(f => {
      this.fs.copyTpl(this.templatePath(f), this.destinationPath(f), { isSingleQuote });
    });

    if (this.isExtended) {
      this.fs.delete(this.destinationPath("config/default.js"));
    }

    //copy .eslintc into the client directory
    if (isSingleQuote) {
      this.template("src/client/.eslintrc", this.destinationPath("src/client/.eslintrc"));
    }
    //special handling for the server file
    this.fs.copyTpl(
      this.templatePath("src/server"),
      this.destinationPath("src/server"),
      { isHapi, isExpress },
      {},
      {
        globOptions: {
          ignore: ignoreArray
        }
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/client"),
      this.destinationPath("src/client"),
      { pwa: isPWA },
      {}, // template options
      {
        // copy options
        globOptions: {
          // Images are damaged by the template compiler
          ignore: [
            "**/client/images/**",
            (!isPWA && "**/client/sw-registration.js") || "",
            (this.isDemoApp && "**/client/components/**") || "",
            (this.isDemoApp && "**/client/actions/**") || "",
            (this.isDemoApp && "**/client/reducers/**") || ""
          ]
        }
      }
    );

    ["src/client", "src/server", "test/client", "test/server"].forEach(d => {
      this.fs.move(this.destinationPath(d + "/babelrc"), this.destinationPath(d + "/.babelrc"));
    });

    ["test/client", "test/server"].forEach(d => {
      this.fs.move(this.destinationPath(d + "/eslintrc"), this.destinationPath(d + "/.eslintrc"));
    });

    this.fs.copy(this.templatePath("src/client/images"), this.destinationPath("src/client/images"));

    //copy files from the demoHelper if this is the demo-app
    if (this.isDemoApp) {
      //copy archetype webpack config extension
      this.fs.copyTpl(
        this.templatePath(getDemoFilePath("archetype")),
        this.destinationPath("archetype"),
        { components: [packageName] }
      );

      //copy home file
      this.fs.copyTpl(
        this.templatePath(getDemoFilePath("src/client/components/Home.jsx")),
        this.destinationPath("src/client/components/home.jsx"),
        { className, packageName, pwa: isPWA }
      );

      //copy reducer file
      this.fs.copyTpl(
        this.templatePath(getDemoFilePath("src/client/reducers/index.js")),
        this.destinationPath("src/client/reducers/index.jsx")
      );

      //copy actions file
      this.fs.copyTpl(
        this.templatePath(getDemoFilePath("src/client/actions/index.js")),
        this.destinationPath("src/client/actions/index.jsx")
      );
    }
  },

  default: function() {
    if (this.options.travis) {
      this.composeWith(
        "travis",
        {},
        {
          local: require.resolve("generator-travis/generators/app")
        }
      );
    }

    this.composeWith(
      "electrode:editorconfig",
      {},
      {
        local: require.resolve("../editorconfig")
      }
    );
    if (!this.isDemoApp) {
      this.composeWith(
        "electrode:git",
        {
          options: {
            name: this.props.name,
            githubAccount: this.props.githubAccount,
            githubUrl: this.props.githubUrl
          }
        },
        {
          local: require.resolve("../git")
        }
      );
    }

    if (this.options.license && !this.pkg.license) {
      this.composeWith(
        "license",
        {
          options: {
            name: this.props.authorName,
            email: this.props.authorEmail,
            website: this.props.authorUrl,
            license: this.props.license || ""
          }
        },
        {
          local: require.resolve("generator-license/app")
        }
      );
    }

    if (!this.fs.exists(this.destinationPath("README.md"))) {
      this.composeWith(
        "electrode:readme",
        {
          options: {
            name: this.props.name,
            description: this.props.description,
            githubAccount: this.props.githubAccount,
            authorName: this.props.authorName,
            authorUrl: this.props.authorUrl,
            content: this.options.readme
          }
        },
        {
          local: require.resolve("../readme")
        }
      );
    }

    if (!this.fs.exists(this.destinationPath("config/default.js")) && !this.isExtended) {
      this.composeWith(
        "electrode:config",
        {
          options: {
            name: this.props.name,
            pwa: this.props.pwa,
            serverType: this.props.serverType,
            isAutoSsr: this.props.autoSsr
          }
        },
        {
          local: require.resolve("../config")
        }
      );
    }

    if (!this.fs.exists(this.destinationPath("server/plugins/webapp"))) {
      this.composeWith(
        "electrode:webapp",
        {
          options: {
            pwa: this.props.pwa,
            isAutoSsr: this.props.autoSsr
          }
        },
        {
          local: require.resolve("../webapp")
        }
      );
    }
  },

  install: function() {
    if (!this.isExtended && !this.isDemoApp) {
      this.installDependencies({
        bower: false
      });
    }
  },

  end: function() {
    if (this.props.quoteType === "'") {
      this.spawnCommandSync("node_modules/.bin/eslint", [
        "--fix",
        "src",
        "test",
        "config",
        "--ext",
        ".js,.jsx"
      ]);
    }

    if (!this.isDemoApp) {
      var chdir = this.props.createDirectory
        ? "'cd " + _.kebabCase(_.deburr(this.props.name)) + "' then "
        : "";
      this.log(
        "\n" +
          chalk.green.underline("Your new Electrode application is ready!") +
          "\n" +
          "\nType " +
          chdir +
          "'clap dev' to start the server." +
          "\n"
      );
    }
  }
});
