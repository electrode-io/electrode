"use strict";
var _ = require("lodash");
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option("name", {
      type: String,
      required: true,
      desc: "Project name"
    });

    this.option("pwa", {
      type: Boolean,
      required: true,
      desc: "Progressive Web App"
    });

    this.option("serverType", {
      type: String,
      required: true,
      desc: "Server Type can be HapiJS or express"
    });

    this.option("autoSsr", {
      type: Boolean,
      required: true,
      desc: "Automatically disable server side rendering"
    });

    this.option("_extended", {
      type: Boolean,
      required: true,
      default: false
    });
  }

  writing() {
    const extended = this.options._extended;
    // if another top level generator extended parent, then don't copy config/default.js
    // do not overwrite if file already exists
    if (!extended && !this.fs.exists(this.destinationPath("config/default.js"))) {
      const routeMatch = this.options.serverType === "HapiJS" ? "/{args*}" : "*";
      this.fs.copyTpl(this.templatePath("default.js"), this.destinationPath("config/default.js"), {
        projectName: this.options.name,
        routeValue: routeMatch,
        pwa: this.options.pwa,
        serverType: this.options.serverType,
        isAutoSSR: this.options.autoSsr
      });
    }

    // copying pwa config/sw-config even if parent has been extended
    if (this.options.pwa && !this.fs.exists(this.destinationPath("config/sw-config.js"))) {
      this.fs.copyTpl(
        this.templatePath("sw-config.js"),
        this.destinationPath("config/sw-config.js"),
        { projectName: this.options.name }
      );
    }
  }
};
