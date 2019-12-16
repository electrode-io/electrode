"use strict";

const _ = require("lodash");

module.exports = base => {
  const pkg = {
    name: "",
    version: "0.0.1",
    description: "",
    homepage: "",
    scripts: {
      dev: "clap dev",
      test: "clap check",
      build: "clap build",
      start: "node lib/server"
    },
    author: {
      name: "",
      email: "",
      url: ""
    },
    contributors: [],
    main: "lib/server/index.js",
    keywords: ["electrode", "web"],
    repository: {
      type: "git",
      url: ""
    },
    license: "UNLICENSED",
    engines: {
      node: ">= 8.12.0",
      npm: ">= 6.4.1"
    },
    dependencies: {
      "electrode-archetype-react-app": "7.0.0-beta7.0",
      "electrode-server": "^3.0.0",
      "react-redux": "^7.1.1",
      redux: "^4.0.4",
      "subapp-redux": "^1.0.4",
      "subapp-server": "^1.1.4",
      "subapp-web": "^1.0.4"
    },
    devDependencies: {
      "electrode-archetype-react-app-dev": "7.0.0-beta7.0"
    }
  };

  return _.merge({}, base, pkg);
};
