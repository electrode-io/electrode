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
      start: "node lib/server",
    },
    author: {
      name: "",
      email: "",
      url: "",
    },
    contributors: [],
    main: "lib/server/index.js",
    keywords: ["electrode", "web"],
    repository: {
      type: "git",
      url: "",
    },
    license: "UNLICENSED",
    engines: {
      node: ">= 12",
      npm: ">= 6",
    },
    prettier: {
      printWidth: 100,
    },
    dependencies: {
      "@babel/runtime": "^7.12.5",
      "@xarc/app": "^11.0.0", // version will come from ../package.json
      "@xarc/fastify-server": "^3.2.3",
      "@xarc/react": "^1.0.0", // version will come from ../package.json
      "@xarc/react-query": "^1.0.0", // version will come from ../package.json
      "@xarc/react-redux": "^1.0.0", // version will come from ../package.json
    },
    devDependencies: {
      "@types/node": "^22.13.1",
      "@xarc/app-dev": "^11.0.0", // version will come from ../package.json
      "@xarc/opt-postcss": "^2.0.0",
      "@xarc/opt-stylus": "^2.0.0",
      prettier: "^2.2.1",
      "ts-node": "^9.1.1",
      typescript: "^4.1.3",
    },
  };

  const update = (dep) =>
    Object.keys(dep).forEach((pkgName) => {
      const sv = myPkg.devDependencies[pkgName];
      if (sv) {
        dep[pkgName] = sv;
      }
    });

  update(pkg.dependencies);
  update(pkg.devDependencies);

  return merge({}, base, pkg);
};
