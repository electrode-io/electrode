"use strict";

/**
 * Archetype `init` configuration.
 *
 * See: https://github.com/FormidableLabs/builder-init/blob/master/README.md#archetype-data
 * for structuring this configuration file.
 */
module.exports = {
  // Destination directory to write files to.
  //
  // This field is deep merged and added _last_ to the prompts so that archetype
  // authors can add `default` values or override the default message. You
  // could further override the `validate` function, but we suggest using the
  // existing default as it checks the directory does not already exist (which
  // is enforced later in code).
  destination: {
    default: function (data) {
      return data.packageName;
    }
  },

  // Prompts are Inquirer question objects.
  // https://github.com/SBoudrias/Inquirer.js#question
  //
  // `builder-init` accepts:
  // - an array of question objects (with a `name` property)
  // - an object of question objects (keyed by `name`)
  //
  prompts: {
    // See: https://github.com/npm/validate-npm-package-name
    packageName: {
      message: "Package / GitHub project name (e.g., 'whiz-bang-component')",
      validate: function (val) {
        return /^([a-z0-9]+\-?)+$/.test(val.trim()) || "Must be lower + dash-cased string";
      }
    },
    packageGitHubOrg: {
      message: "GitHub organization username (e.g., 'walmartlabs')",
      validate: function (val) {
        return /^([^\s])+$/.test(val) || "Must be GitHub-valid organization username";
      }
    },
    packageDescription: {
      message: "Package description"
    }
  },

  // Derived fields are asynchronous functions that are given the previous user
  // input data of the form: `function (data, cb)`. They callback with:
  // `(err, value)`.
  derived: {
    componentPath: function (data, cb) { cb(null, data.packageName); },
    componentName: function (data, cb) {
      // PascalCase (with first character capitalized).
      var name = data.packageName
        .replace(/^\s+|\s+$/g, "")
        .replace(/(^|[-_ ])+(.)/g, function (match, first, second) {
          return second.toUpperCase();
        });

      cb(null, name);
    }
  }
};
