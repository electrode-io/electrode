'use strict';
var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('default.json'),
      this.destinationPath(this.options.generateInto, 'config/default.json'),
      {
        projectName: this.options.name
      }
    );
  }
});
