"use strict";

const myPkg = require("../package.json");

module.exports = (base, merge) => {
  const pkg = {
    name: "my-x-app",
    version: "0.0.1",
    description: "Web application using Electrode X",
    homepage: "",
    scripts: {
      dev: "xrun -q electrode/dev",
      test: "xrun electrode/check",
      build: "xrun electrode/build",
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
      node: ">= 12",
      npm: ">= 6"
    },
    dependencies: {
      "@babel/runtime": "^7.12.5",
      "@xarc/app": "^8.2.0", // version will come from ../package.json
      "@xarc/fastify-server": "^2.0.0",
      "@xarc/react": "^0.1.0", // version will come from ../package.json
      "@xarc/react-query": "^0.1.1", // version will come from ../package.json
      "@xarc/react-redux": "^0.1.0" // version will come from ../package.json
    },
    devDependencies: {
      "@types/node": "^14.14.6",
      "@xarc/app-dev": "^8.2.0", // version will come from ../package.json
      "ts-node": "^9.0.0",
      typescript: "^4.0.3"
    }
  };

  const update = dep =>
    Object.keys(dep).forEach(pkgName => {
      const sv = myPkg.devDependencies[pkgName];
      if (sv) {
        dep[pkgName] = sv;
      }
    });

  update(pkg.dependencies);
  update(pkg.devDependencies);

  return merge({}, base, pkg);
};
