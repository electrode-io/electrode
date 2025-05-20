module.exports = {
  require: ["@xarc/app-dev/config/mocha/setup.js", "@babel/register"],
  reporter: "spec",
  spec: "@(__test__|__tests__|test|tests)/**/*.@(js|jsx|ts|tsx)",
  recursive: true,
  ui: "bdd",
};
