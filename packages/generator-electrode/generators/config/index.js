'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('default.json'),
      this.destinationPath('config/default.json'),
      {
        projectName: this.options.name
      }
    );
  }
});
