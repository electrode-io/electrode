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
  },

  writing: function () {
    const isHapi = this.config.get('serverType') === 'hapijs';

    this.fs.copyTpl(
      this.templatePath('src/server'),
      this.destinationPath(this.options.generateInto, 'src/server'),
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
          ]
        }
      }
    );

    if (this.options.pwa) {
      this.fs.copy(
        this.templatePath('src/server/plugins/pwa.js'),
        this.destinationPath(this.options.generateInto, 'src/server/plugins/pwa.js')
      );
    }
  }
});
