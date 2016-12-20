'use strict';
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

    this.option('pwa', {
      type: String,
      required: true,
      desc: 'Progressive Web App'
    });
    /*
    this.option('autoSsr', {
      type: String,
      required: true,
      desc: 'Automatically disable server side rendering'
    }); */
  },

  writing: function () {
    const isHapi = this.config.get('serverType') === 'hapijs';
    ///*let isAutoSsr = this.options.autoSsr ? '' : ['**/server/plugins/autossr.js',
    //'**/server/conditions/machine-info.js', '**/server/conditions/machine-load.js',
    //'**/server/conditions/response-time.js', '**/server/conditions/server-load.js'];

    this.fs.copyTpl(
      this.templatePath('server'),
      this.destinationPath(this.options.generateInto, 'server'),
      {
        isHapi,
        pwa: this.options.pwa
      },
      {},
      {
        globOptions: {
          ignore: [
            isHapi ? '**/server/plugins/webapp/express-middleware.js' : '**/server/plugins/webapp/hapi-plugin.js',
            '**/server/plugins/pwa.js'
          ]//.concat(isAutoSsr)
        }
      }
    );

    if (this.options.pwa) {
      this.fs.copy(
        this.templatePath('server/plugins/pwa.js'),
        this.destinationPath(this.options.generateInto, 'server/plugins/pwa.js')
      );
    }
  }
});
