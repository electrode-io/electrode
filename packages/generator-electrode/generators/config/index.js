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

    this.option('pwa', {
      type: String,
      required: true,
      desc: 'Progressive Web App'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('default.json'),
      this.destinationPath('config/default.json'),
      { projectName: this.options.name }
    );

    if (this.options.pwa) {
      this.fs.copyTpl(
        this.templatePath('sw-config.js'),
        this.destinationPath('config/sw-config.js'),
        { projectName: this.options.name }
      );
    }
  }
});
