"use strict";

const installationTaskExec = require("../tasks/installation");
const checkNode = require("../tasks/check-node");
const generator = require("../tasks/generator");
const docs = require("../tasks/docs");

function taskLoader(option, type) {
  // Electrode OSS/WML Generator
  const generatorApp = "electrode";
  const generatorComponent = "electrode:component";
  const generatorComponentAdd = "electrode:component-add";
  const wmlgeneratorApp = "@walmart/wml-electrode";
  const wmlgeneratorComponent = "@walmart/wml-electrode:component";
  const wmlgeneratorComponentAdd = "@walmart/wml-electrode:component-add";

  switch (option) {
    case "1":
      // eslint-disable-next-line no-console
      console.log("Checking your Electrode environment...\n");
      installationTaskExec();
      break;
    case "2":
      // eslint-disable-next-line no-console
      console.log("Checking your NodeJS and npm environment...\n");
      checkNode();
      break;
    case "3":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, generatorApp)
        : generator(type, wmlgeneratorApp);
      break;
    case "4":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, generatorComponent)
        : generator(type, wmlgeneratorComponent);
      break;
    case "5":
      // eslint-disable-next-line no-unused-expressions
      type === "oss"
        ? generator(type, generatorComponentAdd)
        : generator(type, wmlgeneratorComponentAdd);
      break;
    case "6":
      docs(type);
      break;
  }
}

module.exports = taskLoader;
