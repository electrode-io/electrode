const envOpts = { modules: "auto" };

if (process.env.BABEL_ENV === "src-node") {
  Object.assign(envOpts, { modules: "auto", targets: { node: "10" } });
} else {
  Object.assign(envOpts, { modules: false, targets: {} });
}

const presets = [["@babel/env", envOpts], "@babel/react"];

if (process.env.MINIFY) {
  presets.push("minify");
}

module.exports = { presets };
