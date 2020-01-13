const envOpts = { modules: "auto" };

if (process.env.BABEL_ENV === "src-node") {
  Object.assign(envOpts, { targets: { node: "10" } });
}

const presets = [["@babel/env", envOpts], "@babel/react"];

if (process.env.MINIFY) {
  presets.push("minify");
}

module.exports = { presets };
