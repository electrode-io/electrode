"use strict";

module.exports = (base, merge) => {
  const pkg = {
    name: "my-x-app",
    version: "0.0.1",
    description: "Web application using Electrode X",
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
      "@xarc/app": "^8.1.8",
      "@xarc/fastify-server": "^2.0.0",
      react: "^16.13.1",
      "react-dom": "^16.13.1",
      redux: "^4.0.5",
      "react-redux": "^7.2.0",
      "subapp-react": "^0.0.23",
      "subapp-redux": "^1.0.32",
      "subapp-server": "^1.3.1"
    },
    devDependencies: {
      "@types/node": "^14.14.6",
      "@xarc/app-dev": "^8.1.8",
      "ts-node": "^9.0.0",
      typescript: "^4.0.3",
      xclap: "^0.2.53"
    }
  };

  return merge({}, base, pkg);
};
