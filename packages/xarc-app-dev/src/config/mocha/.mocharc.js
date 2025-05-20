module.exports = {
  require: ["@xarc/app-dev/config/mocha/setup.js", "@babel/register"],
  reporter: "spec",
  recursive: true,
  ui: "bdd",
};
