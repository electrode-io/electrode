module.exports = {
  presets: [
    ["@babel/env", { modules: "auto" }],
    "@babel/react",
    process.env.MINIFY ? "minify" : undefined
  ].filter(x => x)
};
