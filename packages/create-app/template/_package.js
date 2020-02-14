"use strict";

const _ = require("lodash");

module.exports = base => {
  const pkg = {
    name: "",
    version: "0.0.1",
    description: "",
    homepage: "",
    scripts: {
      dev: "clap -q dev",
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
      node: ">= 10",
      npm: ">= 6"
    },
    dependencies: {
      "@xarc/app": "xarc8",
      "electrode-server": "^3.0.0",
      react: "^16",
      "react-dom": "^16",
      "react-redux": "^7.1.1",
      redux: "^4.0.4",
      "subapp-react": "~0.0.4",
      "subapp-redux": "^1.0.13",
      "subapp-server": "^1.1.5"
    },
    devDependencies: {
      "@xarc/app-dev": "xarc8"
    }
  };

  return _.merge({}, base, pkg);
};
