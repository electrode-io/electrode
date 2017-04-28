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
var glob = require("glob");

/*
* This generator should check that it is invoked from within a packages folder
* so check if cwd ends in packages. also that there is a demo-app folder present
* demo app folder path should be at the same level as packages.
* then check if 'demo-app/package.json' and 'demo-app/src/client/components/home.jsx' exist.
* The folder structure is now sufficiently verified. 
* generate the component in the cwd and npmi 
* modify the demo-app package to add new package.
* modify the demo-app component home.jsx to import the new packages/component and use class in the div
*/



module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.packageName = this.options.packageName || "demo-app";
    this.developerName = this.options.developerName || "demoDeveloper";
    this.className = this.options.className;
  },

  initializing: function () {
    let appPkgPath = '';
    let homeComponentPath = '';
    this.demoAppName = '';

    //This function checks if all required pieces are present
    const checkError = () => {
      if (_.isEmpty(this.demoAppName)) {
        this.env.error("We could not find your demo-app. Make sure your directory structure is preserved after running `yo electrode-component");
      }
      if (!(this.pkg)) {
        this.env.error("We could not find package.json for your demo-app. Make sure your directory structure is preserved after running `yo electrode-component");
      }
      if (!(this.homeComponent)) {
        this.env.error("We could not find home.jsx for your demo-app. Make sure your directory structure is preserved after running `yo electrode-component");
      }
    };

    //check is the command is run from the correct directory
    if (process.cwd().split("/").pop() != "packages") {
      this.env.error("You need to run this commnand from the `packages` folder generated by running `yo electrode:component");
    }

    try {
      //fetch the demo App Name, which is "demo-app" by default
      this.demoAppName = glob.sync("../**demo-app").pop().split("/").pop();
      this.pkg = this.fs.exists(this.destinationPath("../" + this.demoAppName + "/package.json"));
      this.homeComponent = this.fs.exists(this.destinationPath("../" + this.demoAppName + "/src/client/components/home.jsx"));
    }
    catch (e) {
      checkError();
    }

    // check for missing
    checkError();
    this.props = {};
  },

  prompting: {
    greeting: function () {
      this.log(yosay(
        'Welcome to the ' + chalk.red('Electrode Add Component') + ' generator!'
      ));
    },

    askFor: function () {
      var prompts = [
        {
          type: "input",
          name: 'name',
          message: 'Component Name',
          when: !this.props.name,
          default: path.basename(process.cwd())
        },
        {
          type: "input",
          name: "componentName",
          message: "What is the ClassName for your component?",
          default: this.props.componentName,
          when: !this.props.componentName
        }
      ];
      return this.prompt(prompts).then((props) => {
        this.props = extend(this.props, props);
        this.packageName = this.props.name;
        this.componentName = _.kebabCase(_.deburr(this.props.componentName))
          .replace(/^\s+|\s+$/g, "")
          .replace(/(^|[-_ ])+(.)/g, function (match, first, second) {
            return second.toUpperCase();
          });
      });
    }
  },

  default: function () {
    let options = {
      isAddon: true,
      name: this.packageName,
      componentName: this.componentName,
      demoAppName: this.demoAppName
    };
    this.composeWith('electrode:component', { options }, {
      local: require.resolve('../component')
    });
  },
  writing: function () {
    //add new package to the dependencies
    let dependencies = {};
    dependencies[this.packageName] = "../packages/" + this.packageName;
    //overwrite the Demo App package.json
    let existingPkg = this.fs.readJSON(this.destinationPath("../../" + this.demoAppName + "/package.json"));
    existingPkg.dependencies[this.packageName] = "../packages/" + this.packageName;

    this.fs.writeJSON(this.destinationPath("../../" + this.demoAppName + "/package.json"), existingPkg);

    let homeFile = this.fs.read(this.destinationPath("../../" + this.demoAppName + "/src/client/components/home.jsx"));
    let homeArray = homeFile.split("\n");
    // add import at the top
    let rx = "import {" + this.componentName + "} from \"" + this.packageName + "\";";
    let rxTag = "<" + this.componentName + " />";
    homeArray.unshift(rx);
    //get the first closing div, home shoud have one closing div.
    let splitPoint = homeArray.findIndex((value, index, array) => {
      if (value.match("</div>")) {
        return index;
      }
    });
    // insert the new class before the div
    //splice the array into 2, before closing div and after
    let topHalf = homeArray.splice(0, splitPoint);
    topHalf.push(rxTag);
    let newHomeString = topHalf.concat(homeArray).join("\n");
    this.fs.write(this.destinationPath("../../" + this.demoAppName + "/src/client/components/home.jsx"), newHomeString);
  },

  end: function () {
    // run npmi for the demo app again
    process.chdir(this.destinationPath("../../" + this.demoAppName));
    this.installDependencies({
      bower: false
    });
  }
});
